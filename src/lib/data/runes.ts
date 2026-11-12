export type RuneElement = 'air' | 'earth' | 'water' | 'neutral' | 'synergy';
export type RuneCategory = 'canalisation' | 'aegis' | 'alchemy' | 'synergies';

export interface Rune {
	id: string;
	num: string;
	name: string;
	element: RuneElement;
	elemLabel?: string;
	cat: RuneCategory;
	unlock: string;
	effect: string;
}

export interface RuneCategoryTab {
	id: 'all' | RuneCategory;
	label: string;
}

export const RUNE_CATEGORIES: RuneCategoryTab[] = [
	{ id: 'all', label: 'Toutes (28)' },
	{ id: 'canalisation', label: 'Canalisation (9)' },
	{ id: 'aegis', label: 'Égide (9)' },
	{ id: 'alchemy', label: 'Alchimie (6)' },
	{ id: 'synergies', label: 'Synergies (4)' }
];

export const ELEMENT_LABELS: Record<RuneElement, string> = {
	air: 'Air',
	earth: 'Terre',
	water: 'Eau',
	neutral: 'Neutre',
	synergy: 'Synergie'
};

/* ==========================================================================
   The 28 Runes from The Veil's Sacred Codex
   ========================================================================== */
export const RUNES_DATA: Rune[] = [
	// Famille 1 — Canalisation (9 Runes)
	{
		id: 'flux_air',
		num: 'R1',
		name: "Flux d'Air",
		element: 'air',
		cat: 'canalisation',
		unlock: 'Dès le départ',
		effect:
			'Augmente les dégâts de base de la phase Air du rayon tri-phasé (+12 % / niveau).'
	},
	{
		id: 'flux_earth',
		num: 'R2',
		name: 'Flux de Terre',
		element: 'earth',
		cat: 'canalisation',
		unlock: 'Dès le départ',
		effect:
			'Augmente les dégâts de base de la phase Terre du rayon tri-phasé (+12 % / niveau).'
	},
	{
		id: 'flux_water',
		num: 'R3',
		name: "Flux d'Eau",
		element: 'water',
		cat: 'canalisation',
		unlock: 'Dès le départ',
		effect:
			'Augmente les dégâts de base de la phase Eau du rayon tri-phasé (+12 % / niveau).'
	},
	{
		id: 'pulse_rate',
		num: 'R4',
		name: 'Fréquence de Pulsation',
		element: 'neutral',
		cat: 'canalisation',
		unlock: 'Palier Atelier 1',
		effect:
			'Accélère la cadence de frappe continue du rayon tri-phasé (+4 % cadence / niveau).'
	},
	{
		id: 'crit_chance',
		num: 'R5a',
		name: 'Chance Critique',
		element: 'air',
		cat: 'canalisation',
		unlock: 'Palier Atelier 2',
		effect:
			'Augmente la probabilité de pulsation critique du rayon (+1,5 % / niveau, cap 80 %).'
	},
	{
		id: 'crit_factor',
		num: 'R5b',
		name: 'Facteur Critique',
		element: 'air',
		cat: 'canalisation',
		unlock: 'Palier Atelier 2',
		effect:
			'Augmente le multiplicateur de dégâts des pulsations critiques (+0,15× / niveau).'
	},
	{
		id: 'circle_range',
		num: 'R6',
		name: 'Envergure du Cercle',
		element: 'neutral',
		cat: 'canalisation',
		unlock: 'Palier Atelier 2',
		effect:
			'Agrandit le rayon du Cercle Astral : accroche le Mini-Boss plus tôt et prolonge sa trajectoire.'
	},
	{
		id: 'long_range_focus',
		num: 'R7',
		name: 'Focalisation Longue Portée',
		element: 'water',
		cat: 'canalisation',
		unlock: 'Palier Atelier 3',
		effect:
			'Augmente les dégâts infligés proportionnellement à la distance qui sépare le Boss du centre.'
	},
	{
		id: 'aegis_breaker',
		num: 'R8',
		name: 'Brise-Égide',
		element: 'earth',
		cat: 'canalisation',
		unlock: 'Palier Atelier 4',
		effect:
			'Démolit les boucliers élémentaires des Gardiens (+15 % / niveau) et réduit leur résistance.'
	},

	// Famille 2 — Égide (9 Runes)
	{
		id: 'mana_pool',
		num: 'R9',
		name: 'Réservoir de Mana',
		element: 'neutral',
		cat: 'aegis',
		unlock: 'Dès le départ',
		effect: "Augmente la réserve de Mana maximale de l'Avatar (+20 points de Mana de base / niveau)."
	},
	{
		id: 'inner_spring',
		num: 'R10',
		name: 'Source Intérieure',
		element: 'water',
		cat: 'aegis',
		unlock: 'Dès le départ',
		effect:
			'Augmente la régénération naturelle et passive de Mana par seconde pendant le combat.'
	},
	{
		id: 'telluric_bark',
		num: 'R11',
		name: 'Écorce Tellurique',
		element: 'earth',
		cat: 'aegis',
		unlock: 'Palier Atelier 1',
		effect: 'Réduit en % tous les dégâts subis (distance et contact) (+1 % / niveau, cap à 75 %).'
	},
	{
		id: 'flat_absorption',
		num: 'R12',
		name: 'Absorption Brute',
		element: 'earth',
		cat: 'aegis',
		unlock: 'Palier Atelier 1',
		effect: 'Soustrait un montant fixe absolu à chaque assaut reçu de la part des monstres.'
	},
	{
		id: 'astral_viscosity',
		num: 'R13',
		name: 'Viscosité Astrale',
		element: 'water',
		cat: 'aegis',
		unlock: 'Palier Atelier 2',
		effect:
			"Ralentit la vitesse d'aspiration du Boss vers le centre, sans freiner les particules d'énergie."
	},
	{
		id: 'repulsion_wave',
		num: 'R14',
		name: 'Onde de Répulsion',
		element: 'air',
		cat: 'aegis',
		unlock: 'Palier Atelier 3',
		effect:
			'Toutes les X pulsations du rayon, repousse vivement le Boss vers la périphérie du Cercle.'
	},
	{
		id: 'thorn_mirror',
		num: 'R15',
		name: "Miroir d'Épines",
		element: 'earth',
		cat: 'aegis',
		unlock: 'Palier Atelier 3',
		effect:
			"Renvoie un pourcentage des PV du monstre en dégâts purs lors d'un impact direct avec le centre."
	},
	{
		id: 'astral_siphon',
		num: 'R16',
		name: 'Siphon Astral',
		element: 'water',
		cat: 'aegis',
		unlock: 'Palier Atelier 4',
		effect:
			'Transmute une quote-part des dégâts infligés par le rayon en restauration immédiate de Mana.'
	},
	{
		id: 'hermetic_reprieve',
		num: 'R17',
		name: 'Sursis Hermétique',
		element: 'air',
		cat: 'aegis',
		unlock: 'Palier Atelier 5',
		effect:
			"Probabilité (cap 35 %) de conjurer un coup fatal, maintenant l'Avatar à 1 Mana avec onde de choc."
	},

	// Famille 3 — Alchimie (6 Runes)
	{
		id: 'attract_air',
		num: 'R18',
		name: "Attraction d'Air",
		element: 'air',
		cat: 'alchemy',
		unlock: 'Dès le départ',
		effect:
			"Amplifie le rendement d'énergie d'Air récolté à chaque particule aspirée (+12 % / niveau)."
	},
	{
		id: 'attract_earth',
		num: 'R19',
		name: 'Attraction de Terre',
		element: 'earth',
		cat: 'alchemy',
		unlock: 'Dès le départ',
		effect:
			"Amplifie le rendement d'énergie de Terre récolté à chaque particule aspirée (+12 % / niveau)."
	},
	{
		id: 'attract_water',
		num: 'R20',
		name: "Attraction d'Eau",
		element: 'water',
		cat: 'alchemy',
		unlock: 'Dès le départ',
		effect:
			"Amplifie le rendement d'énergie d'Eau récolté à chaque particule aspirée (+12 % / niveau)."
	},
	{
		id: 'aspiration_vortex',
		num: 'R21',
		name: "Vortex d'Aspiration",
		element: 'neutral',
		cat: 'alchemy',
		unlock: 'Palier Atelier 1',
		effect:
			"Augmente la fréquence d'apparition et la vitesse de dérive des particules d'énergie ambiantes."
	},
	{
		id: 'amber_condensation',
		num: 'R22',
		name: "Condensation d'Ambre",
		element: 'neutral',
		cat: 'alchemy',
		unlock: 'Palier Atelier 2',
		effect:
			"Augmente l'Ambre Astral récolté sur chaque Mini-Boss et Gardien dissous (+5 % / niveau)."
	},
	{
		id: 'spontaneous_transmutation',
		num: 'R24',
		name: 'Transmutation Spontanée',
		element: 'air',
		cat: 'alchemy',
		unlock: 'Palier Atelier 4',
		effect:
			"À chaque étage franchi, X% de chance qu'une rune débloquée aléatoire gagne +1 niveau gratuitement pour le reste de la run."
	},

	// Famille 4 — Synergies Hermétiques (4 Runes)
	{
		id: 'synergy_tempest',
		num: 'R25',
		name: 'Tempête Conductrice',
		element: 'synergy',
		elemLabel: 'Air + Eau',
		cat: 'synergies',
		unlock: 'Palier Atelier 4',
		effect:
			"Chaque pulsation critique de la phase Air déclenche une onde d'Eau qui ralentit davantage la dérive du Mini-Boss pendant 2s."
	},
	{
		id: 'synergy_monolith',
		num: 'R26',
		name: 'Monolithe Réfractaire',
		element: 'synergy',
		elemLabel: 'Terre + Air',
		cat: 'synergies',
		unlock: 'Palier Atelier 4',
		effect:
			"Chaque fois que l'Avatar subit ou absorbe une attaque, la Fréquence de Pulsation du rayon augmente de +X % pendant 3s."
	},
	{
		id: 'synergy_surge',
		num: 'R27',
		name: 'Crue Tellurique',
		element: 'synergy',
		elemLabel: 'Eau + Terre',
		cat: 'synergies',
		unlock: 'Palier Atelier 5',
		effect:
			"Le surplus de régénération de Mana (quand le Mana est à 100 %) se cristallise en une Barrière Tellurique temporaire (jusqu'à +X % du Mana Max)."
	},
	{
		id: 'synergy_trinity',
		num: 'R28',
		name: 'Trinité',
		element: 'synergy',
		elemLabel: 'Air + Terre + Eau',
		cat: 'synergies',
		unlock: 'Palier Atelier 5',
		effect:
			"Multiplie les dégâts totaux du Rayon Tri-Phasé par (1 + X%) tant que les 3 runes de flux (R1, R2, R3) sont maintenues à l'équilibre (écart maximal de ±2 niveaux entre elles)."
	}
];
