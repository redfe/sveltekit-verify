import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
	const post = await db.get(params.id, locals.user.id);
	if (!post) throw error(404);
	return { post };
}) satisfies PageServerLoad;
