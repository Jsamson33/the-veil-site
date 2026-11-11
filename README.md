# 🌌 The Veil: Astral Idle — Site Vitrine Officiel

> **Site vitrine statique moderne et contemplatif pour le jeu mobile *The Veil: Astral Idle*.**

Ce dépôt héberge le site officiel de présentation de **The Veil: Astral Idle**, un Idle Game alchimique et stratégique développé sous Flutter pour Android.

---

## ✨ Fonctionnalités du Site

- **Simulation interactive du Cercle Astral (Canvas HTML5 / Canvas 2D)** :
  - Particules élémentaires d'Air (Vert Céladon), de Terre (Ocre Ambré) et d'Eau (Bleu Azur) aspirées vers le centre du vortex.
  - Dérive du Gardien / Mini-Boss de vague.
  - Rayon Tri-Phasé continu tressé verrouillant la cible à l'entrée du Cercle.
  - Interaction utilisateur : clic/toucher pour déclencher une *Onde de Répulsion*, filtres par élément et sélecteur de vitesse ($\times 1$, $\times 2$, $\times 5$).
- **Codex des 28 Runes du jeu** :
  - Données fidèles aux spécifications du jeu (*Canalisation*, *Égide*, *Alchimie*, *Synergies*).
  - Onglets accessibles conformes aux standards ARIA (*WAI-ARIA Tabs* & *focusgroup*).
  - Barre de recherche instantanée.
- **Thème bimodal Parchemin Hermétique & Nuit Astrale** :
  - Support de `light-dark()` et `<meta name="color-scheme">` sans flash (anti-FOUC).
  - Palette originale du jeu (`#FAF8F5`, `#D4AF37`, `#8A7968`, etc.).
- **Architecture de jeu & Présentation "Ora et Labora"** :
  - Explication de la boucle de run et de la métaprogression dans l'Atelier et le Grimoire.
- **Section Téléchargement & FAQ intégrée** :
  - Accès aux releases APK Android et aperçu du déploiement Store.
- **Déploiement GitHub Pages automatisé** :
  - Workflow GitHub Actions inclus (`.github/workflows/deploy.yml`).

---

## 🛠️ Démarrage Local

Le site est conçu en **HTML5 / CSS3 / JavaScript moderne (vanilla)**, sans dépendance runtime obligatoire.

### Option 1 : Avec npx / Vite (recommandé)

```bash
# Lancer le serveur de développement local avec rechargement à chaud
npx vite
# Ou ouvrir sur http://localhost:5173
```

### Option 2 : Avec un serveur HTTP standard

```bash
# Via Python
python3 -m http.server 8080

# Ou via npx serve
npx serve .
```

---

## 📂 Structure du Projet

```text
the-veil-site/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Déploiement automatique sur GitHub Pages
├── assets/
│   ├── favicon.png           # Favicon du site
│   └── icons/
│       └── icon-512.png      # Icône haute résolution du jeu
├── index.html                # Page d'accueil complète et accessible
├── style.css                 # Feuille de style moderne avec light-dark()
├── main.js                   # Moteur de simulation Canvas & Codex
├── package.json              # Scripts et dépendances de développement
├── .gitignore                # Fichiers exclus du versionnement
├── LICENSE                   # Licence MIT
└── README.md                 # Documentation du projet
```

---

## 📜 Licence

Projet distribué sous licence MIT. Voir [`LICENSE`](LICENSE) pour plus de détails.
