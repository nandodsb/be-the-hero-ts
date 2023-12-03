import { Toaster } from '@/components/ui/toaster';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import Navbar from './components/navbar';
import './i18n';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NewIncident from './pages/NewIncident';
import Profile from './pages/Profile';
import Register from './pages/Register';
import IncidentFeed from './pages/IncidentFeed';
import Layout from './layout';
import ListNgo from './pages/ListNgo';

const routes = [
	{ path: '/', element: <Login /> },
	{
		path: '/feed',
		element: (
			<Layout>
				<IncidentFeed />
			</Layout>
		)
	},
	{
		path: '/list',
		element: (
			<Layout>
				<ListNgo />
			</Layout>
		)
	},
	{ path: '/register', element: <Register /> },
	{ path: '/profile', element: <Profile /> },
	{ path: '/incidents/new', element: <NewIncident /> },
	{ path: '/about', element: <About /> },
	{ path: '/contact', element: <Contact /> }
];

const router = createBrowserRouter(routes);

function App() {
	return (
		<RecoilRoot>
			<Navbar />
			<Toaster />
			<RouterProvider router={router} />
		</RecoilRoot>
	);
}

export default App;
