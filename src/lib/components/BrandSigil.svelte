<script lang="ts">
	let { small = false }: { small?: boolean } = $props();
</script>

<div class="brand-sigil" class:small aria-hidden="true">
	<svg viewBox="0 0 100 100" class="sigil-icon">
		<circle cx="50" cy="50" r="44" stroke="currentColor" stroke-width="2" fill="none" class="ring-outer" />
		<polygon points="50,14 81,68 19,68" stroke="currentColor" stroke-width="2" fill="none" class="ring-tri" />
		<circle cx="50" cy="50" r="16" stroke="currentColor" stroke-width="2.5" fill="none" class="ring-inner" />
		{#if !small}
			<circle cx="50" cy="50" r="5" fill="currentColor" class="ring-core" />
		{/if}
	</svg>
</div>
