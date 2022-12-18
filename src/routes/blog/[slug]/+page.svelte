<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let data = { post: {} };

	onMount(async () => {
		let slug = $page.params.slug;
		const response = await fetch(`/blog/api?slug=${slug}`);
		data = { post: await response.json() };
	});
</script>

<h2>{data.post.title}</h2>

<div>{data.post.content}</div>
