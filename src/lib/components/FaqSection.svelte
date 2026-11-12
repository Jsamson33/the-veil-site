<script lang="ts">
	const faq = [
		{
			question: 'Sur quelle plateforme le jeu est-il disponible ?',
			answer:
				"<strong>The Veil: Astral Idle</strong> est conçu avec Flutter et ciblé nativement pour les smartphones et tablettes <strong>Android</strong>. L'APK est téléchargeable directement sur ce site vitrine et arrive très prochainement sur le Google Play Store."
		},
		{
			question: 'Le jeu nécessite-t-il une connexion internet permanente ?',
			answer:
				"<strong>Non, absolument pas.</strong> The Veil est conçu selon une architecture <em>100 % Offline-First</em>. Toutes vos données de sauvegarde sont stockées localement sur votre appareil. Votre Grimoire continue ses études et l'Atelier distille passivement même en mode avion."
		},
		{
			question: 'Quelle est la différence avec les autres Tower Defense ou Idle Games ?',
			answer:
				"Contrairement aux jeux encombrés d'essaims chaotiques et d'effets aveuglants, The Veil privilégie une <strong>direction artistique épurée et zen</strong> avec un vortex circulaire clair, un <strong>unique Gardien par vague</strong>, une focalisation continue via le Rayon Tri-Phasé et un contrôle spatial précis (rayon du cercle, viscosité de dérive, onde de choc)."
		},
		{
			question: 'Comment fonctionnent les Strates du Voile ?',
			answer:
				"Lorsque vous franchissez l'étage 100 d'une strate, la strate suivante est déverrouillée. Les strates supérieures présentent des ennemis plus résistants et redoutables, mais décuplent les récompenses d'Ambre Astral obtenues par étage."
		},
		{
			question: "Qu'apportera la mise à jour V2 ?",
			answer:
				'La V2 introduira le <strong>Second Triplet Élémentaire</strong> : Feu, Foudre et Éther, accompagnés de nouveaux Gardiens Majeurs, de nouvelles matrices de runes à combiner et de fonctionnalités de transcendance astrale.'
		}
	];
</script>

<section class="section faq-section" id="faq">
	<div class="container max-w-narrow">
		<div class="section-heading text-center">
			<span class="section-kicker">Éclaircissements</span>
			<h2 class="section-title">FOIRE AUX QUESTIONS</h2>
			<p class="section-subtitle">
				Tout ce que vous devez savoir avant de franchir le Voile Astral.
			</p>
		</div>

		<div class="faq-list">
			{#each faq as item (item.question)}
				<details class="faq-item">
					<summary class="faq-question">
						<span>{item.question}</span>
						<span class="faq-icon" aria-hidden="true"></span>
					</summary>
					<div class="faq-answer">
						<p>{@html item.answer}</p>
					</div>
				</details>
			{/each}
		</div>
	</div>
</section>
