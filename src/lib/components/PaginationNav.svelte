<script lang="ts">
	import type { Page } from '$lib/types';
	type T = $$Generic;
	export let page: Page<T>;
	export let createUrl: (targetPage: number) => string;
</script>

{#if page.currentPage <= 1}
	&lt;back
{:else}
	<a href={createUrl(page.currentPage - 1)}>&lt;back</a>
{/if}

<span>{page.currentPage}/{page.maxPage}</span>

{#if !page.hasNext}
	next&gt;
{:else}
	<a href={createUrl(page.currentPage + 1)}>next&gt;</a>
{/if}
