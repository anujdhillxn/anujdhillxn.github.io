<script lang="ts">
	import ChargeWrapper from '../cursor/ChargeWrapper.svelte';

	const { text, class: className = '', animate = false, charge = 0 } = $props<{
		text: string;
		class?: string;
		animate?: boolean;
		charge?: number;
	}>();
</script>

<div class="letter-text {className}">
	{#each text.split('') as char, i}
		{#if char === ' '}
			<span class="space">&nbsp;</span>
		{:else}
			<ChargeWrapper {charge}>
				<span
					class="letter"
					class:animate
					style:--delay="{i * 0.05}s"
					style:--float-delay="{Math.random() * 2}s"
					style:--float-duration="{2 + Math.random() * 2}s"
				>{char}</span>
			</ChargeWrapper>
		{/if}
	{/each}
</div>

<style>
	.letter-text {
		display: inline-block;
		white-space: nowrap;
	}

	.letter {
		display: inline-block;
		animation: float var(--float-duration, 3s) ease-in-out infinite;
		animation-delay: var(--float-delay, 0s);
	}

	.letter.animate {
		opacity: 0;
		animation: letterFadeIn 0.6s ease forwards, float var(--float-duration, 3s) ease-in-out infinite;
		animation-delay: var(--delay), var(--float-delay, 0s);
	}

	@keyframes letterFadeIn {
		to {
			opacity: 1;
		}
	}

	@keyframes float {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-4px);
		}
	}

	.space {
		display: inline-block;
		width: 0.3em;
	}
</style>
