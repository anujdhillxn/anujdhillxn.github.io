<script lang="ts">
	import { onMount } from 'svelte';

	let cursorX = $state(0);
	let cursorY = $state(0);
	let isVisible = $state(false);
	let isTouchDevice = $state(false);

	onMount(() => {
		// Detect if device supports touch
		isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

		setTimeout(() => {
			isVisible = true;
		}, 1000);

		const handleMouseMove = (e: MouseEvent) => {
			cursorX = e.clientX;
			cursorY = e.clientY;
		};

		const handleContextMenu = () => {
			isVisible = false;
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
		class="cursor-tooltip"
		style="left: {cursorX}px; top: {cursorY}px;"
	>
		<p>{isTouchDevice ? 'Double-tap to switch charge' : 'Right-click to switch charge'}</p>
		<p class="charge-info">
			Move close to colored elements, opposites attract
		</p>
	</div>
{/if}

<style>
	.cursor-tooltip {
		position: fixed;
		pointer-events: none;
		z-index: 9999;
		transform: translate(20px, 20px);
		background-color: var(--background2);
		padding: 0.75rem 1rem;
		border-radius: 8px;
		border: 1px solid var(--text3);
		font-size: 0.85rem;
		max-width: 200px;
		opacity: 0;
		animation: tooltipFadeIn 0.5s ease 1s forwards;
	}

	@keyframes tooltipFadeIn {
		from {
			opacity: 0;
			transform: translate(20px, 30px);
		}
		to {
			opacity: 0.7;
			transform: translate(20px, 20px);
		}
	}

	.cursor-tooltip p {
		margin: 0;
		font-size: 0.85rem;
		line-height: 1.4;
	}

	.charge-info {
		margin-top: 0.25rem;
		color: var(--text2);
	}
</style>
