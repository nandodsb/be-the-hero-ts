import express from 'express';
import cors, { CorsOptions } from 'cors';
import { routes } from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './swagger.json';
import redisClient from './utils/redis_connection';

const app = express();

const allowedOrigins = [
	'*',
	'capacitor://localhost',
	'ionic://localhost',
	'http://localhost',
	'http://localhost:3000',
	'http://localhost:5173',
	'http://localhost:8080',
	'http://localhost:8100'
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.includes(origin!) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Origin not allowed by CORS'));
		}
	}
};

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/api/redis-check', async () => {
	await redisClient.get('Connect');
});

app.use(
	'/api-docs',
	cors(corsOptions),
	swaggerUI.serve,
	swaggerUI.setup(swaggerDocs)
);

app.use('/v1', routes);

export default app;
