<script lang="ts">
	import type { BlogSummary } from '$lib/types';
	export let data: { summaries: [BlogSummary] };
	export let form: any;
</script>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<form method="POST" action="?/add">
	<ul>
		<li>slug:<input type="text" name="slug" value={form?.slug ?? ''} required /></li>
		<li>title:<input type="text" name="title" value={form?.title ?? ''} required /></li>
		<li>content:<input type="text" name="content" value={form?.content ?? ''} /></li>
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

<style>
	.error {
		color: red;
	}
</style>
