import { useToast } from '@/components/ui/use-toast';
import { IRegisteredIncidents } from '@/interfaces';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useHandleProfile() {
	const [incidents, setIncidents] = useState<IRegisteredIncidents[]>([]);
	const navigate = useNavigate();
	const { toast } = useToast();

	const ngoId = localStorage.getItem('ngoId');
	const ngoName: string = localStorage.getItem('ngoName')!;

	useEffect(() => {
		api
			.get('/profile', {
				headers: {
					Authorization: ngoId
				}
			})
			.then((response) => {
				setIncidents(response.data);
			});
	}, [ngoId]);

	async function handleDeleteIncident(id: string) {
		try {
			await api.delete(`/incidents/${id}`, {
				headers: {
					Authorization: ngoId
				}
			});

			setIncidents(incidents.filter((incident) => incident.id !== id));
		} catch (err) {
			alert('Error, unable to delete it.');
		}
	}

	function handleLogout() {
		localStorage.removeItem('ngoId');
		localStorage.removeItem('ngoName');
		localStorage.removeItem('token');
		sessionStorage.clear();
		toast({
			variant: 'destructive',
			title: 'Logout'
		});
		navigate('/');
	}

	return {
		ngoName,
		incidents,
		handleDeleteIncident,
		handleLogout
	};
}
