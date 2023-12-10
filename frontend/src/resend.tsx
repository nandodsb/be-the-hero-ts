import { Resend } from 'resend';
import { Email } from './email';

const resend = new Resend(process.env.RESEND_API_KEY);

resend.emails.send({
	from: 'you@example.com',
	to: 'user@gmail.com',
	subject: 'hello world',
	react: (
		<Email
			firstName="John"
			product="MyApp"
		/>
	)
});
