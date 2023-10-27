import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { Ong } from '@prisma/client';

export async function getAllOngs(request: Request, response: Response) {
	try {
		const ongs = await prisma.ong.findMany({
			include: {
				incident: false
			}
		});

		return response.status(200).json(ongs);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}

export async function createOng(request: Request, response: Response) {
	try {
		const { name, email, whatsapp, city, uf }: Ong = request.body;

		// const id = generateUniqueId();

		const ong_id = await prisma.ong.create({
			data: {
				// id,
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

		return response.status(201).json(ong_id);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
