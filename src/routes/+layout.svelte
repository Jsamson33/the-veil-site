<script lang="ts">
	import '../app.css';
	import type { LayoutProps } from './$types';
	import SacredBackground from '#lib/components/SacredBackground.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';

	let { children }: LayoutProps = $props();
</script>

<SacredBackground />
<SiteHeader />

{@render children()}

<SiteFooter />
