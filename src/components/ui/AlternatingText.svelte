<script lang="ts">
	const { texts, interval = 3000 } = $props<{ texts: string[], interval?: number }>();

	let currentIndex = $state(0);
	let isVisible = $state(false);

	$effect(() => {
		// Fade in the first text
		const initialTimeout = setTimeout(() => {
			isVisible = true;
		}, 100);

		const timer = setInterval(() => {
			isVisible = false;
			setTimeout(() => {
				currentIndex = (currentIndex + 1) % texts.length;
				isVisible = true;
			}, 300);
		}, interval);

		return () => {
			clearTimeout(initialTimeout);
			clearInterval(timer);
		};
	});
</script>

<p class="alternating-text" class:visible={isVisible}>
	{@html texts[currentIndex]}
</p>

<style>
	.alternating-text {
		display: inline-block;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	.alternating-text.visible {
		opacity: 1;
	}
</style>
