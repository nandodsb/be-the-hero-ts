/**
 *  @typedef {object} INewIncident
 */
export interface INewIncident {
	/**
	 *  The Short Title of New Incident created by  a NGO.
	 */
	title: string;
	/**
	 *  Description of the incident explaining the occurrence.
	 */
	description: string;
	/**
	 * 	The amount required by the NGO to expend in the issue.
	 */
	value: number | undefined;
}

export interface IRegisteredIncidents extends INewIncident {
	id: string;
}

export interface IRegisteredFeed extends IRegisteredIncidents {
	ngo: INewOrganization;
}
/**
 *
 */
export interface INewOrganization {
	name: string;
	email: string;
	whatsapp: string;
	city: string;
	uf: string;
}

export interface IRegisteredOrganization extends INewOrganization {
	id: string;
	ngoId: string;
	incident: IRegisteredIncidents[];
}
