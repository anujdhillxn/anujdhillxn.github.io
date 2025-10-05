<script lang="ts">
	import { onMount } from 'svelte';
	import { cursorCharge } from '$lib/cursorCharge';

	let cursorX = $state(0);
	let cursorY = $state(0);
	let isHovering = $state(false);
	let isVisible = $state(false);
	let charge = $state(-1); // -1 (negative/blue), 0 (neutral), 1 (positive/red)

	$effect(() => {
		cursorCharge.set(charge);
	});

	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			cursorX = e.clientX;
			cursorY = e.clientY;
			if (e.clientX !== 0 || e.clientY !== 0) {
				isVisible = true;
			}
		};

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
				isHovering = true;
			}
		};

		const handleMouseOut = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
				isHovering = false;
			}
		};

		const handleContextMenu = (e: MouseEvent) => {
			e.preventDefault();
			charge = charge === 1 ? -1 : charge + 1;
		};

		window.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseover', handleMouseOver);
		document.addEventListener('mouseout', handleMouseOut);
		document.addEventListener('contextmenu', handleContextMenu);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseover', handleMouseOver);
			document.removeEventListener('mouseout', handleMouseOut);
			document.removeEventListener('contextmenu', handleContextMenu);
		};
	});
</script>

{#if isVisible}
	<div
		class="cursor-dot"
		style="left: {cursorX}px; top: {cursorY}px;"
		class:hovering={isHovering}
		class:neutral={charge === 0}
		class:positive={charge === 1}
		class:negative={charge === -1}
	></div>
	<div
		class="cursor-outline"
		style="left: {cursorX}px; top: {cursorY}px;"
		class:hovering={isHovering}
		class:neutral={charge === 0}
		class:positive={charge === 1}
		class:negative={charge === -1}
	></div>
{/if}

<style>
	.cursor-dot,
	.cursor-outline {
		position: fixed;
		pointer-events: none;
		z-index: 10000;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		transition: background-color 0.3s ease, border-color 0.3s ease, width 0.2s ease, height 0.2s ease;
	}

	.cursor-dot {
		width: 8px;
		height: 8px;
		background-color: var(--text1);
	}

	.cursor-outline {
		width: 32px;
		height: 32px;
		border: 2px solid var(--text1);
	}

	/* Neutral state */
	.cursor-dot.neutral {
		background-color: var(--text2);
	}

	.cursor-outline.neutral {
		border-color: var(--text2);
	}

	/* Positive state */
	.cursor-dot.positive {
		background-color: var(--positive2);
	}

	.cursor-outline.positive {
		border-color: var(--positive2);
	}

	/* Negative state */
	.cursor-dot.negative {
		background-color: var(--negative2);
	}

	.cursor-outline.negative {
		border-color: var(--negative2);
	}

	/* Hovering states */
	.cursor-dot.hovering {
		width: 32px;
		height: 32px;
	}

	.cursor-outline.hovering {
		width: 48px;
		height: 48px;
	}
</style>
