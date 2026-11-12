<script lang="ts">
	import AstralSimulation from './AstralSimulation.svelte';
</script>

<section class="hero-section" id="hero">
	<div class="hero-layout">
		<!-- Left: Copy & Value Proposition -->
		<div class="hero-content">
			<div class="badge-pill">
				<span class="pulse-dot"></span>
				<span>Jeu Mobile Alchimique • Android & Flutter</span>
			</div>
			<h1 class="hero-title">
				DÉCHIREZ LE VOILE.<br />
				<span class="gradient-text">MAÎTRISEZ LES FLUX PRIMORDIAUX.</span>
			</h1>
			<p class="hero-pitch">
				Projetez votre conscience au-delà du Voile Astral. Laissez les flux primordiaux converger vers le cœur du Cercle,
				éveillez des runes oubliées et poursuivez les études de votre Grimoire. Chaque secret du Voile se mérite.
			</p>

			<div class="hero-actions">
				<a href="#telecharger" class="btn btn-gold btn-lg">
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
						<polyline points="7 10 12 15 17 10"></polyline>
						<line x1="12" y1="15" x2="12" y2="3"></line>
					</svg>
					<span>Télécharger l'APK</span>
				</a>
				<a href="#cercle" class="btn btn-outline btn-lg">
					<span>Voir la Simulation</span>
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<line x1="5" y1="12" x2="19" y2="12"></line>
						<polyline points="12 5 19 12 12 19"></polyline>
					</svg>
				</a>
			</div>

			<div class="hero-stats">
				<div class="stat-item">
					<span class="stat-number">∞</span>
					<span class="stat-label">Runes Éternelles</span>
				</div>
				<div class="stat-divider" aria-hidden="true"></div>
				<div class="stat-item">
					<span class="stat-number">◈</span>
					<span class="stat-label">Flux Primordiaux</span>
				</div>
				<div class="stat-divider" aria-hidden="true"></div>
				<div class="stat-item">
					<span class="stat-number">☾</span>
					<span class="stat-label">Grimoire en éveil</span>
				</div>
				<div class="stat-divider" aria-hidden="true"></div>
				<div class="stat-item">
					<span class="stat-number">✦</span>
					<span class="stat-label">Zen & Sans Bruit</span>
				</div>
			</div>
		</div>

		<!-- Right: Interactive Astral Circle Simulation -->
		<AstralSimulation />
	</div>
</section>
