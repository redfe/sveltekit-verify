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
export const GET = ({ url }) => {
	const slug = url.searchParams.get('slug') ?? '';
	if (slug) {
		return json(posts.find((post) => post.slug === slug));
	}
	return json(posts);
};
