import { ArrowLeft } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import api from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface INewIncident {
	title: string;
	description: string;
	value: number;
}

export default function NewIncident() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [value, setValue] = useState(0);
	const navigate = useNavigate();
	const { toast } = useToast();

	const ongId = localStorage.getItem('ongId');

	async function handleNewIncident(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const data: INewIncident = {
			title,
			description,
			value
		};

		try {
			await api.post('/incidents', data, {
				headers: {
					Authorization: ongId
				}
			});

			navigate('/profile');
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Unable to register a new case',
				action: <ToastAction altText="Try again">Try again</ToastAction>
			});
		}
	}

	return (
		<main className="h-auto w-full block items-center justify-between ">
			<div className="">
				<section>
					<img
						src={logo}
						alt="Be The Hero"
					/>
					<h1>Register a new case</h1>
					<p>Describe in details.</p>

					<a
						href="/profile"
						className="flex items-center mt-1 text-lg mr-2"
					>
						<ArrowLeft className="text-red-500" />
						Back
					</a>
				</section>

				<form onSubmit={handleNewIncident}>
					<Input
						className="text-lg text-black font-sans font-bold h-16 w-full py-6 rounded-lg border-gray-100 bg-white mt-4"
						placeholder="Title"
						value={title}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setTitle(event.target.value)
						}
					/>

					<Input
						className="text-lg text-black font-sans font-bold h-16 w-full py-6 rounded-lg border-gray-100 bg-white mt-4"
						placeholder="Description"
						value={description}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setDescription(event.target.value)
						}
					/>

					<Input
						className="text-lg text-black font-sans font-bold h-16 w-full py-6 rounded-lg border-gray-100 bg-white mt-4"
						placeholder="Amount"
						value={value}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setValue(event.target.valueAsNumber)
						}
					/>

					<Button
						type="submit"
						className="logo text-lg font-sans h-16 w-full py-6 rounded-lg mt-4 bg-red-600 hover:bg-red-500 dark:text-white"
					>
						Register
					</Button>
				</form>
			</div>
		</main>
	);
}
