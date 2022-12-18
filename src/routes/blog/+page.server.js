import { posts } from './blog-data.js';

export function load({ request, locals }) {
	console.log('######', locals);
	return {
		summaries: posts.map((post) => ({
			slug: post.slug,
			title: post.title
		}))
	};
}
