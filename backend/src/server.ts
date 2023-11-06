import app from './app';
import morgan from 'morgan';

app.use(morgan('dev'));

const port = Number(process.env.PORT ?? 3000);
const hostname = '0.0.0.0';

app.listen(port, hostname, () => {
	console.log(`🚀 Server ready at  http://localhost:${port}`);
});
