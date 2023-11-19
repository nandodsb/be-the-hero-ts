import express from 'express';
import { getAllIncidents } from './controllers/FeedController';
import {
	createIncident,
	deleteIncident,
	getNgoIncidents,
	getOneIncident
} from './controllers/IncidentController';
import { createNgo, deleteNgo, getAllNgos } from './controllers/NgoController';
import { getProfile } from './controllers/ProfileController';
import { createSession } from './controllers/SessionController';
import { isAuthenticated } from './utils/middleware';

export const routes = express.Router();

//NGO Routes
routes.get('/ngos', getAllNgos);
routes.post('/ngos', createNgo);

routes.delete('/ngos/:id', isAuthenticated, deleteNgo);

routes.get('/feed', getAllIncidents);

//Incident Routes
routes.get('/incidents/:id', getOneIncident);
routes.get('/incidents', isAuthenticated, getNgoIncidents);
routes.post('/incidents', isAuthenticated, createIncident);
routes.delete('/incidents/:id', isAuthenticated, deleteIncident);

routes.get('/profile', isAuthenticated, getProfile);

routes.post('/sessions', createSession);
