import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import redisClient from '../utils/redis';

let default_expiration = 3600;

export async function createSession(request: Request, response: Response) {
	let in_cache = false;
	let ngo;
	try {
		const { id } = request.body;

		const data: any = await redisClient.get('ngoName').catch((err: unknown) => {
			return response.status(500).send(err);
		});

		if (data) {
			in_cache = true;
			ngo = JSON.parse(data);
		} else {
			ngo = await prisma.ngo.findFirst({
				where: {
					id
				},
				select: {
					name: true
				}
			});

			if (ngo === null || !ngo) {
				throw new Error('No ngo is registered.');
			}
			redisClient.setEx('ngoName', default_expiration, JSON.stringify(ngo));
		}
		return response.status(200).json(ngo);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
