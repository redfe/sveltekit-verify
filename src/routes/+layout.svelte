<script lang="ts">
	export let data: { user: { id: string; name: string } };
</script>

<nav>
	<ul class="nav">
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/blog">Blog</a>
		</li>
	</ul>
	<ul class="username">
		<li>
			{data.user.name}
		</li>
	</ul>
</nav>

<main>
	<slot />
</main>

<style>
	nav {
		background-color: cornflowerblue;
		padding: 1em 2em;
		display: flex;
		justify-content: space-between;
	}
	nav > ul {
		margin: 0;
		padding: 0;
	}
	nav > ul > li {
		list-style: none;
		display: inline;
	}
	nav > .nav > li {
		margin-right: 1em;
	}
	nav > .username {
		display: flex;
		justify-content: end;
	}
</style>
