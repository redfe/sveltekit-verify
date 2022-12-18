import { error } from '@sveltejs/kit';

// @ts-ignore
export async function load({ params }) {
	const response = await fetch('http://localhost:5173/blog/api');
	const posts = await response.json();
	// @ts-ignore
	const post = posts.find((post) => post.slug === params.slug);

	if (!post) throw error(404);

	return { post };
}
