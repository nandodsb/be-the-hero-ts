import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import redisClient from '../utils/redis';
import { updateNgosData } from '../utils/queue';

let default_expiration = 3600;

export async function createSession(request: Request, response: Response) {
	let ngo;
	try {
		const { id } = request.body;

		ngo = await prisma.ngo.findFirst({
			where: {
				id
			},
			select: {
				name: true
			}
		});

		return response.status(200).json(ngo);
	} catch (err: unknown) {
		return response.status(400).json(err);
	}
}
