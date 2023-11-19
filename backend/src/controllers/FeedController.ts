import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { updateIncidentsData } from '../utils/queue';
import redisClient from '../utils/redis';

let default_expiration = 60;

/**
 *
 * @param _request
 * @param response
 * @param next
 * @returns
 */
export async function getAllIncidents(
	_request: Request,
	response: Response,
	next: NextFunction
) {
	let incidents;
	let data: any;

	try {
		data = await redisClient.get('incidents').catch((err: unknown) => {
			return response.status(500).send(err);
		});

		data = updateIncidentsData(data);

		if (data) {
			data = JSON.parse(data);
		} else {
			incidents = await prisma.incident.findMany({
				include: {
					ngo: true
				}
			});

			if (incidents === null || !incidents) {
				next();
			} else {
				redisClient.setEx(
					'incidents',
					default_expiration,
					JSON.stringify(incidents)
				);
			}
			return response.json(incidents);
		}

		return response.status(200).json(data);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
