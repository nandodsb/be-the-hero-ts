import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import redisClient from '../utils/redis';
import { updateIncidentsData } from '../utils/queue';

export async function getProfile(request: Request, response: Response) {
	let in_cache = false;
	let incidents;
	let data: any;

	try {
		const ngo_id: string = request.headers.authorization!;

		data = await redisClient.get('ngo_id').catch((err: unknown) => {
			return response.status(500).send(err);
		});

		data = updateIncidentsData(data);

		if (data) {
			in_cache = true;
			incidents = JSON.parse(data);
		} else {
			incidents = await prisma.incident.findMany({
				where: {
					ngoId: ngo_id
				}
			});

			if (incidents.length === 0) {
				throw new Error('No incident is registered.');
			}
			redisClient.set('ngo_id', JSON.stringify(incidents));
		}
		return response.json(incidents);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
