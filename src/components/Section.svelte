<script lang="ts">
    import Title from "./Title.svelte";
    const { title, children } = $props();
</script>

<section class="snap-section">
    {#if title}
        <Title {title} span={title} />
    {/if}
    {@render children()}
</section>

<style>
    .snap-section {
        height: 100%;
        padding: 0 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        animation: slideIn 0.5s ease-in-out;
    }
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @media screen and (max-width: 600px) {
        .snap-section {
            padding: 0 1rem;
        }
    }
</style>
