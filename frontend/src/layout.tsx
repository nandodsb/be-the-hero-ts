import React from 'react';

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<main className="w-full min-h-screen grid grid-cols-3 lg:grid-cols-6">
			<section className="lg:col-span-1"></section>
			<article className="block items-center justify-between bg-red-200 col-span-3 lg:col-span-4">
				{children}
			</article>
			<aside className=" lg:col-span-1"></aside>
		</main>
	);
}
