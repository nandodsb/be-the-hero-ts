import { Request, Response } from 'express';
import { Incident, Ong } from '@prisma/client';
import { prisma } from '../../prisma/client';

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

export async function getAllIncidents(request: Request, response: Response) {
	try {
		const { page = 1 }: any = request.query;

		const count: any = await prisma.incident.count();

		const ong_id = request.headers.authorization;

		const incidents = await prisma.incident.findMany({
			skip: 4,
			take: (page - 1) * 5,
			where: {
				ongId: ong_id
			}
		});

		response.header('X-Total-Count', count['count(*)']);

		return response.json(incidents);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}

export async function createIncident(request: Request, response: Response) {
	try {
		const { title, description, value }: Incident = request.body;

		const ong_id: string = request.headers.authorization!;

		console.log(request.headers);

		const incident_data = await prisma.incident.create({
			data: {
				title,
				description,
				value,
				ongId: ong_id
			}
		});

		return response.status(201).json(incident_data);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}

export async function deleteIncident(request: Request, response: Response) {
	try {
		const incident_id = request.params.id;

		const ong_id = request.headers.authorization;

		const ong_incident = await prisma.incident.findFirst({
			where: {
				ongId: ong_id
			}
		});

		// if(ong_incident?.ongId !== ong_id){
		if (!ong_incident) {
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
