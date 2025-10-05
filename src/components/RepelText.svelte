<script lang="ts">
	import { onMount } from 'svelte';
	import { cursorCharge } from '$lib/cursorCharge';

	const { text, class: className = '' } = $props();

	let containerRef: HTMLElement;
	let charge = $state(-1);
	let currentMouseX = 0;
	let currentMouseY = 0;

	$effect(() => {
		const unsubscribe = cursorCharge.subscribe(value => {
			charge = value;
			updateForces(currentMouseX, currentMouseY);
		});
		return unsubscribe;
	});

	function updateForces(mouseX: number, mouseY: number) {
		if (!containerRef) return;

		const letters = containerRef.querySelectorAll('.letter');

		letters.forEach((letter) => {
			const rect = letter.getBoundingClientRect();
			const letterX = rect.left + rect.width / 2;
			const letterY = rect.top + rect.height / 2;

			const distance = Math.sqrt(
				Math.pow(mouseX - letterX, 2) + Math.pow(mouseY - letterY, 2)
			);

			const maxDistance = 500;
			const maxOffset = 50;

			if (distance < maxDistance) {
				// Calculate force based on charge interaction
				// Same charge repels (positive force), opposite attracts (negative force)
				// Letter charge is -1 (negative/blue)
				const letterCharge = -1;
				const chargeMultiplier = charge * letterCharge; // -1 (attract), 0 (neutral), 1 (repel)

				const angle = Math.atan2(letterY - mouseY, letterX - mouseX);
				const baseForce = (1 - distance / maxDistance) * maxOffset;
				const force = baseForce * chargeMultiplier;
				const offsetX = Math.cos(angle) * force;
				const offsetY = Math.sin(angle) * force;

				(letter as HTMLElement).style.transform = `translate(${offsetX}px, ${offsetY}px)`;
			} else {
				(letter as HTMLElement).style.transform = 'translate(0, 0)';
			}
		});
	}

	onMount(() => {
		if (!containerRef) return;

		const handleMouseMove = (e: MouseEvent) => {
			currentMouseX = e.clientX;
			currentMouseY = e.clientY;
			updateForces(currentMouseX, currentMouseY);
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});
</script>

<div bind:this={containerRef} class="repel-text {className}">
	{#each text.split('') as char}
		{#if char === ' '}
			<span class="space">&nbsp;</span>
		{:else}
			<span class="letter">{char}</span>
		{/if}
	{/each}
</div>

<style>
	.repel-text {
		display: inline-block;
		white-space: nowrap;
	}

	.letter,
	.space {
		display: inline-block;
		transition: transform 0.15s ease-out;
	}

	.space {
		width: 0.3em;
	}
</style>
