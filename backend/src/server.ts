import app from './app';
import morgan from 'morgan';
import http from 'http';
// import https from 'https';
// import fs from 'fs';

app.use(morgan('dev'));

const hostname = '0.0.0.0';
const httpPort = 8080;
const httpServer = http.createServer(app);
httpServer.listen({ hostname, port: httpPort }, () => {
	console.log(`🚀 HTTP server ready at http://localhost:${httpPort}`);
});

// const httpsOptions = {
// 	key: fs.readFileSync('/etc/nginx/ssl/nginx.key'),
// 	cert: fs.readFileSync('/etc/nginx/ssl/nginx.crt')
// };

// const httpsPort = 443;
// const httpsServer = https.createServer(httpsOptions, app);
// httpsServer.listen({ hostname, httpsPort }, () => {
// 	console.log(`HTTPS server ready at https://localhost:${httpsPort}`);
// });

// async function startServer() {
// const hostname = '0.0.0.0';
// const port = Number(process.env.PORT ?? 8080);

// const httpServer = http.createServer(app);

// new Promise<void>((resolve: (value: void | PromiseLike<void>) => void) =>
// 	httpServer.listen({ hostname, port }, resolve)
// );

// console.log(`🚀 Server ready at http://localhost:${port}`);
// }

// startServer();

// app.listen(port, hostname, () => {
// 	console.log(`🚀 Server ready at  http://localhost:${port}`);
// });
