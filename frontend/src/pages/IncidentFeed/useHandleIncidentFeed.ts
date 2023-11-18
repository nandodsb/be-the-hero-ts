import { IRegisteredIncidents } from '@/interfaces';
import api from '@/services/api';
import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

export default function useHandleIncidentFeed() {
	const incidentState = atom<IRegisteredIncidents[]>({
		key: 'incidentStateKey',
		default: []
	});

	const [incidents, setIncidents] = useRecoilState(incidentState);

	useEffect(() => {
		api.get('/feed').then((response) => {
			setIncidents(response.data);
		});
	}, [incidents]);
	return { incidents, setIncidents };
}
