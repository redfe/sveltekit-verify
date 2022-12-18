<nav>
	<ul>
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/blog">Blog</a>
		</li>
	</ul>
</nav>

<main>
	<slot />
</main>

<style>
	nav {
		background-color: cornflowerblue;
		padding: 0.25em 0;
	}
	nav > ul > li {
		list-style: none;
		display: inline;
		margin-right: 1em;
	}
</style>
