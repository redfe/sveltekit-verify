<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h2>{data.post.title}</h2>

<pre>{data.post.content}</pre>
