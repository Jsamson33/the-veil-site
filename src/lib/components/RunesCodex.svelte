<script lang="ts">
	import { ELEMENT_LABELS, RUNE_CATEGORIES, RUNES_DATA } from '#lib/data/runes';
	import type { RuneCategoryTab } from '#lib/data/runes';

	let currentCategory = $state<RuneCategoryTab['id']>('all');
	let currentSearch = $state('');

	const filteredRunes = $derived.by(() => {
		const query = currentSearch.toLowerCase().trim();

		return RUNES_DATA.filter((rune) => {
			const matchesCategory = currentCategory === 'all' || rune.cat === currentCategory;
			const matchesSearch =
				!query ||
				rune.name.toLowerCase().includes(query) ||
				rune.effect.toLowerCase().includes(query) ||
				rune.num.toLowerCase().includes(query) ||
				rune.element.toLowerCase().includes(query) ||
				(rune.elemLabel?.toLowerCase().includes(query) ?? false);

			return matchesCategory && matchesSearch;
		});
	});

	function selectCategory(tab: RuneCategoryTab) {
		currentCategory = tab.id;
	}

	function onTabKeydown(event: KeyboardEvent, index: number) {
		let targetIndex: number | null = null;

		if (event.key === 'ArrowRight') {
			targetIndex = (index + 1) % RUNE_CATEGORIES.length;
		} else if (event.key === 'ArrowLeft') {
			targetIndex = (index - 1 + RUNE_CATEGORIES.length) % RUNE_CATEGORIES.length;
		} else if (event.key === 'Home') {
			targetIndex = 0;
		} else if (event.key === 'End') {
			targetIndex = RUNE_CATEGORIES.length - 1;
		}

		if (targetIndex !== null) {
			event.preventDefault();
			selectCategory(RUNE_CATEGORIES[targetIndex]);
			const nextTab = document.getElementById(`tab-${RUNE_CATEGORIES[targetIndex].id}`);
			nextTab?.focus();
		}
	}
</script>

<section class="section runes-section" id="runes">
	<div class="container">
		<div class="section-heading text-center">
			<span class="section-kicker">Grimoire Pratique</span>
			<h2 class="section-title">LE CODEX DES 28 RUNES</h2>
			<p class="section-subtitle">
				Explorez l'arsenal complet des runes forgées dans l'Atelier. Améliorez-les temporairement pendant une run
				avec vos énergies, puis ancrez définitivement leur puissance avec l'Ambre Astral.
			</p>
		</div>

		<!-- Accessible Tabs conforming to modern-web-guidance -->
		<div class="runes-tabs-container">
			<div
				class="tabs-wrapper"
				role="tablist"
				{...({ focusgroup: 'tablist nomemory' } as Record<string, string>)}
				aria-label="Catégories des runes de The Veil"
			>
				{#each RUNE_CATEGORIES as tab, index (tab.id)}
					<button
						type="button"
						role="tab"
						id="tab-{tab.id}"
						class="tab-btn"
						aria-selected={currentCategory === tab.id}
						tabindex={currentCategory === tab.id ? 0 : -1}
						{...({
							focusgroupstart: currentCategory === tab.id ? '' : undefined
						} as Record<string, string | undefined>)}
						data-cat={tab.id}
						onclick={() => selectCategory(tab)}
						onkeydown={(event) => onTabKeydown(event, index)}>{tab.label}</button
					>
				{/each}
			</div>

			<!-- Quick Search Filter -->
			<div class="runes-search-box">
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
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
				<input
					type="text"
					id="rune-search"
					bind:value={currentSearch}
					placeholder="Rechercher une rune (ex: Critique, Viscosité, Ambre...)"
					aria-label="Rechercher dans le codex des runes"
				/>
			</div>
		</div>

		<!-- Tab Panels / Cards Grid -->
		<div
			class="runes-grid"
			id="runes-grid"
			role="region"
			aria-live="polite"
			aria-label="Liste des runes"
		>
			{#if filteredRunes.length === 0}
				<div class="runes-empty">
					<p class="runes-empty-title">Aucune rune ne répond à cette incantation.</p>
					<p class="runes-empty-hint">Essayez un autre mot-clé ou réinitialisez le filtre de catégorie.</p>
				</div>
			{:else}
				{#each filteredRunes as rune (rune.id)}
					<article class="rune-card" data-cat={rune.cat}>
						<div class="rune-card-top">
							<span class="rune-number-badge">{rune.num}</span>
							<span class="rune-elem-pill pill-{rune.element}">
								{rune.elemLabel ?? ELEMENT_LABELS[rune.element]}
							</span>
						</div>
						<h3 class="rune-title">{rune.name}</h3>
						<p class="rune-effect">{rune.effect}</p>
						<div class="rune-footer">
							<span>Déblocage Atelier :</span>
							<span class="rune-unlock">{rune.unlock}</span>
						</div>
					</article>
				{/each}
			{/if}
		</div>
	</div>
</section>
