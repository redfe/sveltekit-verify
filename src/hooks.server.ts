import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const handle = (async ({ event, resolve }) => {
	event.locals.user = { id: '', name: '' };
	if (env.DEV_USER) {
		event.locals.user = JSON.parse(env.DEV_USER);
	} else {
		const header = event.request.headers.get('x-ms-client-principal');
		//console.log('### x-ms-client-principal', header);
		if (header) {
			const encoded = Buffer.from(header ?? '', 'base64');
			const decoded = encoded.toString('ascii');
			// console.log('### decoded', decoded);
			const user: any = JSON.parse(decoded);
			event.locals.user = { id: user.userId, name: user.userDetails };
		}
	}
	// console.log('### user at hook', event.locals.user);

	const response = await resolve(event);
	return response;
}) satisfies Handle;
