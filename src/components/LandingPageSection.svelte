<script lang="ts">
	import { createIonosphere } from "ions-ts";
	import { visitedSections, markSectionVisited } from "$lib/visitedSections";
	import RepelText from "./RepelText.svelte";
	import AlternatingText from "./AlternatingText.svelte";

	const { showNavigationButtons } = $props();
	const SECTION_INDEX = 0;

	let line1Visible = $state(false);
	let line2Visible = $state(false);
	let line3Visible = $state(false);

	const magneticTexts = [
		'Explore the magnetic theme • Letters respond to your cursor',
		'Right-click to switch cursor charge',
		'Scroll to explore my work'
	];

	$effect(() => {
		// Initialize ionosphere
		setTimeout(() => {
			const bgColor = getComputedStyle(document.body).backgroundColor;
			const ionosphere = createIonosphere("ions", {
				repaint: bgColor,
				trailMaxLength: 0,
			});
			ionosphere.start();
		}, 100);

		// Check if section has been visited
		if ($visitedSections.has(SECTION_INDEX)) {
			// Show everything immediately
			line1Visible = true;
			line2Visible = true;
			line3Visible = true;
			showNavigationButtons();
			return;
		}

		// Fade in animations one by one
		setTimeout(() => {
			line1Visible = true;
			setTimeout(() => {
				line2Visible = true;
				setTimeout(() => {
					line3Visible = true;
					setTimeout(() => {
						showNavigationButtons();
						markSectionVisited(SECTION_INDEX);
					}, 600);
				}, 400);
			}, 400);
		}, 500);
	});
</script>

<div class="landing">
	<div>
		<p class:visible={line1Visible}>Hi, I am</p>
		<h1 class:visible={line2Visible}>
			<RepelText text="Anuj" /> <RepelText text="Dhillon" />
		</h1>
	</div>
	<div class="info">
		<p class:visible={line3Visible}>
			<AlternatingText texts={magneticTexts} />
		</p>
	</div>
</div>

<style>
	.landing {
		text-align: center;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.landing > div > p,
	.landing > .info > p {
		font-size: 1.2rem;
		color: var(--text2);
		margin: 0;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.6s ease-out,
			transform 0.6s ease-out;
	}

	.landing > div > p {
		margin-bottom: 0.5rem;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.landing > div > p.visible,
	.landing > .info > p.visible {
		opacity: 1;
		transform: translateY(0);
	}

	h1 {
		text-transform: uppercase;
		font-size: clamp(4rem, 15vw, 12rem);
		color: var(--negative2);
		margin: 0;
		font-weight: 700;
		letter-spacing: -0.02em;
		opacity: 0;
		transition: opacity 0.6s ease-out;
	}

	h1.visible {
		opacity: 1;
	}
</style>
