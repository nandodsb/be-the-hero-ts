import { ModeToggle } from '@/components/mode-toggle';
import logo from '@/assets/logo.svg';

export default function Navbar() {
	return (
		<nav className="flex gap-10">
			<span className=" top-0 logo border-none w-6 h-6 flex justify-left items-center">
				<ModeToggle />
			</span>
			<a
				href="/"
				className="flex items-center mt-1 lg:invisible"
			>
				<img
					src={logo}
					alt="Be The Hero"
					className="w-15 h-10"
				/>
			</a>
		</nav>
	);
}
