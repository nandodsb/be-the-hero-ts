import { Queue, Worker } from 'bullmq';

if (!process.env.REDIS_HOST) console.warn('Redis is not defined');

const connection = {
	host: process.env.REDIS_HOST
};

const incidentsQueue = new Queue('incidentsQueue', { connection });
const ngosQueue = new Queue('ngosQueue');

const incidentsWorker = new Worker(
	'incidentsQueue',
	async (job) => {
		const incidentsData = job.data;

		console.log('Processed data:', incidentsData);

		return { dataProcessed: true };
	},
	{ connection }
);

export const updateIncidentsData = (incidentsData: any) => {
	incidentsQueue.add('processData', incidentsData);
};

incidentsWorker.on('completed', (job) => {
	console.log('Completed');
});
