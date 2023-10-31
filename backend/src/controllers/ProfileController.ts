import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import redisClient from '../utils/redis';

export async function getProfile(request: Request, response: Response) {
	const ngo_id: string = request.headers.authorization!;

	try {
		const incidents: object = await prisma.incident.findMany({
			where: {
				ngoId: ngo_id
			}
		});

		await redisClient.get(ngo_id);

		if (ngo_id !== null) {
			return response.status(200).json(incidents);
		} else {
			redisClient.setEx(ngo_id, 3600, JSON.stringify(incidents));
		}
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
