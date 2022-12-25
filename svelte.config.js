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
					},
					{
						route: '/*',
						allowedRoles: ['admin']
					}
				],
				responseOverrides: {
					401: {
						redirect: '/.auth/login/github?post_login_redirect_uri=.referrer',
						statusCode: 302
					}
				}
			}
		})
	}
};

export default config;
