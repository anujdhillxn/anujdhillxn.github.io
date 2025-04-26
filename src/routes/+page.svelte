<script>
    import Home from "../components/Home.svelte";
    import Welcome from "../components/Welcome.svelte";
    import { fly } from "svelte/transition";
    let showStuff = $state(false);

    const enter = () => {
        showStuff = true;
    };
</script>

{#if showStuff}
    <div class="view" in:fly={{ x: 1000, duration: 1000 }}>
        <Home />
    </div>
{:else}
    <div class="view" out:fly={{ y: 1000, duration: 2000 }}>
        <Welcome {enter} />
    </div>
{/if}

<style>
    .view {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
