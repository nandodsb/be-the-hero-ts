import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Contact() {
	return (
		<main>
			Contact
			<Avatar>
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</main>
	);
}
