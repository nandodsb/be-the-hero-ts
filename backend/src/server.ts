import app from './app';
import morgan from 'morgan';
import https from 'https';
import fs from 'fs';

app.use(morgan('dev'));

const options = {
	// key: fs.readFileSync('/srv/www/keys/key.pem'),
	// cert: fs.readFileSync('/srv/www/keys/cert.pem')
};
const hostname = '0.0.0.0';
const port = Number(process.env.PORT ?? 8080);

// const httpsServer = https.createServer(options, app);

// httpsServer.listen({ host: '0.0.0.0', port }, () => {
// 	console.log(`🚀 Server ready at https://localhost:${port}`);
// });

app.listen(port, hostname, () => {
	console.log(`🚀 Server ready at  http://localhost:${port}`);
});
