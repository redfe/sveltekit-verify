import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
	const posts = await db.getAll(locals.user.id);
	const post = posts.find((post) => post.slug === params.slug);
	if (!post) throw error(404);
	return { post };
}) satisfies PageServerLoad;
