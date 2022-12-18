<script>
	// @ts-ignore
	export let data = { summaries: [] };
</script>

<ul>
	{#each data.summaries as post}
		<li><a href="/blog/{post.slug}">{post.title}</a></li>
	{/each}
</ul>
