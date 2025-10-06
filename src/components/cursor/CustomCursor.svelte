<script lang="ts">
	import { onMount } from 'svelte';
	import { cursorCharge } from '$lib/cursorCharge';

	let cursorX = $state(0);
	let cursorY = $state(0);
	let isVisible = $state(false);

	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			cursorX = e.clientX;
			cursorY = e.clientY;
			if (e.clientX !== 0 || e.clientY !== 0) {
				isVisible = true;
			}
		};

		const handleContextMenu = (e: MouseEvent) => {
			e.preventDefault();
			cursorCharge.update(current => current === 1 ? -1 : current + 1);
		};

		window.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('contextmenu', handleContextMenu);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('contextmenu', handleContextMenu);
		};
	});
</script>

{#if isVisible}
	<div
		class="cursor-dot"
		style="left: {cursorX}px; top: {cursorY}px;"
		class:neutral={$cursorCharge === 0}
		class:positive={$cursorCharge === 1}
		class:negative={$cursorCharge === -1}
	></div>
	<div
		class="cursor-outline"
		style="left: {cursorX}px; top: {cursorY}px;"
		class:neutral={$cursorCharge === 0}
		class:positive={$cursorCharge === 1}
		class:negative={$cursorCharge === -1}
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

</style>
