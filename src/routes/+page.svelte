<script lang="ts">
	import Hero from '#lib/components/Hero.svelte';
	import ConceptSection from '#lib/components/ConceptSection.svelte';
	import ElementsSection from '#lib/components/ElementsSection.svelte';
	import RuneSystemSection from '#lib/components/RuneSystemSection.svelte';
	import LoopSection from '#lib/components/LoopSection.svelte';
	import ScreensSection from '#lib/components/ScreensSection.svelte';
	import FaqSection from '#lib/components/FaqSection.svelte';
	import DownloadSection from '#lib/components/DownloadSection.svelte';
</script>

<svelte:head>
	<title>The Veil: Astral Idle — Jeu Mobile Alchimique & Stratégique</title>
	<meta
		name="description"
		content="Découvrez The Veil: Astral Idle, l'idle game alchimique sur Android. Franchissez le Voile, éveillez vos runes et poursuivez les études de votre Grimoire. Le reste reste à découvrir."
	/>
	<meta
		name="keywords"
		content="The Veil, Astral Idle, Idle Game, Alchimie, Flutter, Android Game, Runes, Astral Plane"
	/>
	<meta name="author" content="Jsamson" />

	<!-- Open Graph / Social Media -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="The Veil: Astral Idle — Jeu Mobile Alchimique & Stratégique" />
	<meta
		property="og:description"
		content="Plongez au-delà du Voile Astral. Laissez les flux primordiaux converger, éveillez vos runes et domptez le Grimoire. Un sanctuaire alchimique à découvrir."
	/>
	<meta property="og:image" content="assets/icons/icon-512.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="The Veil: Astral Idle" />
	<meta
		name="twitter:description"
		content="Idle Game Alchimique d'expéditions astrales et de transmutation continue."
	/>
	<meta name="twitter:image" content="assets/icons/icon-512.png" />
</svelte:head>

<main id="main-content">
	<Hero />
	<ConceptSection />
	<ElementsSection />
	<RuneSystemSection />
	<LoopSection />
	<ScreensSection />
	<FaqSection />
	<DownloadSection />
</main>
