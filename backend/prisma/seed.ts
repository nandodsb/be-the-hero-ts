import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const ngo_fake_data: any = {
	// id: faker.string.uuid(),
	name: faker.company.name(),
	email: faker.internet.email(),
	whatsapp: faker.phone.number(),
	city: faker.location.city(),
	uf: faker.location.countryCode('alpha-2')
};

async function fakeNgo() {
	await prisma.ngo.create({
		data: ngo_fake_data
	});
}

const incident_fake_data: any = {
	// id: faker.string.uuid(),
	title: faker.lorem.text(),
	description: faker.lorem.paragraph(),
	value: faker.number.int(),
	ngoId: ngo_fake_data.id
};

async function fakeIncident() {
	await prisma.incident.create({
		data: incident_fake_data
	});
}

async function main() {
	// await prisma.ngo.deleteMany();
	// await prisma.incident.deleteMany();
	const fake_ong_register = 10;
	const fake_incident_register = Math.floor(Math.random() * 20);

	for (let i = 0; i < fake_ong_register; i++) {
		console.log(ngo_fake_data.id);
		await fakeNgo();
		for (let j = 0; j < fake_incident_register; j++) {
			await fakeIncident();
		}
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
