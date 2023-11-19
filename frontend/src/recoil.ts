import { atom } from 'recoil';
import { IRegisteredFeed, IRegisteredOrganization } from './interfaces';

export const incidentState = atom<IRegisteredFeed[]>({
	key: 'incidentStateKey',
	default: []
});

export const organizationState = atom<IRegisteredOrganization[]>({
	key: 'organizationStateKey',
	default: []
});
