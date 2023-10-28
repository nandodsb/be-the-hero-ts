import redis from 'redis';

const redisUrl = 'redis://localhost:6379';

const redisClient = redis.createClient({
	url: redisUrl
});

async function connectRedis(): Promise<void> {
	try {
		await redisClient.connect();
		console.log('Redis client connect successfully');
		redisClient.set('Connect', 'Welcome');
	} catch (error) {
		console.log(error);
	}
}

connectRedis();

export default redisClient;
