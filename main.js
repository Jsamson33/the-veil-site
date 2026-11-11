/**
 * The Veil: Astral Idle — Official Interactive Engine
 * Canvas simulation of the Astral Circle, interactive Runes Codex, accessible tabs & theme switcher.
 */

/* ==========================================================================
   1. Data: The 28 Runes from The Veil's Sacred Codex
   ========================================================================== */
const RUNES_DATA = [
  // Famille 1 — Canalisation (9 Runes)
  {
    id: "flux_air",
    num: "R1",
    name: "Flux d'Air",
    element: "air",
    cat: "canalisation",
    unlock: "Dès le départ",
    effect: "Augmente les dégâts de base de la phase Air du rayon tri-phasé (+12 % / niveau)."
  },
  {
    id: "flux_earth",
    num: "R2",
    name: "Flux de Terre",
    element: "earth",
    cat: "canalisation",
    unlock: "Dès le départ",
    effect: "Augmente les dégâts de base de la phase Terre du rayon tri-phasé (+12 % / niveau)."
  },
  {
    id: "flux_water",
    num: "R3",
    name: "Flux d'Eau",
    element: "water",
    cat: "canalisation",
    unlock: "Dès le départ",
    effect: "Augmente les dégâts de base de la phase Eau du rayon tri-phasé (+12 % / niveau)."
  },
  {
    id: "pulse_rate",
    num: "R4",
    name: "Fréquence de Pulsation",
    element: "neutral",
    cat: "canalisation",
    unlock: "Palier Atelier 1",
    effect: "Accélère la cadence de frappe continue du rayon tri-phasé (+4 % cadence / niveau)."
  },
  {
    id: "crit_chance",
    num: "R5a",
    name: "Chance Critique",
    element: "air",
    cat: "canalisation",
    unlock: "Palier Atelier 2",
    effect: "Augmente la probabilité de pulsation critique du rayon (+1,5 % / niveau, cap 80 %)."
  },
  {
    id: "crit_factor",
    num: "R5b",
    name: "Facteur Critique",
    element: "air",
    cat: "canalisation",
    unlock: "Palier Atelier 2",
    effect: "Augmente le multiplicateur de dégâts des pulsations critiques (+0,15× / niveau)."
  },
  {
    id: "circle_range",
    num: "R6",
    name: "Envergure du Cercle",
    element: "neutral",
    cat: "canalisation",
    unlock: "Palier Atelier 2",
    effect: "Agrandit le rayon du Cercle Astral : accroche le Mini-Boss plus tôt et prolonge sa trajectoire."
  },
  {
    id: "long_range_focus",
    num: "R7",
    name: "Focalisation Longue Portée",
    element: "water",
    cat: "canalisation",
    unlock: "Palier Atelier 3",
    effect: "Augmente les dégâts infligés proportionnellement à la distance qui sépare le Boss du centre."
  },
  {
    id: "aegis_breaker",
    num: "R8",
    name: "Brise-Égide",
    element: "earth",
    cat: "canalisation",
    unlock: "Palier Atelier 4",
    effect: "Démolit les boucliers élémentaires des Gardiens (+15 % / niveau) et réduit leur résistance."
  },

  // Famille 2 — Égide (9 Runes)
  {
    id: "mana_pool",
    num: "R9",
    name: "Réservoir de Mana",
    element: "neutral",
    cat: "aegis",
    unlock: "Dès le départ",
    effect: "Augmente la réserve de Mana maximale de l'Avatar (+20 points de Mana de base / niveau)."
  },
  {
    id: "inner_spring",
    num: "R10",
    name: "Source Intérieure",
    element: "water",
    cat: "aegis",
    unlock: "Dès le départ",
    effect: "Augmente la régénération naturelle et passive de Mana par seconde pendant le combat."
  },
  {
    id: "telluric_bark",
    num: "R11",
    name: "Écorce Tellurique",
    element: "earth",
    cat: "aegis",
    unlock: "Palier Atelier 1",
    effect: "Réduit en % tous les dégâts subis (distance et contact) (+1 % / niveau, cap à 75 %)."
  },
  {
    id: "flat_absorption",
    num: "R12",
    name: "Absorption Brute",
    element: "earth",
    cat: "aegis",
    unlock: "Palier Atelier 1",
    effect: "Soustrait un montant fixe absolu à chaque assaut reçu de la part des monstres."
  },
  {
    id: "astral_viscosity",
    num: "R13",
    name: "Viscosité Astrale",
    element: "water",
    cat: "aegis",
    unlock: "Palier Atelier 2",
    effect: "Ralentit la vitesse d'aspiration du Boss vers le centre, sans freiner les particules d'énergie."
  },
  {
    id: "repulsion_wave",
    num: "R14",
    name: "Onde de Répulsion",
    element: "air",
    cat: "aegis",
    unlock: "Palier Atelier 3",
    effect: "Toutes les X pulsations du rayon, repousse vivement le Boss vers la périphérie du Cercle."
  },
  {
    id: "thorn_mirror",
    num: "R15",
    name: "Miroir d'Épines",
    element: "earth",
    cat: "aegis",
    unlock: "Palier Atelier 3",
    effect: "Renvoie un pourcentage des PV du monstre en dégâts purs lors d'un impact direct avec le centre."
  },
  {
    id: "astral_siphon",
    num: "R16",
    name: "Siphon Astral",
    element: "water",
    cat: "aegis",
    unlock: "Palier Atelier 4",
    effect: "Transmute une quote-part des dégâts infligés par le rayon en restauration immédiate de Mana."
  },
  {
    id: "hermetic_reprieve",
    num: "R17",
    name: "Sursis Hermétique",
    element: "air",
    cat: "aegis",
    unlock: "Palier Atelier 5",
    effect: "Probabilité (cap 35 %) de conjurer un coup fatal, maintenant l'Avatar à 1 Mana avec onde de choc."
  },

  // Famille 3 — Alchimie (6 Runes)
  {
    id: "attract_air",
    num: "R18",
    name: "Attraction d'Air",
    element: "air",
    cat: "alchemy",
    unlock: "Dès le départ",
    effect: "Amplifie le rendement d'énergie d'Air récolté à chaque particule aspirée (+12 % / niveau)."
  },
  {
    id: "attract_earth",
    num: "R19",
    name: "Attraction de Terre",
    element: "earth",
    cat: "alchemy",
    unlock: "Dès le départ",
    effect: "Amplifie le rendement d'énergie de Terre récolté à chaque particule aspirée (+12 % / niveau)."
  },
  {
    id: "attract_water",
    num: "R20",
    name: "Attraction d'Eau",
    element: "water",
    cat: "alchemy",
    unlock: "Dès le départ",
    effect: "Amplifie le rendement d'énergie d'Eau récolté à chaque particule aspirée (+12 % / niveau)."
  },
  {
    id: "aspiration_vortex",
    num: "R21",
    name: "Vortex d'Aspiration",
    element: "neutral",
    cat: "alchemy",
    unlock: "Palier Atelier 1",
    effect: "Augmente la fréquence d'apparition et la vitesse de dérive des particules d'énergie ambiantes."
  },
  {
    id: "amber_condensation",
    num: "R22",
    name: "Condensation d'Ambre",
    element: "neutral",
    cat: "alchemy",
    unlock: "Palier Atelier 2",
    effect: "Augmente l'Ambre Astral récolté sur chaque Mini-Boss et Gardien dissous (+5 % / niveau)."
  },
  {
    id: "spontaneous_transmutation",
    num: "R24",
    name: "Transmutation Spontanée",
    element: "air",
    cat: "alchemy",
    unlock: "Palier Atelier 4",
    effect: "À chaque étage franchi, X% de chance qu'une rune débloquée aléatoire gagne +1 niveau gratuitement pour le reste de la run."
  },

  // Famille 4 — Synergies Hermétiques (4 Runes)
  {
    id: "synergy_tempest",
    num: "R25",
    name: "Tempête Conductrice",
    element: "synergy",
    elemLabel: "Air + Eau",
    cat: "synergies",
    unlock: "Palier Atelier 4",
    effect: "Chaque pulsation critique de la phase Air déclenche une onde d'Eau qui ralentit davantage la dérive du Mini-Boss pendant 2s."
  },
  {
    id: "synergy_monolith",
    num: "R26",
    name: "Monolithe Réfractaire",
    element: "synergy",
    elemLabel: "Terre + Air",
    cat: "synergies",
    unlock: "Palier Atelier 4",
    effect: "Chaque fois que l'Avatar subit ou absorbe une attaque, la Fréquence de Pulsation du rayon augmente de +X % pendant 3s."
  },
  {
    id: "synergy_surge",
    num: "R27",
    name: "Crue Tellurique",
    element: "synergy",
    elemLabel: "Eau + Terre",
    cat: "synergies",
    unlock: "Palier Atelier 5",
    effect: "Le surplus de régénération de Mana (quand le Mana est à 100 %) se cristallise en une Barrière Tellurique temporaire (jusqu'à +X % du Mana Max)."
  },
  {
    id: "synergy_trinity",
    num: "R28",
    name: "Trinité",
    element: "synergy",
    elemLabel: "Air + Terre + Eau",
    cat: "synergies",
    unlock: "Palier Atelier 5",
    effect: "Multiplie les dégâts totaux du Rayon Tri-Phasé par (1 + X%) tant que les 3 runes de flux (R1, R2, R3) sont maintenues à l'équilibre (écart maximal de ±2 niveaux entre elles)."
  }
];

/* ==========================================================================
   2. Codex UI Renderer & Tab Management
   ========================================================================== */
const runesGrid = document.getElementById("runes-grid");
const searchInput = document.getElementById("rune-search");
const tabButtons = document.querySelectorAll(".tabs-wrapper .tab-btn");

let currentCategory = "all";
let currentSearch = "";

function renderRunes() {
  if (!runesGrid) return;

  const filtered = RUNES_DATA.filter((rune) => {
    const matchesCat = currentCategory === "all" || rune.cat === currentCategory;
    const q = currentSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      rune.name.toLowerCase().includes(q) ||
      rune.effect.toLowerCase().includes(q) ||
      rune.num.toLowerCase().includes(q) ||
      rune.element.toLowerCase().includes(q) ||
      (rune.elemLabel && rune.elemLabel.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    runesGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p style="font-family: var(--font-serif); font-size: 1.1rem; margin-bottom: 8px;">Aucune rune ne répond à cette incantation.</p>
        <p style="font-size: 0.85rem;">Essayez un autre mot-clé ou réinitialisez le filtre de catégorie.</p>
      </div>
    `;
    return;
  }

  runesGrid.innerHTML = filtered
    .map((rune) => {
      const elemClass = `pill-${rune.element}`;
      const elemLabel =
        rune.elemLabel ||
        (rune.element === "air"
          ? "Air"
          : rune.element === "earth"
          ? "Terre"
          : rune.element === "water"
          ? "Eau"
          : "Neutre");

      return `
      <article class="rune-card" data-cat="${rune.cat}">
        <div class="rune-card-top">
          <span class="rune-number-badge">${rune.num}</span>
          <span class="rune-elem-pill ${elemClass}">${elemLabel}</span>
        </div>
        <h3 class="rune-title">${rune.name}</h3>
        <p class="rune-effect">${rune.effect}</p>
        <div class="rune-footer">
          <span>Déblocage Atelier :</span>
          <span class="rune-unlock">${rune.unlock}</span>
        </div>
      </article>
    `;
    })
    .join("");
}

// Accessible WAI-ARIA Tab switching with roving tabindex & keyboard support
function selectTab(btn, focus = true) {
  tabButtons.forEach((b) => {
    b.setAttribute("aria-selected", "false");
    b.setAttribute("tabindex", "-1");
    b.removeAttribute("focusgroupstart");
  });
  btn.setAttribute("aria-selected", "true");
  btn.setAttribute("tabindex", "0");
  btn.setAttribute("focusgroupstart", "");
  if (focus) btn.focus();
  currentCategory = btn.dataset.cat || "all";
  renderRunes();
}

tabButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => selectTab(btn, false));
  btn.addEventListener("keydown", (e) => {
    let targetIndex = null;
    if (e.key === "ArrowRight") {
      targetIndex = (index + 1) % tabButtons.length;
    } else if (e.key === "ArrowLeft") {
      targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
    } else if (e.key === "Home") {
      targetIndex = 0;
    } else if (e.key === "End") {
      targetIndex = tabButtons.length - 1;
    }
    if (targetIndex !== null) {
      e.preventDefault();
      selectTab(tabButtons[targetIndex], true);
    }
  });
});

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderRunes();
  });
}

// Initial render
renderRunes();

/* ==========================================================================
   3. Modern Color-Scheme Two-State Toggle
   ========================================================================== */
const themeToggleBtn = document.getElementById("theme-toggle");
const metaColorScheme = document.querySelector('meta[name="color-scheme"]');

function getCurrentRenderedTheme() {
  if (metaColorScheme && metaColorScheme.content === "dark") return "dark";
  if (metaColorScheme && metaColorScheme.content === "light") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

if (themeToggleBtn && metaColorScheme) {
  themeToggleBtn.addEventListener("click", () => {
    const rendered = getCurrentRenderedTheme();
    const target = rendered === "dark" ? "light" : "dark";
    const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    if (target === systemPref) {
      // Revert to system default
      localStorage.removeItem("color-scheme");
      metaColorScheme.content = "light dark";
    } else {
      // Store override literally
      localStorage.setItem("color-scheme", target);
      metaColorScheme.content = target;
    }
  });

  // Listen to cross-tab storage changes
  window.addEventListener("storage", (e) => {
    if (e.key === "color-scheme") {
      metaColorScheme.content = e.newValue ?? "light dark";
    }
  });
}

/* ==========================================================================
   4. Mobile Menu Drawer Navigation
   ========================================================================== */
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileNav = document.getElementById("mobile-nav");

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener("click", () => {
    const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
    mobileMenuBtn.setAttribute("aria-expanded", String(!isExpanded));
    mobileNav.hidden = isExpanded;
  });

  // Close menu when clicking link
  mobileNav.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    });
  });
}

/* ==========================================================================
   5. Interactive Astral Circle Canvas Engine
   ========================================================================== */
const canvas = document.getElementById("astral-canvas");
const canvasWaveTag = document.getElementById("canvas-wave-tag");
const repulsionBtn = document.getElementById("repulsion-pulse-btn");
const filterButtons = document.querySelectorAll(".element-filter-group .ctrl-btn");
const speedButtons = document.querySelectorAll(".speed-toggle .speed-btn");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let dpr = window.devicePixelRatio || 1;
  let width = 560;
  let height = 560;
  let centerX = width / 2;
  let centerY = height / 2;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width || 560;
    height = rect.height || 560;
    dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.resetTransform?.();
    ctx.scale(dpr, dpr);
    centerX = width / 2;
    centerY = height / 2;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Simulation State
  let simSpeed = 1;
  let focusedElement = "all"; // 'all', 'air', 'earth', 'water'
  let repulsionWaveRadius = 0;
  let repulsionWaveAlpha = 0;
  let waveCount = 12;

  // Dynamic Theme-aware Elemental Colors
  function getPalette() {
    const isDark = getCurrentRenderedTheme() === "dark";
    return {
      air: isDark ? "#81C784" : "#2E7D32",
      earth: isDark ? "#D7CCC8" : "#8D6E63",
      water: isDark ? "#64B5F6" : "#1565C0",
      gold: isDark ? "#E5C158" : "#B8860B",
      ring: isDark ? "rgba(212, 175, 55, 0.22)" : "rgba(184, 134, 11, 0.35)",
      ringTriangle: isDark ? "rgba(212, 175, 55, 0.14)" : "rgba(184, 134, 11, 0.22)",
      manaAura: isDark ? "rgba(212, 175, 55, 0.25)" : "rgba(184, 134, 11, 0.25)"
    };
  }

  // Particles pool
  const particles = [];
  const MAX_PARTICLES = 160;

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      // Spawn on outer perimeter
      const angle = Math.random() * Math.PI * 2;
      const dist = (width * 0.46) + (Math.random() * 20);
      this.x = centerX + Math.cos(angle) * dist;
      this.y = centerY + Math.sin(angle) * dist;
      this.radius = Math.random() * 2.2 + 1.2;

      // Select element based on filter
      if (focusedElement === "all") {
        const rand = Math.random();
        this.element = rand < 0.34 ? "air" : rand < 0.67 ? "earth" : "water";
      } else {
        this.element = focusedElement;
      }

      this.alpha = Math.random() * 0.5 + 0.4;
      this.orbitSpeed = (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1);
      this.inwardSpeed = Math.random() * 0.7 + 0.4;
      this.angle = angle;
      this.dist = dist;

      if (initial) {
        this.dist = Math.random() * (width * 0.42) + 20;
        this.x = centerX + Math.cos(this.angle) * this.dist;
        this.y = centerY + Math.sin(this.angle) * this.dist;
      }
    }

    update() {
      this.angle += this.orbitSpeed * simSpeed;
      this.dist -= this.inwardSpeed * simSpeed;

      // Repulsion pulse effect
      if (repulsionWaveAlpha > 0) {
        const distFromCenter = this.dist;
        if (Math.abs(distFromCenter - repulsionWaveRadius) < 30) {
          this.dist += 14 * simSpeed;
        }
      }

      this.x = centerX + Math.cos(this.angle) * this.dist;
      this.y = centerY + Math.sin(this.angle) * this.dist;

      // Reached center vortex
      if (this.dist <= 18) {
        this.reset();
      }
    }

    draw(palette) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      const color = palette[this.element] || palette.gold;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Initialize particles
  for (let i = 0; i < MAX_PARTICLES; i++) {
    particles.push(new Particle());
  }

  // Mini-Boss Entity
  const boss = {
    angle: -Math.PI / 4,
    dist: width * 0.42,
    baseDist: width * 0.42,
    hp: 100,
    maxHp: 100,
    size: 18,
    spin: 0,
    alive: true,
    reset() {
      this.angle = (Math.random() * Math.PI * 2);
      this.dist = width * 0.44;
      this.hp = 100;
      this.alive = true;
    }
  };

  // Shockwave trigger
  function triggerRepulsion() {
    repulsionWaveRadius = 24;
    repulsionWaveAlpha = 1;
    boss.dist = Math.min(boss.dist + 50, width * 0.44);

    if (repulsionBtn) {
      repulsionBtn.style.transform = "scale(0.94)";
      setTimeout(() => (repulsionBtn.style.transform = ""), 150);
    }
  }

  // Click & Non-blocking Mobile Tap
  canvas.addEventListener("click", () => triggerRepulsion());

  let touchStartX = 0;
  let touchStartY = 0;
  canvas.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  canvas.addEventListener("touchend", (e) => {
    if (e.changedTouches.length === 1) {
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
      if (dx < 12 && dy < 12) {
        triggerRepulsion();
      }
    }
  }, { passive: true });

  if (repulsionBtn) {
    repulsionBtn.addEventListener("click", triggerRepulsion);
  }

  // Filter Buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      focusedElement = btn.dataset.element || "all";
      particles.forEach((p) => p.reset());
    });
  });

  // Speed Buttons
  speedButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      speedButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      simSpeed = Number(btn.dataset.speed) || 1;
    });
  });

  // Animation Loop
  let frame = 0;
  function animate() {
    frame++;
    ctx.clearRect(0, 0, width, height);

    const outerRadius = width * 0.42;
    const palette = getPalette();

    // 1. Draw Sacred Geometry Astral Circles
    ctx.save();
    ctx.strokeStyle = palette.ring;
    ctx.lineWidth = 1.5;

    // Outer Range Ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Secondary Mid Ring (Dotted)
    ctx.save();
    ctx.setLineDash([6, 8]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius * 0.65, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Rotating Geometric Triangle / Ring
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(frame * 0.003 * simSpeed);
    ctx.strokeStyle = palette.ringTriangle;
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const a = (i * Math.PI * 2) / 3;
      const x = Math.cos(a) * outerRadius * 0.85;
      const y = Math.sin(a) * outerRadius * 0.85;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    ctx.restore();

    // 2. Update & Draw Particles
    particles.forEach((p) => {
      p.update();
      p.draw(palette);
    });

    // 3. Update & Draw Repulsion Wave
    if (repulsionWaveAlpha > 0) {
      repulsionWaveRadius += 6 * simSpeed;
      repulsionWaveAlpha -= 0.02 * simSpeed;
      if (repulsionWaveAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = repulsionWaveAlpha;
        ctx.strokeStyle = palette.gold;
        ctx.lineWidth = 3;
        ctx.shadowColor = palette.gold;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(centerX, centerY, repulsionWaveRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    // 4. Update & Draw Mini-Boss
    boss.spin += 0.02 * simSpeed;
    boss.dist -= 0.22 * simSpeed;
    const bossX = centerX + Math.cos(boss.angle) * boss.dist;
    const bossY = centerY + Math.sin(boss.angle) * boss.dist;

    // Damage over time from Tri-Phase Ray
    if (boss.dist <= outerRadius) {
      boss.hp -= 0.45 * simSpeed;
      if (boss.hp <= 0) {
        boss.reset();
        waveCount++;
        if (canvasWaveTag) {
          const isGuardian = waveCount % 10 === 0;
          canvasWaveTag.textContent = `ÉTAGE ${waveCount} / ${isGuardian ? "GARDIEN MAJEUR" : "MINI-BOSS"}`;
        }
      }
    }

    // If boss touches center
    if (boss.dist <= 24) {
      triggerRepulsion();
      boss.reset();
    }

    // Draw Mini-Boss
    ctx.save();
    ctx.translate(bossX, bossY);
    ctx.rotate(boss.spin);
    ctx.fillStyle = "#E57373";
    ctx.shadowColor = "#E57373";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(0, -boss.size);
    ctx.lineTo(boss.size, 0);
    ctx.lineTo(0, boss.size);
    ctx.lineTo(-boss.size, 0);
    ctx.closePath();
    ctx.fill();

    // Mini HP Ring
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bossX, bossY, boss.size + 6, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * (boss.hp / boss.maxHp)));
    ctx.stroke();
    ctx.restore();

    // 5. Draw Continuous Tri-Phase Ray when boss is within circle
    if (boss.dist <= outerRadius) {
      ctx.save();
      const strands = [
        { color: palette.air, offset: Math.sin(frame * 0.15) * 4 },
        { color: palette.earth, offset: Math.sin(frame * 0.15 + 2) * 4 },
        { color: palette.water, offset: Math.sin(frame * 0.15 + 4) * 4 }
      ];

      strands.forEach((s) => {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);

        const midX = (centerX + bossX) / 2 + s.offset;
        const midY = (centerY + bossY) / 2 - s.offset;
        ctx.quadraticCurveTo(midX, midY, bossX, bossY);
        ctx.stroke();
      });
      ctx.restore();
    }

    // 6. Draw Center Avatar & Vortex
    ctx.save();
    // Mana Aura
    const pulse = Math.sin(frame * 0.05) * 3;
    ctx.fillStyle = palette.manaAura;
    ctx.shadowColor = palette.gold;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20 + pulse, 0, Math.PI * 2);
    ctx.fill();

    // Core Solid Glyph
    ctx.fillStyle = palette.gold;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.fill();

    // Inner Tri-Phase Orbiters
    for (let i = 0; i < 3; i++) {
      const a = (frame * 0.04 * simSpeed) + (i * Math.PI * 2) / 3;
      const ox = centerX + Math.cos(a) * 16;
      const oy = centerY + Math.sin(a) * 16;
      const colors = [palette.air, palette.earth, palette.water];
      ctx.fillStyle = colors[i];
      ctx.beginPath();
      ctx.arc(ox, oy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
