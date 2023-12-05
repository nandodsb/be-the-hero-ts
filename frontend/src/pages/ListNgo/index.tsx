import { IRegisteredOrganization } from '@/interfaces';
import useHandleListOrganization from './useHandleListOrganization';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function ListNgo() {
	const { ngos } = useHandleListOrganization();

	return (
		<>
			<main>
				{ngos.map((ngo: IRegisteredOrganization, index: number) => (
					<Card
						key={index}
						className=" m-4 dark:bg-gray-900 grid grid-cols-2"
					>
						<section>
							<CardHeader>
								<CardTitle className="flex justify-right">
									Organization: {ngo.name}
								</CardTitle>
								<CardDescription className="flex justify-right">
									From {ngo.city}, {ngo.uf}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul>
									<li>Email: {ngo.email}</li>
									<li>Whatsapp: {ngo.whatsapp}</li>
								</ul>
							</CardContent>
							<CardFooter className="flex justify-center"></CardFooter>
						</section>
						<aside className="bg-base-900 p-2">
							<div className="bg-base-700 text-base-200 text-9xl font-sans font-bold  w-full h-full p-2 rounded-xl flex justify-center items-center">
								{ngo.incident.length}
							</div>
						</aside>
					</Card>
				))}
			</main>
		</>
	);
}
