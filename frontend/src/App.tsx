import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Navbar from './components/navbar';
import NewIncident from './pages/NewIncident';
import { Toaster } from '@/components/ui/toaster';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Logon />
	},
	{
		path: '/register',
		element: (
			<>
				<Register />
			</>
		)
	},
	{
		path: '/profile',
		element: <Profile />
	},
	{
		path: '/incidents/new',
		element: <NewIncident />
	}
]);

function App() {
	return (
		<>
			<Navbar />
			<Toaster />
			<RouterProvider router={router} />
		</>
	);
}

export default App;
