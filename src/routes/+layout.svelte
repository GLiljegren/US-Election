<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="flex justify-center p-2 border-b-1 border-slate-900 bg-slate-100 border-b-red-600 border-b-8">
		<h1 class="text-4xl font-bold text-yellow-400 font-mono drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">AFTONBLADET</h1>
</nav>
{@render children()}
