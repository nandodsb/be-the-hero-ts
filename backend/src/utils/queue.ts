import { Queue, Worker } from 'bullmq';

if (!process.env.REDIS_HOST) console.warn('Redis is not defined');

const connection = {
	host: process.env.REDIS_HOST
};

const incidentsQueue = new Queue('incidentsQueue', { connection });

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
	incidentsQueue.add('processData', incidentsData, {
		removeOnComplete: true,
		removeOnFail: true
	});
};

incidentsWorker.on('completed', (job) => {
	console.log('Completed');
});

incidentsWorker.on('error', (err) => {
	console.error(err);
});

///

const ngosQueue = new Queue('ngosQueue', { connection });

const ngosWorker = new Worker(
	'ngosQueue',
	async (job) => {
		const ngosData = job.data;

		console.log('Processed data:', ngosData);

		return { dataProcessed: true };
	},
	{ connection }
);

export const updateNgosData = (ngosData: any) => {
	ngosQueue.add('processData', ngosData, {
		removeOnComplete: true,
		removeOnFail: true
	});
};

ngosWorker.on('completed', (job) => {
	console.log('Completed');
});

ngosWorker.on('error', (err) => {
	console.error(err);
});
