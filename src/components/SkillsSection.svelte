<script lang="ts">
    import { info } from "$lib/info";
    import { createSectionObserver } from "$lib/sectionObserver";
    const { selectedSkills, clickSkill } = $props();
    import Title from "./Title.svelte";

    const allSkills = info.allSkills;

    $effect(() => {
        const observer = createSectionObserver(
            Array.from(document.getElementsByClassName("btn-port")),
            (element) => {
                element.classList.add("show");
            },
            1
        );
        return () => {
            observer.disconnect();
        };
    });

    const shouldHighlight = (
        text: string,
        categories: string[],
        selectedCategories: string[]
    ) => {
        if (categories.length === selectedCategories.length) {
            return text === "All";
        } else {
            return selectedCategories.includes(text);
        }
    };
</script>

<div id="skills" class="SkillsPage">
    <h4>I am skilled in</h4>
    <div class="buttons">
        {#each allSkills as cat, i}
            <button
                type="button"
                class="btn-port {shouldHighlight(cat, allSkills, selectedSkills)
                    ? 'active-btn-port'
                    : ''}"
                onclick={() => clickSkill(cat)}
            >
                {cat}
            </button>
        {/each}
    </div>
    <button class="btn">
        <a href={info.cvLink}>Download CV</a>
    </button>
</div>

<style>
    h4 {
        font-size: 2rem;
        margin: 0 0 1rem 0;
    }
    .btn-port {
        transform: scale(0);
        transform-origin: top;
        padding: 1rem 2rem;
        background-color: var(--background2);
        border: none;
        outline: none;
        cursor: pointer;
        font-size: inherit;
        font-family: inherit;
        color: var(--text2);
        margin-bottom: 0.75rem;
        transition: all 0.5s ease-in-out;
        &:not(:last-child) {
            margin-right: 0.75rem;
        }
        &:hover {
            background-color: var(--primary2);
            color: var(--background1);
        }
    }
    :global(.btn-port.show) {
        transform: scale(1);
    }
    .active-btn-port {
        background-color: var(--primary1);
        color: var(--text1);
    }

    .buttons {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1rem;
    }
    .btn {
        padding: 1.5rem 3rem;
        background-color: var(--primary2);
        outline: none;
        border: none;
        font-family: inherit;
        font-size: inherit;
        color: var(--text1);
        text-transform: uppercase;
        cursor: pointer;
        position: relative;
        transition: all 0.8s ease-in-out;
        &::after {
            position: absolute;
            content: "";
            width: 0;
            height: 0.3rem;
            left: 0;
            bottom: 0;
            background-color: var(--primary2);
            transition: all 0.4s ease-in-out;
        }
        &:hover::after {
            width: 100%;
        }
        a {
            text-decoration: none;
            color: var(--text1);
        }
    }
    .btn:hover {
        background-color: var(--background2);
        color: var(--text2);
    }
</style>
