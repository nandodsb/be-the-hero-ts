import { useToast } from '@/components/ui/use-toast';
import { INewIncident } from '@/interfaces';
import api from '@/services/api';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useHandleNewIncident() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [value, setValue] = useState<number | undefined>();
	const navigate = useNavigate();
	const { toast } = useToast();

	const ngoId = localStorage.getItem('ngoId');

	function handleNewIncidentChange(event: ChangeEvent<HTMLInputElement>) {
		switch (event.target.name) {
			case 'title':
				setTitle(event.target.value);
				break;
			case 'description':
				setDescription(event.target.value);
				break;
			case 'value':
				setValue(Number(event.target.value));
				break;
		}
	}

	/**
	 * Represents a new incident register
	 * @constructor
	 * @param { FormEvent<HTMLFormElement> } event
	 * @returns Ong id string to login
	 *
	 *
	 */
	async function handleNewIncident(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const newIncident: INewIncident = {
			title,
			description,
			value
		};

		try {
			await api.post('/incidents', newIncident, {
				headers: {
					Authorization: ngoId
				}
			});

			navigate('/profile');
		} catch (err) {
			// toast({
			// 	variant: 'destructive',
			// 	title: 'Unable to register a new case',
			// 	action: <ToastAction altText="Try again">Try again</ToastAction>
			// });
		}
	}
	return {
		title,
		description,
		value,
		setTitle,
		setDescription,
		setValue,
        handleNewIncidentChange,
		handleNewIncident
	};
}
