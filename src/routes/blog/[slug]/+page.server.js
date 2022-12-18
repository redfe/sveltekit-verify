import { posts } from '../blog-data.js';
import { error } from '@sveltejs/kit';

// @ts-ignore
export function load({ params }) {
	const post = posts.find((post) => post.slug === params.slug);

	if (!post) throw error(404);
	return { post };
}
