import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

export async function createSession(request: Request, response: Response) {
	try {
		const { id } = request.body;

		const ngo = await prisma.ngo.findFirst({
			where: {
				id
			},
			select: {
				name: true
			}
		});

		if (!ngo) {
			throw new Error('Id provided not found');
		}

		return response.status(200).json(ngo);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
