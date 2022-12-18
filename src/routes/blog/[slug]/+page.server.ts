import type { PageServerLoad } from './$types';
import { posts } from '../blog-data.js';
import { error } from '@sveltejs/kit';

export const load = (({ params }) => {
	const post = posts.find((post) => post.slug === params.slug);
	if (!post) throw error(404);
	return { post };
}) satisfies PageServerLoad;
