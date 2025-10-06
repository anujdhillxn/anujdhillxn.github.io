<script lang="ts">
	import { onMount } from 'svelte';
	import { cursorCharge } from '$lib/cursorCharge';

	const { children, charge = 0 } = $props<{
		children: any;
		charge?: number; // -1, 0, 1
	}>();

	let wrapperRef: HTMLElement;
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
		if (!wrapperRef) return;

		const rect = wrapperRef.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const distance = Math.sqrt(
			Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
		);

		const maxDistance = 300;
		const maxOffset = 20;

		if (distance < maxDistance) {
			const chargeMultiplier = cursorChargeValue * charge;

			const angle = Math.atan2(centerY - mouseY, centerX - mouseX);
			const baseForce = (1 - distance / maxDistance) * maxOffset;
			const force = baseForce * chargeMultiplier;
			const offsetX = Math.cos(angle) * force;
			const offsetY = Math.sin(angle) * force;

			wrapperRef.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
		} else {
			wrapperRef.style.transform = 'translate(0, 0)';
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
	bind:this={wrapperRef}
	class="charge-wrapper"
	data-charge={charge}
>
	{@render children()}
</div>

<style>
	.charge-wrapper {
		display: inline-block;
		transition: transform 0.15s ease-out;
	}
</style>
