import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma/client';
import redisClient from '../utils/redis';
import { updateIncidentsData } from '../utils/queue';

export async function getProfile(
	request: Request,
	response: Response,
	next: NextFunction
) {
	let incidents;
	let data: any;

	try {
		const ngo_id: string = request.headers.authorization!;

		data = await redisClient.get('ngo_id').catch((err: unknown) => {
			return response.status(500).send(err);
		});

		data = updateIncidentsData(data);

		if (data) {
			incidents = JSON.parse(data);
		} else {
			incidents = await prisma.incident.findMany({
				where: {
					ngoId: ngo_id
				}
			});

			if (incidents === null) {
				next();
			} else {
				redisClient.set('ngo_id', JSON.stringify(incidents));
			}
			return response.json(incidents);
		}
		return response.json(data);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
