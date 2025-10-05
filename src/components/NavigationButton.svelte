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
        font-size: 0.875rem;
        cursor: pointer;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in-out;
    }
    .nav-button:hover:not(:disabled) {
        background-color: var(--negative2);
        transform: scale(1.1);
    }
    .nav-button:focus-visible {
        outline: 2px solid var(--negative2);
        outline-offset: 2px;
    }
    .nav-button:disabled {
        opacity: 0.2;
        cursor: not-allowed;
    }
</style>
