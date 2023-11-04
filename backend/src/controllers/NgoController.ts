import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma/client';
import { Ngo } from '@prisma/client';
import redisClient from '../utils/redis';

let default_expiration = 1;

export async function getAllNgos(
	_request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		const ngos = await prisma.ngo.findMany({
			include: {
				incident: true
			}
		});

		const data: any = await redisClient.get('ngos').catch((err: unknown) => {
			return response.status(500).send(err);
		});

		if (data !== null) {
			console.log('Cache found in Redis 🟢');
			return response.status(200).json(JSON.parse(data));
		} else {
			console.log('Cache Not Found 🔴');
			redisClient.setEx('ngos', default_expiration, JSON.stringify(ngos));
		}
		return response.status(200).json(ngos);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}

export async function createNgo(request: Request, response: Response) {
	try {
		const { name, email, whatsapp, city, uf }: Ngo = request.body;

		const ngo_id = await prisma.ngo.create({
			data: {
				name,
				email,
				whatsapp,
				city,
				uf
			},
			select: {
				id: true
			}
		});

		return response.status(201).json(ngo_id);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}

export async function deleteNgo(request: Request, response: Response) {
	try {
		const ngo_param = request.params.id;

		const ngo_id = request.headers.authorization;

		const ngo_register = await prisma.ngo.findFirst({
			where: {
				id: ngo_id
			}
		});

		if (!ngo_register) {
			return response.status(401).json({ error: 'Operation not permitted.' });
		} else {
			await prisma.incident.deleteMany({
				where: {
					ngoId: ngo_id
				}
			});

			await prisma.ngo.delete({
				where: {
					id: ngo_param
				}
			});

			return response.status(200).json({ message: 'Ngo deleted.' });
		}
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
