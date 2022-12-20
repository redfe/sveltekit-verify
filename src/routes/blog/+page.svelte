<script lang="ts">
	import type { BlogSummary } from '$lib/types';
	export let data: { summaries: [BlogSummary] };
</script>

<form method="POST" action="?/add">
	<ul>
		<li>slug:<input type="text" name="slug" /></li>
		<li>title:<input type="text" name="title" /></li>
		<li>content:<input type="text" name="content" /></li>
	</ul>
	<button>add</button>
</form>
<ul>
	{#each data.summaries as post}
		<li>
			<form method="POST" action="?/remove" style="display: inline;">
				<input type="hidden" name="slug" value={post.slug} />
				<button>x</button>
			</form>

			<a href="/blog/{post.slug}">{post.title}</a>
		</li>
	{/each}
</ul>
