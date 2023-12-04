import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	en: {
		translation: {
			'Welcome to Be The Hero': 'Welcome to Be The Hero App'
		}
	},
	fr: {
		translation: {
			'Welcome to Be The Hero': 'Bienvenue à Be The Hero App'
		}
	},
	nl: {
		translation: {
			'Welcome to Be The Hero': 'Welkom bij Be The Hero-app'
		}
	}
};

i18n.use(initReactI18next).init({
	lng: 'en',
	resources,

	interpolation: {
		escapeValue: false
	}
});

export default i18n;
