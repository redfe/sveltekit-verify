<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	export let form: ActionData;
</script>

<h1>This is Home page.</h1>

<form method="POST" action="?/runBlobDemo" use:enhance>
	{#if form?.message}
		<div>{form.message}</div>
	{/if}
	<button>runBlobDemo</button>
</form>
