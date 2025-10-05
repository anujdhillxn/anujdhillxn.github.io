<script lang="ts">
    let { children, class: className = "" } = $props();
</script>

<div class="card {className}">
    {@render children()}
</div>

<style>
    .card {
        padding: 1.5rem;
        background-color: var(--background2);
        border: 1px solid color-mix(in srgb, var(--text1) 20%, transparent);
        border-radius: 8px;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .card:hover {
        transform: translateY(-4px) translateX(2px) rotate(0.5deg);
        box-shadow: 0 8px 16px color-mix(in srgb, var(--negative2) 20%, transparent);
        border-color: color-mix(in srgb, var(--negative2) 30%, transparent);
    }
</style>
