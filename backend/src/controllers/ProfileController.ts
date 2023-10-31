import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma/client';
import redisClient from '../utils/redis';

let default_expiration = 3600;

export async function getProfile(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const ngo_id: string = request.headers.authorization!;

	try {
		const incidents: object = await prisma.incident.findMany({
			where: {
				ngoId: ngo_id
			}
		});

		const data: any = await redisClient.get(ngo_id).catch((err: unknown) => {
			return response.status(500).send(err);
		});

		if (data !== null) {
			return response.status(200).json(JSON.parse(data));
		} else {
			redisClient.setEx(ngo_id, default_expiration, JSON.stringify(incidents));
			next();
		}
		return response.status(200).json(incidents);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
