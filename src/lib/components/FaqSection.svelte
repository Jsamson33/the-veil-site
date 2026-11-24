<script lang="ts">
	const faq = [
		{
			question: 'Sur quelle plateforme le jeu est-il disponible ?',
			answer:
				"<strong>The Veil: Astral Idle</strong> est conçu avec Flutter pour <strong>Android</strong>. L'APK est disponible via ce site, et une arrivée sur le Store se prépare."
		},
		{
			question: 'Le jeu nécessite-t-il une connexion internet permanente ?',
			answer:
				"<strong>Non.</strong> Votre sanctuaire continue de veiller même hors-ligne. La progression ne dépend pas d'une connexion constante."
		},
		{
			question: 'Quelle est la différence avec les autres Tower Defense ou Idle Games ?',
			answer:
				'The Veil privilégie le calme, la contemplation et la précision plutôt que le chaos visuel. Le reste, vous le découvrirez en jouant.'
		},
		{
			question: 'Comment fonctionnent les Strates du Voile ?',
			answer:
				'Le Voile est vaste. Chaque strate franchie en révèle une autre, plus profonde et plus exigeante. La suite appartient aux initiés.'
		},
		{
			question: "Qu'apportera la mise à jour V2 ?",
			answer:
				"La V2 étendra les frontières du Voile. Nous n'en dirons pas plus pour l'instant."
		}
	];
</script>

<section class="section faq-section" id="faq">
	<div class="container max-w-narrow">
		<div class="section-heading text-center">
			<span class="section-kicker">Éclaircissements</span>
			<h2 class="section-title">FOIRE AUX QUESTIONS</h2>
			<p class="section-subtitle">
				Quelques réponses, sans trop en dévoiler.
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
