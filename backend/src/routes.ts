import express from 'express';
import { createOng, getAllOngs } from './controllers/OngController';
import {
	createIncident,
	deleteIncident,
	getAllIncidents,
	getOneIncident
} from './controllers/IncidentController';
import { createSession } from './controllers/SessionController';
import { getProfile } from './controllers/ProfileController';
import { isAuthenticated } from './middleware';

export const routes = express.Router();

//Ong Controller
routes.get('/ongs', getAllOngs);
routes.post('/ongs', createOng);

//Incident Controller
routes.get('/incidents/:id', getOneIncident);
routes.get('/incidents', getAllIncidents);
routes.post('/incidents', createIncident);
routes.delete('/incidents/:id', isAuthenticated, deleteIncident);

routes.get('/profile', isAuthenticated, getProfile);

routes.post('/sessions', createSession);
