import { createClient } from 'redis';

// const redisUrl = 'redis://redis:6379';

const redisClient = createClient({
	url: process.env.REDIS_URL
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
