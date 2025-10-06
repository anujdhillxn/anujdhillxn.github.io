<script lang="ts">
	import { onMount } from 'svelte';
	import { cursorCharge } from '$lib/cursorCharge';

	const { children, charge = 0, enableRotation = false } = $props<{
		children: any;
		charge?: number; // -1, 0, 1
		enableRotation?: boolean;
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
		const maxRotation = 30; // degrees

		if (distance < maxDistance) {
			const chargeMultiplier = cursorChargeValue * charge;

			const angle = Math.atan2(centerY - mouseY, centerX - mouseX);
			const baseForce = (1 - distance / maxDistance) * maxOffset;
			const force = baseForce * chargeMultiplier;
			const offsetX = Math.cos(angle) * force;
			const offsetY = Math.sin(angle) * force;

			let transformString = `translate(${offsetX}px, ${offsetY}px)`;

			if (enableRotation) {
				// Calculate rotation based on quadrant position
				// Treat element as a horizontal stick - rotation depends on where cursor pushes/pulls from
				const dx = mouseX - centerX;
				const dy = mouseY - centerY;

				// For repulsion: top-left and bottom-right → counter-clockwise (negative rotation)
				//                top-right and bottom-left → clockwise (positive rotation)
				// For attraction: opposite of repulsion

				// Quadrant-based rotation: multiply dx and dy
				// top-left (-, -) → product positive
				// top-right (+, -) → product negative
				// bottom-left (-, +) → product negative
				// bottom-right (+, +) → product positive
				const quadrantFactor = dx * dy;

				const rotationIntensity = (1 - distance / maxDistance);

				// For repulsion (positive chargeMultiplier): positive quadrantFactor → counter-clockwise (negative)
				// For attraction (negative chargeMultiplier): positive quadrantFactor → clockwise (positive)
				const rotation = - Math.sign(quadrantFactor) * chargeMultiplier * rotationIntensity * maxRotation;

				transformString += ` rotate(${rotation}deg)`;
			}

			wrapperRef.style.transform = transformString;
		} else {
			wrapperRef.style.transform = enableRotation ? 'translate(0, 0) rotate(0deg)' : 'translate(0, 0)';
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
