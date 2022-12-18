import type { PageServerLoad } from './$types';
import type { BlogSummary } from '$lib/types';
import { posts } from './blog-data.js';

export const load = (({ locals }) => {
	console.log('######', locals.user);

	const summaries: BlogSummary[] = posts.map((post) => ({
		slug: post.slug,
		title: post.title
	}));

	return { summaries };
}) satisfies PageServerLoad;
