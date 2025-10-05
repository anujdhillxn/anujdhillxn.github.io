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
        padding: 30vh 20% 0 20%;
        display: flex;
        flex-direction: column;
        animation: slideIn 0.5s ease-in-out;
        @media screen and (max-width: 900px) {
            padding-top: 20vh;
        }
        @media screen and (max-width: 600px) {
            padding: 10vh 1rem 0 1rem;
        }
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
</style>
