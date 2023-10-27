import { LogOut, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';

interface IIncidents {
	id: string;
	title: string;
	description: string;
	value: number;
}

export default function Profile() {
	const [incidents, setIncidents] = useState<IIncidents[]>([]);
	const navigate = useNavigate();
	const { toast } = useToast();

	const ongId = localStorage.getItem('ongId');
	const ongName: string = localStorage.getItem('ongName')!;

	useEffect(() => {
		api
			.get('/profile', {
				headers: {
					Authorization: ongId
				}
			})
			.then((response) => {
				setIncidents(response.data);
			});
	}, [ongId]);

	async function handleDeleteIncident(id: string) {
		try {
			await api.delete(`/incidents/${id}`, {
				headers: {
					Authorization: ongId
				}
			});

			setIncidents(incidents.filter((incident) => incident.id !== id));
		} catch (err) {
			alert('Error, unable to delete it.');
		}
	}

	function handleLogout() {
		localStorage.clear();
		toast({
			variant: 'destructive',
			title: 'Logout'
		});
		navigate('/');
	}

	return (
		<main className="h-auto w-full block items-center justify-between ">
			<header>
				<img
					src={logo}
					alt="Be The Hero"
				/>
				<span>Welcome, {ongName}</span>

				<div className="flex gap-4 items-start p-4">
					<a href="/incidents/new">
						<Button
							className="flex items-center"
							type="button"
						>
							Register new case
						</Button>
					</a>
					<Button
						onClick={handleLogout}
						type="button"
						className="flex items-center"
					>
						<LogOut />
					</Button>
				</div>
			</header>

			<h1>Registered cases:</h1>

			<section className=" block lg:grid lg:grid-cols-2">
				{incidents.map((incident) => (
					<Card
						key={incident.id}
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
						<CardFooter className="flex justify-center">
							<Button
								onClick={() => handleDeleteIncident(incident.id)}
								type="button"
							>
								<Trash2 />
							</Button>
						</CardFooter>
					</Card>
				))}
			</section>
		</main>
	);
}
