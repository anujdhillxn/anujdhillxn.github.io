<script lang="ts">
	import ChargeWrapper from './ChargeWrapper.svelte';

	const { text, class: className = '', animate = false, charge = -1 } = $props<{
		text: string;
		class?: string;
		animate?: boolean;
		charge?: number;
	}>();
</script>

<div class="repel-text {className}">
	{#each text.split('') as char, i}
		{#if char === ' '}
			<span class="space">&nbsp;</span>
		{:else}
			<ChargeWrapper {charge}>
				<span
					class="letter"
					class:animate
					style:--delay="{i * 0.05}s"
				>{char}</span>
			</ChargeWrapper>
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
	}

	.letter.animate {
		opacity: 0;
		animation: letterFadeIn 0.6s ease forwards;
		animation-delay: var(--delay);
	}

	@keyframes letterFadeIn {
		to {
			opacity: 1;
		}
	}

	.space {
		width: 0.3em;
	}
</style>
