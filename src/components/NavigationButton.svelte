<script lang="ts">
    const { onclick, disabled, children } = $props();
</script>

<button class="nav-button" {onclick} {disabled}>
    {@render children()}
</button>

<style>
    .nav-button {
        background-color: var(--background2);
        border: none;
        border-radius: 50%;
        color: var(--text1);
        font-size: 1.2rem;
        cursor: pointer;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in-out;
    }
    .nav-button:hover:not(:disabled) {
        background-color: var(--primary2);
        transform: scale(1.1);
    }
    .nav-button:disabled {
        opacity: 0.2;
        cursor: not-allowed;
    }
</style>
