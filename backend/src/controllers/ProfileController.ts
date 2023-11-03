import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import redisClient from '../utils/redis';

let default_expiration = 3600;

export async function getProfile(
	request: Request,
	response: Response,
	next: NextFunction
) {
	let in_cache = false;
	let incidents;
	const ngo_id: string = request.headers.authorization!;

	try {
		const data: any = await redisClient.get(ngo_id).catch((err: unknown) => {
			return response.status(500).send(err);
		});

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
				throw 'No incident is registered.';
			}
			redisClient.setEx(ngo_id, default_expiration, JSON.stringify(incidents));
		}

		return response.send({ fromCache: in_cache, data: incidents });
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
