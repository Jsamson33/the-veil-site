# AGENTS.md

Instructions pour les agents et développeurs travaillant sur ce dépôt.

## Production

- **Cible de production unique : Firebase Hosting.**
  - Projet Firebase : `the-veil-bc9cb`
  - URL : https://the-veil-bc9cb.web.app
  - Config : `firebase.json` (dossier `build/`, `predeploy: npm run build`)
- Déploiement manuel : `npx firebase-tools deploy`
- Déploiement automatique : workflow `.github/workflows/firebase-hosting-merge.yml` à chaque push sur `main`.
- Prévisualisation : workflow `.github/workflows/firebase-hosting-pull-request.yml` sur les PR.

## GitHub Pages

- **GitHub Pages n'est PAS utilisé pour le site de production.** La prod passe exclusivement par Firebase.
- Le workflow `.github/workflows/deploy.yml` est conservé volontairement pour un éventuel usage futur, sans lien avec la prod du site.
- Ne pas supprimer ni désactiver ce workflow sans validation explicite.
- Un échec du workflow GitHub Pages (ex. Pages non activé dans les réglages du repo) **n'est pas un incident de production**. La prod Firebase n'est pas affectée.

## Stack

- Svelte 5 + SvelteKit 3 + Vite 8 + TypeScript
- Rendu statique via `@sveltejs/adapter-static`
- Node.js `>=22.17`

## Commandes

```bash
npm install        # installer les dépendances
npm run dev        # serveur de développement
npm run check      # vérification TypeScript / Svelte
npm run build      # build statique dans build/
npm run preview    # prévisualiser le build
```

## Contenu

- Le site est **volontairement évasif** : ne pas détailler les runes, le Grimoire, l'Atelier ni les mécaniques de progression.
- Mentionner les systèmes, mais préserver le mystère. Éviter les spoilers (noms de runes, effets, couleurs exactes, rôles tactiques, numéros d'étage, rangs nommés).
