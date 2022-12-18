<script lang="ts">
	import type { BlogSummary } from '$lib/types';
	export let data: { summaries: [BlogSummary] };
</script>

<ul>
	{#each data.summaries as post}
		<li><a href="/blog/{post.slug}">{post.title}</a></li>
	{/each}
</ul>
