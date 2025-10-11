<script lang="ts">
	import { visitedSections, markSectionVisited } from "$lib/visitedSections";
	import LetterText from "../ui/LetterText.svelte";
	const { showNavigationButtons } = $props();
	const SECTION_INDEX = 0;

	let line1Visible = $state(false);
	let line2Visible = $state(false);
	let line3Visible = $state(false);

	$effect(() => {

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
				}, 1200);
			}, 400);
		}, 500);
	});

</script>

<div class="landing">
	<div>
		<p class:visible={line1Visible}>Hi, I am</p>
		<h1 class:visible={line2Visible}>
			<LetterText text="Anuj" animate={line2Visible} charge={-1} />
			<span class="space"> </span>
			<LetterText text="Dhillon" animate={line2Visible} charge={-1} />
		</h1>
	</div>
	<div class="info">
		{#if line3Visible}
			<p>
				Scroll to explore my work
			</p>
		{/if}
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

	.landing > div > p {
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
		min-height: 60px;
	}

	.info > p {
		font-size: 1.2rem;
		color: var(--text2);
		margin: 0;
		animation: fadeInUp 0.6s ease forwards;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.landing > div > p.visible {
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

	@keyframes letterFadeIn {
		to {
			opacity: 1;
		}
	}

	h1 .space {
		display: inline-block;
		width: 0.3em;
	}
</style>
