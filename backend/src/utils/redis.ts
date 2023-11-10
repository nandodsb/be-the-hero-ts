import { createClient } from 'redis';

// const redisUrl = 'redis://redis:6379';
const redisUrl = 'redis://localhost:6379';

const redisClient = createClient({
	url: redisUrl
});

async function connectRedis(): Promise<void> {
	try {
		await redisClient.connect();
		await redisClient.set('Connect', 'Redis');
		console.log('Redis client connect successfully');
	} catch (err) {
		console.log(err);
	}
}

connectRedis();

export default redisClient;
