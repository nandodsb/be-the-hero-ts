import { Request, Response, NextFunction } from 'express';
import redisClient from './redis';

let default_expiration = 3600;

export async function isAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
) {
	let token: string = request.headers.authorization!;

	const data: any = await redisClient.get('token').catch((err: unknown) => {
		return response.status(500).send(err);
	});

	if (data) {
		token = data;
	} else {
		if (!token || token.length === 0) {
			throw new Error('No token found.');
		}
		redisClient.setEx('token', default_expiration, JSON.stringify(token));
	}

	return next();
}
