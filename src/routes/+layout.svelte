<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="flex justify-center p-2 border-8 border-blue-600 bg-red-500">
		<h1 class="text-4xl font-bold text-white">USA-VALET 2024</h1>
</nav>
{@render children()}
