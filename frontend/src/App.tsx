import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Navbar from './components/navbar';
import NewIncident from './pages/NewIncident';
import { Toaster } from '@/components/ui/toaster';
import About from './pages/About';
import Contact from './pages/Contact';

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
	},
	{
		path: '/about',
		element: <About />
	},
	{
		path: '/contact',
		element: <Contact />
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
