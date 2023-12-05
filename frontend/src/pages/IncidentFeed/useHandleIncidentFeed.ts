import { incidentState } from '@/recoil';
import api from '@/services/api';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function useHandleIncidentFeed() {
	const [incidents, setIncidents] = useRecoilState(incidentState);

	useEffect(() => {
		api.get('/feed').then((response) => {
			setIncidents(response.data);
		});
	}, [incidents]);

	// function sendMail() {
	//     MailComposer.composeAsync({
	//         subject: `Herói do caso: ${incident.title} `,
	//         recipients: [incident.email],
	//         body: message,
	//     })
	// }

	// function sendWhatsapp() {
	//     Linking.openURL(
	//         `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
	//     )
	// }

	return { incidents };
}
