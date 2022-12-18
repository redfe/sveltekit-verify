<script lang="ts">
	import type { Blog } from '$lib/types';
	export let data: { post: Blog };
</script>

<h2>{data.post.title}</h2>

<div>{data.post.content}</div>
