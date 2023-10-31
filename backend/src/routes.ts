import express from 'express';
import { createNgo, getAllNgos } from './controllers/NgoController';
import {
	createIncident,
	deleteIncident,
	getAllIncidents,
	getOneIncident,
	getNgoIncidents
} from './controllers/IncidentController';
import { createSession } from './controllers/SessionController';
import { getProfile } from './controllers/ProfileController';
import { isAuthenticated } from './utils/middleware';

export const routes = express.Router();

//NGO Routes
routes.get('/ngos', getAllNgos);
routes.post('/ngos', createNgo);

//Incident Routes
routes.get('/incidents/all', getAllIncidents);
routes.get('/incidents/:id', getOneIncident);
routes.get('/incidents', isAuthenticated, getNgoIncidents);
routes.post('/incidents', isAuthenticated, createIncident);
routes.delete('/incidents/:id', isAuthenticated, deleteIncident);

routes.get('/profile', isAuthenticated, getProfile);

routes.post('/sessions', createSession);
