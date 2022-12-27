import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const handle = (async ({ event, resolve }) => {
	if (env.DEV_USER) {
		event.locals.user = JSON.parse(env.DEV_USER);
	} else {
		const header = event.request.headers.get('x-ms-client-principal');
		if (header) {
			const encoded = Buffer.from(header ?? '', 'base64');
			const decoded = encoded.toString('ascii');
			event.locals.user = JSON.parse(decoded);
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
