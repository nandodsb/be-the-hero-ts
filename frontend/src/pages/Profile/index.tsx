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
import { LogOut, Trash2 } from 'lucide-react';
import useHandleProfile from './useHandleProfile';

export default function Profile() {
	const { ngoName, incidents, handleDeleteIncident, handleLogout } =
		useHandleProfile();

	return (
		<main className="h-auto w-full p-8 block items-center justify-between ">
			<header>
				<img
					src={logo}
					alt="Be The Hero"
				/>
				<span>Welcome, {ngoName}</span>

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

			<h1>Registered {incidents.length} cases :</h1>

			<section className="block lg:grid lg:grid-cols-2">
				{incidents.map(
					(incident, index: number) =>
						index < 10 && (
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
										}).format(Number(incident.value))}
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
						)
				)}
			</section>

			{/* <nav
				className="isolate inline-flex -space-x-px rounded-md shadow-sm"
				aria-label="Pagination"
			>
				<a
					href="#"
					className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
				>
					<span className="sr-only">Previous</span>
					<svg
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>

				<a
					href="#"
					aria-current="page"
					className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					1
				</a>
				<a
					href="#"
					className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
				>
					2
				</a>
				<a
					href="#"
					className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
				>
					3
				</a>
				<span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
					...
				</span>
				<a
					href="#"
					className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
				>
					8
				</a>
				<a
					href="#"
					className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
				>
					9
				</a>
				<a
					href="#"
					className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
				>
					10
				</a>
				<a
					href="#"
					className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
				>
					<span className="sr-only">Next</span>
					<svg
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
			</nav> */}
		</main>
	);
}
