import { IRegisteredOrganization } from '@/interfaces';
import useHandleListOrganization from './useHandleListOrganization';

export default function ListNgo() {
	const { ngos } = useHandleListOrganization();

	return (
		<section>
			{ngos.map((ngo: IRegisteredOrganization, index: number) => (
				<div key={index}>{ngo.name}</div>
			))}
		</section>
	);
}
