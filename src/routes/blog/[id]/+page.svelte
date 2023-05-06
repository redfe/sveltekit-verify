<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import Dialog from '$lib/components/Dialog.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let deleting = false;
	let deleteCompleted = false;

	const transitionToList = () => {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			goto('/blog');
		}
	};
</script>

<form
	method="post"
	action="?/remove"
	use:enhance={() => {
		deleting = true;
		return async ({ result }) => {
			if (result.type === 'success') {
				deleteCompleted = true;
			}
		};
	}}
>
	<button disabled={deleting}>delete</button>
</form>

<h2>{data.post.title}</h2>

<pre>{data.post.content}</pre>

{#if deleteCompleted}
	<Dialog>
		<div id="dialog">
			<div class="message">削除に成功しました。</div>
			<form on:submit|preventDefault={transitionToList}>
				<button>戻る</button>
			</form>
		</div>
	</Dialog>
{/if}

<style>
	#dialog {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1rem;
		width: 20rem;
		height: 7rem;
	}
	#dialog > * {
		display: flex;
		justify-content: center;
	}
	#dialog .message {
		margin-bottom: 1rem;
	}
</style>
