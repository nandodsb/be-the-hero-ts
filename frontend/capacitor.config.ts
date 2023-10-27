import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.example.app',
	appName: 'be the hero',
	webDir: 'dist',
	bundledWebRuntime: false,

	server: {
		androidScheme: 'http',
		cleartext: true,
		allowNavigation: [
			'http://0.0.0.0:3000/v1/*',
			'http://localhost:5173/*',
			'http://localhost:8100/*'
		]
	}
};

export default config;
