<script lang="ts">
    const { href, children } = $props();
</script>

<button class="btn">
    <a {href}>{@render children()}</a>
</button>

<style>
    .btn {
        padding: 0.75rem 1.5rem;
        background-color: var(--negative2);
        outline: none;
        border: none;
        font-family: inherit;
        font-size: 0.875rem;
        color: var(--text1);
        text-transform: uppercase;
        cursor: pointer;
        position: relative;
        transition: all 0.8s ease-in-out;
        margin-top: 1.5rem;
        width: fit-content;
        align-self: flex-start;
    }

    .btn::after {
        position: absolute;
        content: "";
        width: 0;
        height: 0.3rem;
        left: 0;
        bottom: 0;
        background-color: var(--negative2);
        transition: all 0.4s ease-in-out;
    }

    .btn:hover::after {
        width: 100%;
    }

    .btn:hover {
        background-color: var(--background2);
        color: var(--text2);
    }

    .btn:focus-visible {
        outline: 2px solid var(--negative1);
        outline-offset: 4px;
    }

    .btn a {
        text-decoration: none;
        color: var(--text1);
    }
</style>
