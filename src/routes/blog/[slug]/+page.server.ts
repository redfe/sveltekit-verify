import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const posts = await db.getAll();
	const post = posts.find((post) => post.slug === params.slug);
	if (!post) throw error(404);
	return { post };
}) satisfies PageServerLoad;
