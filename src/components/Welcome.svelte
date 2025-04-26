<script lang="ts">
    import { typeText } from "$lib/animation";

    const { enter } = $props();

    const showButton = () => {
        const el = document.getElementById("enter-button");
        el?.classList.add("show");
    };

    $effect(() => {
        const el = document.getElementById("typewriter");
        if (!el) return;
        typeText(el, showButton);
    });
</script>

<div id="welcome-container">
    <div id="typewriter">
        <h1>Hi, I am <span>Anuj Dhillon</span></h1>
        <h2>
            Click the
            <span> Button </span>
            below to enter my realm.
        </h2>
    </div>

    <button class="btnbig" id="enter-button" onclick={enter}>Enter</button>
</div>

<style>
    #typewriter {
        opacity: 0;
    }
    h1 {
        color: var(--text1);
        text-align: center;
        font-size: 3.6rem;
        span {
            color: var(--primary1);
        }
    }
    h2 {
        color: var(--text1);
        text-align: center;
        font-size: 2rem;
        span {
            color: var(--primary1);
        }
    }
    #welcome-container {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100vh;
        background-color: var(--background1);
    }
    .btnbig {
        opacity: 0;
        padding: 1rem 2rem;
        background-color: var(--primary1);
        width: 25%;
        outline: none;
        border: none;
        color: var(--text1);
        text-transform: uppercase;
        cursor: pointer;
        margin-top: 1rem;
        position: relative;
        transition: all 0.5s ease-in-out;
    }
    :global(.btnbig.show) {
        opacity: 1;
    }
    .btnbig:hover {
        animation: shake 0.5s;
        color: var(--primary1);
        background-color: var(--text1);
    }
</style>
