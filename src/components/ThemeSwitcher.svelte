<script lang="ts">
    import { isDarkTheme } from "$lib/theme";

    const toggleTheme = () => {
        isDarkTheme.update(v => !v);
    };
</script>

<button class="theme-switcher" onclick={toggleTheme}>
    {$isDarkTheme ? '☀️' : '🌙'}
</button>

<style>
    .theme-switcher {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        transition: transform 0.3s ease;
        filter: grayscale(0.3);
    }
    .theme-switcher:hover {
        transform: scale(1.2);
    }
</style>
