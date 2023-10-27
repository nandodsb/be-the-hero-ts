import { ModeToggle } from '@/components/mode-toggle';

export default function Navbar() {
	return (
		<nav>
			<span className="absolute top-0 logo border-none w-6 h-6 flex justify-left items-center">
				<ModeToggle />
			</span>
		</nav>
	);
}
