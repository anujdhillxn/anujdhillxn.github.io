<script lang="ts">
    const { title, span } = $props();
</script>

<div class="title">
    <h1>
        {title}
    </h1>
</div>

<style>
    .title {
        text-transform: uppercase;
        color: var(--text1);
        position: relative;
        letter-spacing: 0.1rem;
        margin-bottom: 2rem;
    }

    .title h1 {
        margin: 0 0 1rem 0;
    }
</style>
