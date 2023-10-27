import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

export async function createSession(request: Request, response: Response) {
	try {
		const { id } = request.body;

		const ong = await prisma.ong.findFirst({
			where: {
				id
			},
			select: {
				name: true
			}
		});

		if (!ong) {
			throw new Error('Id provided not found');
		}

		return response.status(200).json(ong);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
