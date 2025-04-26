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
    <div class="title">
        <Title title={"Skills"} span={"Skills"} />
    </div>
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
</div>

<style>
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
        color: var(--text1);
        margin-bottom: 2rem;
        transition: all 0.5s ease-in-out;
        &:not(:last-child) {
            margin-right: 1rem;
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
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
</style>
