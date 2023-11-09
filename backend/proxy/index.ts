import figlet from 'figlet';

const server = Bun.serve({
	port: 8081,
	fetch: () => {
		const body = figlet.textSync('Bun Proxy!');
		return new Response(body);
	}
	// certFile: './certs/localhost.crt',
	// keyFile: './certs/localhost.key'
});

console.log(`Listening on http://localhost:${server.port} ...`);
