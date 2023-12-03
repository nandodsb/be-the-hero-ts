import { organizationState } from '@/recoil';
import api from '@/services/api';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function useHandleListOrganization() {
	const [ngos, setNgos] = useRecoilState(organizationState);

	useEffect(() => {
		api.get('/ngos').then((response) => {
			setNgos(response.data);
		});
	}, [ngos]);
	return { ngos };
}
