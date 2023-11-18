import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { twMerge } from 'tailwind-merge';
import useHandleIncidentFeed from './useHandleIncidentFeed';
import { IRegisteredIncidents } from '@/interfaces';

export default function IncidentFeed() {
	const { incidents } = useHandleIncidentFeed();

	return (
		<main className="grid grid-cols-2">
			<section className={twMerge('block lg:grid lg:grid-cols-2"')}>
				{incidents.map((incident: IRegisteredIncidents, index: number) => (
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
								}).format(Number(incident.value))}
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
