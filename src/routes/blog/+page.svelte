<script>
	import { onMount } from 'svelte';

	// @ts-ignore
	let data = { summaries: [] };

	onMount(async () => {
		const response = await fetch('/blog/api');
		const posts = await response.json();
		data = {
			// @ts-ignore
			summaries: posts.map((post) => ({
				slug: post.slug,
				title: post.title
			}))
		};
	});
</script>

<ul>
	{#each data.summaries as post}
		<li><a href="/blog/{post.slug}">{post.title}</a></li>
	{/each}
</ul>
