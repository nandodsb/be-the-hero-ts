import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import api from '@/services/api';
import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { twMerge } from 'tailwind-merge';

interface IIncidents {
	id: string;
	title: string;
	description: string;
	value: number;
}

export default function IncidentFeed() {
	const incidentState = atom<IIncidents[]>({
		key: 'incidentStateKey',
		default: []
	});

	const [incidents, setIncidents] = useRecoilState(incidentState);

	useEffect(() => {
		api.get('/feed').then((response) => {
			setIncidents(response.data);
		});
	}, [incidents]);

	return (
		<main className="">
			<section className={twMerge('grid grid-cols-1 lg:grid-col-3')}>
				{incidents.map((incident, index) => (
					<Card
						key={index}
						className="m-4 dark:bg-gray-900"
					>
						<CardHeader>
							<CardTitle className="flex justify-right">
								CASE: {incident.title}
							</CardTitle>
							<CardDescription className="flex justify-right">
								DESCRIPTION: {incident.description}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								{Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL'
								}).format(incident.value)}
							</p>
						</CardContent>
						<CardFooter className="flex justify-center gap-4">
							<Button
								type="button"
								className="w-full"
							></Button>
							<Button
								type="button"
								className="w-full"
							></Button>
						</CardFooter>
					</Card>
				))}
			</section>
		</main>
	);
}
function tv(arg0: {
	base: string;
	variants: { color: { primary: string; secondary: string; success: string } };
}) {
	throw new Error('Function not implemented.');
}
