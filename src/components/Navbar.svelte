<script lang="ts">
    import NavigationButton from "./ui/NavigationButton.svelte";

    let { currentSection, goUp, goDown } = $props();
</script>

<div class="navbar">
    <div class="nav-controls">
        <NavigationButton onclick={(e: MouseEvent) => { e.stopPropagation(); goUp(); }} disabled={currentSection === 0}>
            ▲
        </NavigationButton>
        <p class="nav-hint">{currentSection + 1}/6</p>
        <NavigationButton onclick={(e: MouseEvent) => { e.stopPropagation(); goDown(); }} disabled={currentSection === 5}>
            ▼
        </NavigationButton>
    </div>
</div>

<style>
    .navbar {
        background: color-mix(in srgb, var(--background2) 80%, transparent);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 12px;
        padding: 0.5rem 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
        box-shadow: 0 4px 6px color-mix(in srgb, var(--background1) 90%, transparent);
        width: 85%;
        max-width: 800px;
    }

    .name {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text1);
        margin: 0;
    }

    .nav-controls {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }

    .nav-hint {
        font-size: 0.75rem;
        color: var(--text3);
        margin: 0;
        opacity: 0.8;
        min-width: 1.5rem;
        text-align: center;
    }
</style>
