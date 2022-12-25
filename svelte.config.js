import azure from 'svelte-adapter-azure-swa';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: azure({
			customStaticWebAppConfig: {
				routes: [
					{
						route: '/login',
						redirect: '/.auth/login/github',
						allowedRoles: ['admin']
					}
				],
				responseOverrides: {
					401: {
						redirect: '/login',
						statusCode: 302
					}
				}
			}
		})
	}
};

export default config;
