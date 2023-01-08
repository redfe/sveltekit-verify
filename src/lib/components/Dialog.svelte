<script>
	import { fly, fade } from 'svelte/transition';
</script>

<div class="overlay" in:fade>
	<div class="dialog" in:fade>
		<slot />
	</div>
</div>

<style>
	.overlay {
		display: flex;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.dialog {
		max-width: 50rem;
		background-color: white;
		box-shadow: 0 0 8rem 0 rgba(0, 0, 0, 0.5);
		align-self: center;
		padding: 0.5rem;
		box-sizing: border-box;
		border-radius: 0.75rem;
	}
</style>
