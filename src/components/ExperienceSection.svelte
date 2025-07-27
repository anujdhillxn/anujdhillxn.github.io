<script lang="ts">
    import { info, type Experience } from "$lib/info";
    import Title from "./Title.svelte";
    import CustomRenderer from "./CustomRenderer.svelte";
    import { createSectionObserver } from "$lib/sectionObserver";
    const { selectedSkills } = $props();

    const hasAppearedOnce: string[] = $state([]);

    $effect(() => {
        const observer = createSectionObserver(
            [
                ...document.getElementsByClassName("heading-container"),
                ...document.getElementsByClassName("body-container"),
            ],
            (element) => {
                hasAppearedOnce.push(element.id);
            },
            1
        );
        return () => {
            observer.disconnect();
        };
    });
</script>

{#snippet experience(item: Experience)}
    <div>
        <div
            class={`heading-container ${hasAppearedOnce.findIndex((proId) => proId === `heading ${item.id}`) !== -1 ? `show` : ``}`}
            id={`heading ${item.id}`}
        >
            <h5 class="heading-text">{`${item.employer} `}</h5>
            <p>{`(${item.startMonth} - ${item.endMonth})`}</p>
        </div>
        <div
            class={`body-container ${hasAppearedOnce.findIndex((proId) => proId === `body ${item.id}`) !== -1 ? `show` : ``}`}
            id={`body ${item.id}`}
        >
            <h3>{item.role}</h3>
            <CustomRenderer htmlString={item.description} />
        </div>
    </div>
{/snippet}

<div id="experience" class="ExperiencePage">
    <Title title="Professional Experience" span="Professional Experience" />
    <div class="experience-container">
        {#each info.experiences.filter((experience) => {
            for (const skill of selectedSkills) {
                if (experience.skills
                        .split(",")
                        .map((item) => item.trim())
                        .includes(skill)) return true;
            }
            return false;
        }) as item}
            {@render experience(item)}
        {/each}
    </div>
</div>

<style>
    .heading-container {
        display: flex;
        align-items: center;
        transform-origin: right;
        transform: scale(0);
        transition: all 0.5s ease-in-out;
        justify-content: space-between;
        padding: 0;
        @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
        }
    }
    :global(.heading-container.show) {
        transform: scale(1);
    }
    .heading-text {
        font-size: 1.7rem;
        font-weight: 700;
        color: var(--text1);
        transition: all 0.3s ease-in-out;
        margin: 0;
    }
    .body-container {
        transform: scale(0);
        transform-origin: top;
        transition: all 0.5s ease-in-out;
        h3 {
            margin: 0;
            font-weight: 600;
        }
        ul {
            margin: 0;
        }
    }
    :global(.body-container.show) {
        transform: scale(1);
    }
</style>
