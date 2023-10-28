import { Request, Response, NextFunction } from 'express';

export async function isAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const token = request.headers.authorization!;

	if (!token) {
		return response.status(401).send();
	}

	return next();
}
