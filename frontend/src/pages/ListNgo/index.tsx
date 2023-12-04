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
								DESCRIPTION: {}
							</CardDescription>
						</CardHeader>
						<CardContent></CardContent>
						<CardFooter className="flex justify-center">
							<Button
								onClick={() => {}}
								type="button"
							></Button>
						</CardFooter>
					</section>
					<aside className="bg-secondary p-2">
						<div className="bg-primary w-full h-full p-2">A</div>
					</aside>
				</Card>
			))}
		</main>
	);
}
