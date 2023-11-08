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
	}
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',

	interpolation: {
		escapeValue: false
	}
});

export default i18n;
