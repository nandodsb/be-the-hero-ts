import app from './app';
import morgan from 'morgan';

app.use(morgan('dev'));

const port = 3000;
const hostname = 'localhost';

app.listen(port, hostname, () => {
	console.log('Server is working');
});
