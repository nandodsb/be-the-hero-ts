import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.example.app',
	appName: 'be the hero',
	webDir: 'dist',
	bundledWebRuntime: true,

	server: {
		androidScheme: 'http',
		cleartext: true,
		allowNavigation: ['http://localhost:3000/v1']
	}
};

export default config;
