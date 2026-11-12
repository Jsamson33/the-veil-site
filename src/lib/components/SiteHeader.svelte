<script lang="ts">
	import BrandSigil from './BrandSigil.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	const links = [
		{ href: '#concept', label: 'Le Concept' },
		{ href: '#elements', label: 'Les Flux' },
		{ href: '#cercle', label: 'Le Cercle Astral' },
		{ href: '#runes', label: 'Les Runes' },
		{ href: '#boucle', label: 'La Boucle' },
		{ href: '#faq', label: 'FAQ' }
	];

	let mobileOpen = $state(false);
</script>

<header class="site-header">
	<div class="header-container">
		<a href="#hero" class="brand-link" aria-label="Retour à l'accueil de The Veil">
			<BrandSigil />
			<div class="brand-text">
				<span class="brand-name">THE VEIL</span>
				<span class="brand-tag">ASTRAL IDLE</span>
			</div>
		</a>

		<!-- Desktop Navigation -->
		<nav class="desktop-nav" aria-label="Navigation principale">
			<ul class="nav-list">
				{#each links as link (link.href)}
					<li><a href={link.href} class="nav-link">{link.label}</a></li>
				{/each}
			</ul>
		</nav>

		<!-- Action buttons & Theme Switcher -->
		<div class="header-actions">
			<ThemeToggle />

			<a href="#telecharger" class="btn btn-gold btn-header">
				<span>Obtenir l'APK</span>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
					<polyline points="7 10 12 15 17 10"></polyline>
					<line x1="12" y1="15" x2="12" y2="3"></line>
				</svg>
			</a>

			<!-- Mobile hamburger toggle -->
			<button
				id="mobile-menu-btn"
				class="mobile-menu-btn"
				type="button"
				aria-expanded={mobileOpen}
				aria-controls="mobile-nav"
				aria-label="Ouvrir le menu"
				onclick={() => (mobileOpen = !mobileOpen)}
			>
				<span class="bar"></span>
				<span class="bar"></span>
				<span class="bar"></span>
			</button>
		</div>
	</div>

	<!-- Mobile Drawer Nav -->
	<div id="mobile-nav" class="mobile-nav" hidden={!mobileOpen}>
		<ul class="mobile-nav-list">
			{#each links as link (link.href)}
				<li>
					<a href={link.href} class="mobile-nav-link" onclick={() => (mobileOpen = false)}>
						{link.label}
					</a>
				</li>
			{/each}
			<li>
				<a
					href="#telecharger"
					class="mobile-nav-link cta-mobile"
					onclick={() => (mobileOpen = false)}>Télécharger le jeu</a
				>
			</li>
		</ul>
	</div>
</header>
