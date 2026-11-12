# 🌌 The Veil: Astral Idle — Site Vitrine Officiel

> **Site vitrine moderne et contemplatif pour le jeu mobile *The Veil: Astral Idle*.**

Ce dépôt héberge le site officiel de présentation de **The Veil: Astral Idle**, un Idle Game alchimique et stratégique développé sous Flutter pour Android.

Le site est construit avec **Svelte 5** et **SvelteKit 3**, rendu entièrement en statique via `@sveltejs/adapter-static`.

---

## ✨ Fonctionnalités du Site

- **Simulation interactive du Cercle Astral (Canvas HTML5 / Canvas 2D)** :
  - Particules élémentaires d'Air (Vert Céladon), de Terre (Ocre Ambré) et d'Eau (Bleu Azur) aspirées vers le centre du vortex.
  - Dérive du Gardien / Mini-Boss de vague.
  - Rayon Tri-Phasé continu tressé verrouillant la cible à l'entrée du Cercle.
  - Interaction utilisateur : clic/toucher pour déclencher une *Onde de Répulsion*, filtres par élément et sélecteur de vitesse (× 1, × 2, × 5).
- **Codex des 28 Runes du jeu** :
  - Données typées et centralisées dans `src/lib/data/runes.ts`.
  - Onglets accessibles conformes aux standards ARIA (*WAI-ARIA Tabs*, roving tabindex).
  - Barre de recherche instantanée, rendue côté serveur au build.
- **Thème bimodal Parchemin Hermétique & Nuit Astrale** :
  - Support de `light-dark()` et `<meta name="color-scheme">` sans flash (anti-FOUC).
  - Palette originale du jeu (`#FAF8F5`, `#D4AF37`, `#8A7968`, etc.).
- **Architecture de jeu & Présentation "Ora et Labora"** :
  - Explication de la boucle de run et de la métaprogression dans l'Atelier et le Grimoire.
- **Section Téléchargement & FAQ intégrée** :
  - Accès aux releases APK Android et aperçu du déploiement Store.
- **Déploiement statique automatisé** :
  - Workflows GitHub Actions pour GitHub Pages et Firebase Hosting.

---

## 🛠️ Démarrage Local

Prérequis : **Node.js 22.17+** et npm.

```bash
npm install

# Serveur de développement avec rechargement à chaud
npm run dev
# http://localhost:5173

# Vérification TypeScript / Svelte
npm run check

# Build statique de production (dossier build/)
npm run build

# Prévisualisation du build
npm run preview
```

### Déploiement Firebase

`firebase.json` pointe vers le dossier `build/` et lance automatiquement `npm run build` avant chaque déploiement :

```bash
npx firebase-tools deploy
```

---

## 📂 Structure du Projet

```text
the-veil-site/
├── .github/workflows/         # CI : GitHub Pages & Firebase Hosting
├── src/
│   ├── app.html               # Shell HTML, polices, anti-FOUC, favicon
│   ├── app.css                # Design system global (thèmes light-dark)
│   ├── lib/
│   │   ├── components/        # Sections et îlots interactifs Svelte 5
│   │   ├── data/runes.ts      # Les 28 runes du Codex (données typées)
│   │   ├── theme.ts           # Gestion du thème clair/sombre
│   │   └── index.ts
│   └── routes/
│       ├── +layout.svelte     # Chrome du site (fond, header, footer)
│       ├── +layout.ts         # Prerender global
│       └── +page.svelte       # Page d'accueil et métadonnées SEO
├── static/
│   └── assets/                # Favicon et icônes servis tels quels
├── vite.config.ts             # Config Vite + SvelteKit + adapter-static
├── firebase.json              # Hébergement Firebase (build/)
├── package.json
├── LICENSE                    # Licence MIT
└── README.md
```

---

## 📜 Licence

Projet distribué sous licence MIT. Voir [`LICENSE`](LICENSE) pour plus de détails.
