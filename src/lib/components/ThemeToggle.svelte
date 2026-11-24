<script lang="ts">
	import { toggleTheme } from '#lib/theme';
</script>

<button
	id="theme-toggle"
	class="theme-toggle"
	type="button"
	aria-label="Changer de thème visuel"
	onclick={() => toggleTheme()}
>
	<span class="theme-icon light-icon" title="Passer en mode Nuit Astrale" aria-hidden="true">
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
		</svg>
	</span>
	<span class="theme-icon dark-icon" title="Passer en mode Parchemin Hermétique" aria-hidden="true">
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="4"></circle>
			<path
				d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
			></path>
		</svg>
	</span>
</button>
