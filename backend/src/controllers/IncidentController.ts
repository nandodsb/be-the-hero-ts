import { Request, Response } from 'express';
import { Incident } from '@prisma/client';
import { prisma } from '../../prisma/client';
import redisClient from '../utils/redis';

let default_expiration = 3600;

export async function getOneIncident(request: Request, response: Response) {
	const incident_id = request.params.id;

	try {
		const incidents = await prisma.incident.findUnique({
			where: {
				id: incident_id
			}
		});

		return response.json(incidents);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}

export async function getAllIncidents(_request: Request, response: Response) {
	try {
		const incidents = await prisma.incident.findMany();

		const data: any = await redisClient
			.get('incidents')
			.catch((err: unknown) => {
				return response.status(500).send(err);
			});

		if (data !== null) {
			console.log('Cache found in Redis 🟢');
			return response.status(200).json(JSON.parse(data));
		} else {
			console.log('Cache Not Found 🔴');
			redisClient.setEx(
				'incidents',
				default_expiration,
				JSON.stringify(incidents)
			);
		}

		return response.status(200).json(incidents);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}

export async function getNgoIncidents(request: Request, response: Response) {
	try {
		const { page = 1 }: any = request.query;

		const count: any = await prisma.incident.count();

		const ngo_id = request.headers.authorization;

		const incidents = await prisma.incident.findMany({
			take: 10,
			skip: (page - 1) * 10,
			where: {
				ngoId: ngo_id
			}
		});

		response.header('X-Total-Count', count['count(*)']);

		// const data: any = await redisClient
		// 	.get('incidents')
		// 	.catch((err: unknown) => {
		// 		return response.status(500).send(err);
		// 	});

		// if (data !== null) {
		// 	console.log('Cache found in Redis 🟢');
		// 	return response.status(200).json(JSON.parse(data));
		// } else {
		// 	console.log('Cache Not Found 🔴');
		// 	redisClient.setEx(
		// 		'incidents',
		// 		default_expiration,
		// 		JSON.stringify(incidents)
		// 	);
		// }

		return response.status(200).json(incidents);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}

export async function createIncident(request: Request, response: Response) {
	let ngo;
	let incidents;
	try {
		const { title, description, value }: Incident = request.body;

		const ngo_id: string = request.headers.authorization!;

		ngo = await prisma.ngo.findUnique({
			where: {
				id: ngo_id
			},
			select: {
				id: true
			}
		});

		if (ngo === null || ngo.id !== ngo_id) {
			return response.status(401).json({ message: 'Not authorized.' });
		} else {
			incidents = await prisma.incident.create({
				data: {
					//id,
					title,
					description,
					value,
					ngoId: ngo_id
				}
			});
		}
		return response.status(201).json(incidents);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}

export async function deleteIncident(request: Request, response: Response) {
	try {
		const incident_id = request.params.id;

		const ngo_id = request.headers.authorization;

		const ngo_incident = await prisma.incident.findFirst({
			where: {
				ngoId: ngo_id
			}
		});

		if (!ngo_incident) {
			return response.status(401).json({ error: 'Operation not permitted.' });
		} else {
			await prisma.incident.delete({
				where: {
					id: incident_id
				}
			});

			return response.status(200).json({ message: 'Incident deleted.' });
		}
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
