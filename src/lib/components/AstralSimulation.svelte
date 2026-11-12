<script lang="ts">
	import { onMount } from 'svelte';
	import { getRenderedTheme } from '#lib/theme';

	type ElementFilter = 'all' | 'air' | 'earth' | 'water';
	type ElementName = 'air' | 'earth' | 'water';

	interface Palette {
		air: string;
		earth: string;
		water: string;
		gold: string;
		ring: string;
		ringTriangle: string;
		manaAura: string;
	}

	interface Particle {
		x: number;
		y: number;
		radius: number;
		element: ElementName;
		alpha: number;
		orbitSpeed: number;
		inwardSpeed: number;
		angle: number;
		dist: number;
		reset(initial?: boolean): void;
		update(): void;
		draw(palette: Palette): void;
	}

	let canvas: HTMLCanvasElement;
	let focusedElement = $state<ElementFilter>('all');
	let simSpeed = $state(1);
	let waveCount = $state(12);
	let pulseScale = $state(false);

	const waveTag = $derived(waveCount % 10 === 0 ? 'PRÉSENCE MAJEURE' : 'GARDIEN EN APPROCHE');

	// Assigned inside onMount so the template buttons can drive the canvas engine.
	let triggerPulse: () => void = () => {};
	let resetParticles: () => void = () => {};

	function selectElement(element: ElementFilter) {
		focusedElement = element;
		resetParticles();
	}

	onMount(() => {
		let ctx: CanvasRenderingContext2D;
		const maybeCtx = canvas.getContext('2d');
		if (!maybeCtx) return;
		ctx = maybeCtx;

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

		window.addEventListener('resize', resizeCanvas);
		resizeCanvas();

		// Simulation State
		let repulsionWaveRadius = 0;
		let repulsionWaveAlpha = 0;
		let pulseTimeout: ReturnType<typeof setTimeout> | undefined;

		// Dynamic Theme-aware Elemental Colors
		function getPalette(): Palette {
			const isDark = getRenderedTheme() === 'dark';
			return {
				air: isDark ? '#81C784' : '#2E7D32',
				earth: isDark ? '#D7CCC8' : '#8D6E63',
				water: isDark ? '#64B5F6' : '#1565C0',
				gold: isDark ? '#E5C158' : '#B8860B',
				ring: isDark ? 'rgba(212, 175, 55, 0.22)' : 'rgba(184, 134, 11, 0.35)',
				ringTriangle: isDark ? 'rgba(212, 175, 55, 0.14)' : 'rgba(184, 134, 11, 0.22)',
				manaAura: isDark ? 'rgba(212, 175, 55, 0.25)' : 'rgba(184, 134, 11, 0.25)'
			};
		}

		// Particles pool
		const particles: Particle[] = [];
		const MAX_PARTICLES = 160;

		function createParticle(initial = false): Particle {
			const particle: Particle = {
				x: 0,
				y: 0,
				radius: 2,
				element: 'air',
				alpha: 1,
				orbitSpeed: 0,
				inwardSpeed: 1,
				angle: 0,
				dist: 0,

				reset(initial = false) {
					// Spawn on outer perimeter
					const angle = Math.random() * Math.PI * 2;
					const dist = width * 0.46 + Math.random() * 20;
					particle.x = centerX + Math.cos(angle) * dist;
					particle.y = centerY + Math.sin(angle) * dist;
					particle.radius = Math.random() * 2.2 + 1.2;

					// Select element based on filter
					if (focusedElement === 'all') {
						const rand = Math.random();
						particle.element = rand < 0.34 ? 'air' : rand < 0.67 ? 'earth' : 'water';
					} else {
						particle.element = focusedElement;
					}

					particle.alpha = Math.random() * 0.5 + 0.4;
					particle.orbitSpeed = (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1);
					particle.inwardSpeed = Math.random() * 0.7 + 0.4;
					particle.angle = angle;
					particle.dist = dist;

					if (initial) {
						particle.dist = Math.random() * (width * 0.42) + 20;
						particle.x = centerX + Math.cos(particle.angle) * particle.dist;
						particle.y = centerY + Math.sin(particle.angle) * particle.dist;
					}
				},

				update() {
					particle.angle += particle.orbitSpeed * simSpeed;
					particle.dist -= particle.inwardSpeed * simSpeed;

					// Repulsion pulse effect
					if (repulsionWaveAlpha > 0) {
						const distFromCenter = particle.dist;
						if (Math.abs(distFromCenter - repulsionWaveRadius) < 30) {
							particle.dist += 14 * simSpeed;
						}
					}

					particle.x = centerX + Math.cos(particle.angle) * particle.dist;
					particle.y = centerY + Math.sin(particle.angle) * particle.dist;

					// Reached center vortex
					if (particle.dist <= 18) {
						particle.reset();
					}
				},

				draw(palette: Palette) {
					ctx.save();
					ctx.globalAlpha = particle.alpha;
					const color = palette[particle.element] || palette.gold;
					ctx.fillStyle = color;
					ctx.shadowColor = color;
					ctx.shadowBlur = 8;
					ctx.beginPath();
					ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
					ctx.fill();
					ctx.restore();
				}
			};

			particle.reset(initial);
			return particle;
		}

		// Initialize particles
		for (let i = 0; i < MAX_PARTICLES; i++) {
			particles.push(createParticle(true));
		}

		resetParticles = () => particles.forEach((particle) => particle.reset());

		// Mini-Boss Entity
		const boss = {
			angle: -Math.PI / 4,
			dist: width * 0.42,
			hp: 100,
			maxHp: 100,
			size: 18,
			spin: 0,
			reset() {
				this.angle = Math.random() * Math.PI * 2;
				this.dist = width * 0.44;
				this.hp = 100;
			}
		};

		// Shockwave trigger
		function triggerRepulsion() {
			repulsionWaveRadius = 24;
			repulsionWaveAlpha = 1;
			boss.dist = Math.min(boss.dist + 50, width * 0.44);

			pulseScale = true;
			clearTimeout(pulseTimeout);
			pulseTimeout = setTimeout(() => (pulseScale = false), 150);
		}

		triggerPulse = triggerRepulsion;

		// Click & Non-blocking Mobile Tap
		function onCanvasClick() {
			triggerRepulsion();
		}

		let touchStartX = 0;
		let touchStartY = 0;

		function onTouchStart(e: TouchEvent) {
			if (e.touches.length === 1) {
				touchStartX = e.touches[0].clientX;
				touchStartY = e.touches[0].clientY;
			}
		}

		function onTouchEnd(e: TouchEvent) {
			if (e.changedTouches.length === 1) {
				const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
				const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
				if (dx < 12 && dy < 12) {
					triggerRepulsion();
				}
			}
		}

		canvas.addEventListener('click', onCanvasClick);
		canvas.addEventListener('touchstart', onTouchStart, { passive: true });
		canvas.addEventListener('touchend', onTouchEnd, { passive: true });

		// Animation Loop
		let frame = 0;
		let animationFrame = 0;

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
			particles.forEach((particle) => {
				particle.update();
				particle.draw(palette);
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
			ctx.fillStyle = '#E57373';
			ctx.shadowColor = '#E57373';
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
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(
				bossX,
				bossY,
				boss.size + 6,
				-Math.PI / 2,
				-Math.PI / 2 + Math.PI * 2 * (boss.hp / boss.maxHp)
			);
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

				strands.forEach((strand) => {
					ctx.strokeStyle = strand.color;
					ctx.lineWidth = 1.8;
					ctx.shadowColor = strand.color;
					ctx.shadowBlur = 8;
					ctx.beginPath();
					ctx.moveTo(centerX, centerY);

					const midX = (centerX + bossX) / 2 + strand.offset;
					const midY = (centerY + bossY) / 2 - strand.offset;
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
				const a = frame * 0.04 * simSpeed + (i * Math.PI * 2) / 3;
				const ox = centerX + Math.cos(a) * 16;
				const oy = centerY + Math.sin(a) * 16;
				const colors = [palette.air, palette.earth, palette.water];
				ctx.fillStyle = colors[i];
				ctx.beginPath();
				ctx.arc(ox, oy, 2.5, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.restore();

			animationFrame = requestAnimationFrame(animate);
		}

		animationFrame = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animationFrame);
			clearTimeout(pulseTimeout);
			window.removeEventListener('resize', resizeCanvas);
			canvas.removeEventListener('click', onCanvasClick);
			canvas.removeEventListener('touchstart', onTouchStart);
			canvas.removeEventListener('touchend', onTouchEnd);
		};
	});
</script>

<div class="hero-interactive" id="cercle">
	<div class="astral-card">
		<div class="card-header-bar">
			<div class="status-indicator">
				<span class="status-orb"></span>
				<span>CERCLE ASTRAL ACTIF — STRATE I</span>
			</div>
			<span class="wave-tag" id="canvas-wave-tag">{waveTag}</span>
		</div>

		<!-- Canvas Container -->
		<div class="canvas-wrapper">
			<canvas
				bind:this={canvas}
				id="astral-canvas"
				width="560"
				height="560"
				aria-label="Simulation interactive du Cercle Astral de The Veil"
			></canvas>
			<div class="canvas-overlay-tip" id="canvas-tip">
				<span>Touchez le Cercle pour émettre une Onde de Répulsion</span>
			</div>
		</div>

		<!-- Live Canvas Controls -->
		<div class="canvas-controls" aria-label="Contrôles de la simulation astrale">
			<div class="element-filter-group" role="group" aria-label="Flux focalisé">
				<button
					type="button"
					class="ctrl-btn"
					class:active={focusedElement === 'all'}
					data-element="all"
					onclick={() => selectElement('all')}>Trinité (Tous)</button
				>
				<button
					type="button"
					class="ctrl-btn element-air"
					class:active={focusedElement === 'air'}
					data-element="air"
					onclick={() => selectElement('air')}>Air</button
				>
				<button
					type="button"
					class="ctrl-btn element-earth"
					class:active={focusedElement === 'earth'}
					data-element="earth"
					onclick={() => selectElement('earth')}>Terre</button
				>
				<button
					type="button"
					class="ctrl-btn element-water"
					class:active={focusedElement === 'water'}
					data-element="water"
					onclick={() => selectElement('water')}>Eau</button
				>
			</div>

			<div class="simulation-actions">
				<button
					type="button"
					id="repulsion-pulse-btn"
					class="ctrl-btn pulse-action"
					title="Déclencher l'Onde de Répulsion"
					style:transform={pulseScale ? 'scale(0.94)' : null}
					onclick={() => triggerPulse()}
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<polyline points="12 6 12 12 16 14"></polyline>
					</svg>
					<span>Répulsion</span>
				</button>
				<div class="speed-toggle" role="group" aria-label="Vitesse de simulation">
					{#each [1, 2, 5] as speed (speed)}
						<button
							type="button"
							class="speed-btn"
							class:active={simSpeed === speed}
							data-speed={speed}
							onclick={() => (simSpeed = speed)}>{speed}×</button
						>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
