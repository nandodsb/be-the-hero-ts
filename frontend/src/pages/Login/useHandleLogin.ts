// import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import api from '@/services/api';
import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function useHandleLogin() {
	const [id, setId] = useState('');
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { toast } = useToast();

	async function handleLogin(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		try {
			const response = await api.post('/sessions', { id });

			localStorage.setItem('ngoId', id);
			localStorage.setItem('ngoName', response.data.name);

			navigate('/profile');
		} catch (err) {
			// toast({
			// 	variant: 'destructive',
			// 	title: 'Login failed, try again',
			// 	action: <ToastAction altText="Try again">Try again</ToastAction>
			// });
			console.log(err);
		}
	}

	return { t, id, setId, toast, navigate, handleLogin };
}
