import type { PageServerLoad } from './$types';
import { posts } from './blog-data.js';

export const load = (({ locals }) => {
	console.log('######', locals.user);
	return {
		summaries: posts.map((post) => ({
			slug: post.slug,
			title: post.title
		}))
	};
}) satisfies PageServerLoad;
