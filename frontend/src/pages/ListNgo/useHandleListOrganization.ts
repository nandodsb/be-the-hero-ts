import { organizationState } from '@/recoil';
import api from '@/services/api';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default async function useHandleListOrganization() {
	const [organization, setOrganization] = useRecoilState(organizationState);

	useEffect(() => {
		api.get('/ngos').then((response) => {
			setOrganization(response.data);
		});
	}, [organization]);
	return { organization, setOrganization };
}
