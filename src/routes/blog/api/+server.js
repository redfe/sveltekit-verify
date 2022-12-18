import { json } from '@sveltejs/kit';

const posts = [
	{
		slug: 'my-blog-01',
		title: 'My Blog 01',
		content: 'Hello 1!'
	},
	{
		slug: 'my-blog-02',
		title: 'My Blog 02',
		content: 'Hello 2!'
	}
];

// @ts-ignore
export function GET({ params }) {
	if (params.slug) {
		return json(posts.find((post) => post.slug === params.slug));
	}
	return json(posts);
}
