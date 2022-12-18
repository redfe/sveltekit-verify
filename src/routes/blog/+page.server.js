export async function load() {
	const response = await fetch('http://localhost:5173/blog/api');
	const posts = await response.json();

	return {
		// @ts-ignore
		summaries: posts.map((post) => ({
			slug: post.slug,
			title: post.title
		}))
	};
}
