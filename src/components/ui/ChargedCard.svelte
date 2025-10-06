<script lang="ts">
	import { onMount } from 'svelte';
	import { cursorCharge } from '$lib/cursorCharge';

	const { children, class: className = '', charge = 0 } = $props<{
		children: any;
		class?: string;
		charge?: number; // -1, 0, 1
	}>();

	let cardRef: HTMLElement;
	let cursorChargeValue = $state(0);
	let currentMouseX = 0;
	let currentMouseY = 0;

	$effect(() => {
		const unsubscribe = cursorCharge.subscribe(value => {
			cursorChargeValue = value;
			updateForce(currentMouseX, currentMouseY);
		});
		return unsubscribe;
	});

	function updateForce(mouseX: number, mouseY: number) {
		if (!cardRef) return;

		const rect = cardRef.getBoundingClientRect();
		const cardX = rect.left + rect.width / 2;
		const cardY = rect.top + rect.height / 2;

		const distance = Math.sqrt(
			Math.pow(mouseX - cardX, 2) + Math.pow(mouseY - cardY, 2)
		);

		const maxDistance = 300;
		const maxOffset = 20;

		if (distance < maxDistance) {
			// Calculate force based on charge interaction
			const chargeMultiplier = cursorChargeValue * charge;

			const angle = Math.atan2(cardY - mouseY, cardX - mouseX);
			const baseForce = (1 - distance / maxDistance) * maxOffset;
			const force = baseForce * chargeMultiplier;
			const offsetX = Math.cos(angle) * force;
			const offsetY = Math.sin(angle) * force;

			cardRef.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
		} else {
			cardRef.style.transform = 'translate(0, 0)';
		}
	}

	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			currentMouseX = e.clientX;
			currentMouseY = e.clientY;
			updateForce(currentMouseX, currentMouseY);
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});
</script>

<div
	bind:this={cardRef}
	class="charged-card {className}"
	class:positive={charge === 1}
	class:negative={charge === -1}
	class:neutral={charge === 0}
>
	{@render children()}
</div>

<style>
	.charged-card {
		padding: 1.5rem;
		background-color: var(--background2);
		border: 1px solid color-mix(in srgb, var(--text1) 20%, transparent);
		border-radius: 8px;
		transition: transform 0.15s ease-out, border-color 0.3s ease;
		position: relative;
	}

	.charged-card.positive {
		border-color: color-mix(in srgb, var(--positive2) 30%, transparent);
	}

	.charged-card.negative {
		border-color: color-mix(in srgb, var(--negative2) 30%, transparent);
	}

	.charged-card.neutral {
		border-color: color-mix(in srgb, var(--text1) 20%, transparent);
	}

	.charged-card.positive::before {
		content: '+';
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		color: var(--positive2);
		font-size: 1.2rem;
		font-weight: bold;
		opacity: 0.5;
	}

	.charged-card.negative::before {
		content: '−';
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		color: var(--negative2);
		font-size: 1.2rem;
		font-weight: bold;
		opacity: 0.5;
	}
</style>
