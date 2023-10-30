import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import redisClient from '../utils/redis';

const default_expiration = 3600;

export async function getProfile(request: Request, response: Response) {
	try {
		const ngo_id = request.headers.authorization;

		const incidents = await prisma.incident.findMany({
			where: {
				ngoId: ngo_id
			}
		});

		redisClient.setEx(
			'incidents',
			default_expiration,
			JSON.stringify(incidents)
		);

		return response.status(200).json(incidents);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
