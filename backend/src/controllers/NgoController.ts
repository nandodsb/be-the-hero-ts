import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma/client';
import { Ngo } from '@prisma/client';
import redisClient from '../utils/redis';

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

		if (data != null) {
			console.log('Cache found in Redis 🟢');
			return response.status(200).json(JSON.parse(data));
		} else {
			console.log('Cache Not Found 🔴');
			redisClient.setEx('ngos', 3600, JSON.stringify(ngos));
			next();
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
