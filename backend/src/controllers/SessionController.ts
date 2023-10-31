import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import redisClient from '../utils/redis';

let default_expiration = 3600;

export async function createSession(request: Request, response: Response) {
	try {
		const { id } = request.body;

		const ngo = await prisma.ngo.findFirst({
			where: {
				id
			},
			select: {
				name: true
			}
		});

		if (!ngo) {
			throw new Error('Id provided not found');
		}

		const data: any = await redisClient.get(id).catch((err: unknown) => {
			return response.status(500).send(err);
		});

		if (data !== null) {
			console.log('Cache found in Redis 🟢');
			return response.status(200).json(JSON.parse(data));
		} else {
			console.log('Cache Not Found 🔴');
			redisClient.setEx(id, default_expiration, JSON.stringify(ngo));
		}

		return response.status(200).json(ngo);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
