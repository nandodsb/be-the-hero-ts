/** src/pages/NewIncident */
import { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import logo from '@/assets/logo.svg';
import useHandleNewIncident from './useHandleNewIncident';

//@ts-check

/**
 *  This represents a new incident form page
 *  @remarks
 *
 * 	This method is part of the {@link https://react.dev#React}
 * 	@implements {handleNewIncident}
 */
export default function NewIncident() {
	const {
		title,

		description,

		value,

		handleNewIncidentChange,
		handleNewIncident
	} = useHandleNewIncident();

	return (
		<main className="h-auto w-full p-8 block items-center justify-between ">
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
						name="name"
						value={title}
						onChange={handleNewIncidentChange}
					/>

					<Input
						className="text-lg text-black font-sans font-bold h-16 w-full py-6 rounded-lg border-gray-100 bg-white mt-4"
						placeholder="Description"
						name="description"
						value={description}
						onChange={handleNewIncidentChange}
					/>

					<Input
						className="text-lg text-black font-sans font-bold h-16 w-full py-6 rounded-lg border-gray-100 bg-white mt-4"
						placeholder="Amount"
						name="value"
						value={value}
						onChange={handleNewIncidentChange}
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
