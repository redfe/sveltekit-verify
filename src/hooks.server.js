export const handle = async ({ event, resolve }) => {
	event.locals.user = { name: 'user01' };

	const response = await resolve(event);
	return response;
};
