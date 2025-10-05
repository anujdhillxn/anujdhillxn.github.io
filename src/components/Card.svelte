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
        border-radius: 8px;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .card:hover {
        transform: translateY(-8px) translateX(4px) rotate(1deg);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }
</style>
