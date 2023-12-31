/** src/pages/Login */
import heroesLogo from '@/assets/heroes.png';
import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';
import { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import useHandleLogin from './useHandleLogin';

export default function Login() {
	const { t, id, setId, handleLogin } = useHandleLogin();
	return (
		<main className="h-auto w-full p-8 block items-center justify-between lg:flex xl:flex static">
			<section className="w-full mr-8 ">
				<img
					src={logo}
					alt="Be The Hero"
					className="invisible lg:visible"
				/>

				<form
					onSubmit={handleLogin}
					className="mt-2"
				>
					<h1 className="mt-8 text-2xl">{t('Welcome to Be The Hero')}</h1>

					<Input
						className="text-lg text-black font-sans font-bold h-16 w-full py-6 rounded-lg border-gray-100 bg-white mt-4"
						placeholder="Your ID"
						value={id}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setId(event.target.value)
						}
					/>

					<Button
						type="submit"
						className={twMerge(
							'logo text-lg font-sans h-16 w-full py-6 rounded-lg mt-4 bg-[#E02041] hover:bg-[#E02041]/80 dark:text-white'
						)}
					>
						Sign in
					</Button>

					<a
						href="/register"
						className="flex items-center justify-center mt-5 mb-5 text-lg mr-2"
					>
						<LogIn className={twMerge('text-[#E02041] mr-2')} />
						Register
					</a>
				</form>
			</section>

			<img
				src={heroesLogo}
				alt="Heroes"
			/>
		</main>
	);
}
