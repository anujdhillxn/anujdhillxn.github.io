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

    <button class="btn" id="enter-button" onclick={enter}>Enter</button>
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
    .btn {
        padding: 1.5rem 3rem;
        background-color: var(--primary1);
        outline: none;
        border: none;
        font-family: inherit;
        font-size: inherit;
        color: var(--text1);
        text-transform: uppercase;
        cursor: pointer;
        position: relative;
        transition: all 0.8s ease-in-out;
        opacity: 0;
        &::after {
            position: absolute;
            content: "";
            width: 0;
            height: 0.3rem;
            left: 0;
            bottom: 0;
            background-color: var(--primary1);
            transition: all 0.4s ease-in-out;
        }
        &:hover::after {
            width: 100%;
        }
    }
    :global(.btn.show) {
        opacity: 1;
    }
    .btn:hover {
        background-color: var(--background2);
        color: var(--text2);
    }
</style>
