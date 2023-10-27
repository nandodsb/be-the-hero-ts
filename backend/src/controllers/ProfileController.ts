import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

export async function getProfile(request: Request, response: Response) {
	try {
		const ong_id = request.headers.authorization;

		const incidents = await prisma.incident.findMany({
			where: {
				ongId: ong_id
			}
		});

		return response.status(200).json(incidents);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
