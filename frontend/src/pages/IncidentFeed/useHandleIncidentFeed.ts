import { incidentState, organizationState } from '@/recoil';
import api from '@/services/api';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function useHandleIncidentFeed() {
	const [incidents, setIncidents] = useRecoilState(incidentState);
	const [ngo, setNgo] = useRecoilState(organizationState);

	useEffect(() => {
		api.get('/feed').then((response) => {
			setIncidents(response.data);
		});

		api.get('/ngos').then((response) => {
			setNgo(response.data);
		});
	}, [incidents, ngo]);
	return { incidents, setIncidents };
}
