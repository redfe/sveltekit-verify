<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';

	export let data: PageData;
	export let form: ActionData;
	let saving = false;
	let deleting: string[] = [];
</script>

{#if form?.error}
	<p class="error">{form.error}</p>
{:else if saving}
	<p>保存中・・・</p>
{:else if deleting.length > 0}
	<p>削除中・・・</p>
{:else}
	<p>ブログ</p>
{/if}

<form
	method="POST"
	action="?/add"
	use:enhance={() => {
		saving = true;
		return async ({ update }) => {
			await update();
			saving = false;
		};
	}}
>
	<ul>
		<li>slug:<input type="text" name="slug" value={form?.slug ?? ''} required /></li>
		<li>title:<input type="text" name="title" value={form?.title ?? ''} required /></li>
		<li>content:<input type="text" name="content" value={form?.content ?? ''} /></li>
	</ul>
	<button>add</button>
</form>
<ul>
	{#each data.summaries.filter((post) => !deleting.includes(post.slug)) as post (post.id)}
		<!-- out: を使うと <a> をクリックしたときに遷移先の画面が一時的に表示されてしまう-->
		<li in:fly={{ y: 20 }}>
			<form
				method="POST"
				action="?/remove"
				use:enhance={() => {
					deleting = [...deleting, post.id];
					return async ({ update }) => {
						await update();
						deleting = deleting.filter((id) => id !== post.id);
					};
				}}
			>
				<input type="hidden" name="id" value={post.id} />
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
	li > form {
		display: inline;
	}
</style>
