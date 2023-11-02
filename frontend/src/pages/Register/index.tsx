import { ArrowLeft } from 'lucide-react';
import logo from '@/assets/logo.svg';
import api from '@/services/api';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [whatsapp, setWhatsapp] = useState('');
	const [city, setCity] = useState('');
	const [uf, setUf] = useState('');
	const navigate = useNavigate();
	const { toast } = useToast();

	async function handleRegister(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const data = {
			name,
			email,
			whatsapp,
			city,
			uf
		};

		try {
			const response = await api.post('/ngos', data);

			alert(`Your access ID is: ${response.data.id}`);

			navigate('/profile');
		} catch (err) {
			toast({
				title: 'Register failed, try again',
				action: <ToastAction altText="Try again">Try again</ToastAction>
			});
		}
	}

	return (
		<main className="h-auto w-full block items-center justify-between">
			<section className="w-full mr-8">
				<img
					src={logo}
					alt="Be The Hero"
				/>
				<h1 className="mt-1 text-xl">Register</h1>
				<p className="text-lg">
					Register, use the platform and help people find the cases of your NGO.
				</p>
				<a
					href="/"
					className="flex items-center mt-1 text-lg mr-2"
				>
					<ArrowLeft className="text-red-500" />
					Back
				</a>
			</section>

			<form onSubmit={handleRegister}>
				<Input
					className="text-lg text-black font-sans font-bold h-16 w-full py-6 rounded-lg border-gray-100 bg-white mt-4"
					placeholder="NGO name"
					value={name}
					onChange={(event: ChangeEvent<HTMLInputElement>) =>
						setName(event.target.value)
					}
				/>

				<Input
					className="text-lg text-black font-sans font-bold h-16 w-full py-6 rounded-lg border-gray-100 bg-white mt-4"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(event: ChangeEvent<HTMLInputElement>) =>
						setEmail(event.target.value)
					}
				/>

				<Input
					className="text-lg text-black font-sans font-bold h-16 w-full py-6 rounded-lg border-gray-100 bg-white mt-4"
					placeholder="WhatsApp"
					value={whatsapp}
					onChange={(event: ChangeEvent<HTMLInputElement>) =>
						setWhatsapp(event.target.value)
					}
				/>

				<div className="flex flex-grid grid-cols-4 gap-2">
					<Input
						className="text-lg text-black font-sans font-bold h-16 col-span-3 py-6 rounded-lg border-gray-100 bg-white mt-4 "
						placeholder="City"
						value={city}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setCity(event.target.value)
						}
					/>

					<Input
						className="text-lg text-black font-sans font-bold h-16 col-span-1 py-6 rounded-lg border-gray-100 bg-white mt-4 "
						placeholder="UF"
						style={{ width: 80 }}
						value={uf}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setUf(event.target.value)
						}
					/>
				</div>

				<Button
					type="submit"
					className="logo text-lg font-sans h-16 w-full py-6 rounded-lg mt-4 bg-red-600 hover:bg-red-500 dark:text-white"
				>
					Send
				</Button>
			</form>
		</main>
	);
}
