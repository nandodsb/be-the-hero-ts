import app from './app';
import morgan from 'morgan';
import http from 'http';
// import fs from 'fs';

app.use(morgan('dev'));

const options = {
	// key: fs.readFileSync('/srv/www/keys/key.pem'),
	// cert: fs.readFileSync('/srv/www/keys/cert.pem')
};

// async function startServer() {
const hostname = '0.0.0.0';
const port = Number(process.env.PORT ?? 8080);

const httpServer = http.createServer(app);

new Promise<void>((resolve: (value: void | PromiseLike<void>) => void) =>
	httpServer.listen({ hostname, port }, resolve)
);

console.log(`🚀 Server ready at http://localhost:${port}`);
// }

// startServer();

// app.listen(port, hostname, () => {
// 	console.log(`🚀 Server ready at  http://localhost:${port}`);
// });
