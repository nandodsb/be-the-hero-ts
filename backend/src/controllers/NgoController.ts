import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { Ngo } from '@prisma/client';

export async function getAllOngs(_request: Request, response: Response) {
	try {
		const ngos = await prisma.ngo.findMany({
			include: {
				incident: true
			}
		});

		return response.status(200).json(ngos);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}

export async function createOng(request: Request, response: Response) {
	try {
		const { name, email, whatsapp, city, uf }: Ngo = request.body;

		const ngo_id = await prisma.ngo.create({
			data: {
				name,
				email,
				whatsapp,
				city,
				uf
			},
			select: {
				id: true
			}
		});

		return response.status(201).json(ngo_id);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
