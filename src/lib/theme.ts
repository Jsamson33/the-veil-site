export type Theme = 'light' | 'dark';

/**
 * Resolve the theme currently rendered by the browser.
 * The inline script in app.html keeps `<meta name="color-scheme">` in sync with
 * localStorage, so the meta tag is the single source of truth at runtime.
 */
export function getRenderedTheme(): Theme {
	if (typeof window === 'undefined' || typeof document === 'undefined') return 'light';

	const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
	if (meta?.content === 'dark') return 'dark';
	if (meta?.content === 'light') return 'light';

	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Flip between the two visual identities (Nuit Astrale / Parchemin Hermétique).
 * Selecting the system preference clears the override so the OS keeps control.
 */
export function toggleTheme(): Theme {
	const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
	const rendered = getRenderedTheme();
	const target: Theme = rendered === 'dark' ? 'light' : 'dark';
	const systemPreference: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';

	if (target === systemPreference) {
		localStorage.removeItem('color-scheme');
		if (meta) meta.content = 'light dark';
	} else {
		localStorage.setItem('color-scheme', target);
		if (meta) meta.content = target;
	}

	return target;
}
