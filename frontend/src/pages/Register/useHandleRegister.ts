import { useToast } from '@/components/ui/use-toast';
import { INewOrganization } from '@/interfaces';
import api from '@/services/api';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useHandleRegister() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [whatsapp, setWhatsapp] = useState('');
	const [city, setCity] = useState('');
	const [uf, setUf] = useState('');
	const navigate = useNavigate();
	const { toast } = useToast();

	async function handleRegister(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const newOrganization: INewOrganization = {
			name,
			email,
			whatsapp,
			city,
			uf
		};

		try {
			const response = await api.post('/ngos', newOrganization);

			alert(`Your access ID is: ${response.data.id}`);

			navigate('/profile');
		} catch (err) {
			// toast({
			// 	title: 'Register failed, try again',
			// 	action: <ToastAction altText="Try again">Try again</ToastAction>
			// });
		}
	}

	return {
		name,
		setName,
		email,
		setEmail,
		whatsapp,
		setWhatsapp,
		city,
		setCity,
		uf,
		setUf,
		handleRegister
	};
}
