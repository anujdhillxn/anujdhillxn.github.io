<script lang="ts">
    import { info } from "$lib/info";
    import { createSectionObserver } from "$lib/sectionObserver";

    const allSkills = info.allSkills;

    $effect(() => {
        const observer = createSectionObserver(
            Array.from(document.getElementsByClassName("skill-tag")),
            (element) => {
                element.classList.add("show");
            },
            1
        );
        return () => {
            observer.disconnect();
        };
    });
</script>

<div id="skills" class="SkillsPage">
    <div class="skills">
        {#each allSkills as skill}
            <div class="skill-tag">
                {skill}
            </div>
        {/each}
    </div>
</div>

<style>
    .skill-tag {
        transform: scale(0);
        transform-origin: top;
        padding: 1rem 2rem;
        background-color: var(--background2);
        font-size: inherit;
        font-family: inherit;
        color: var(--text2);
        margin-bottom: 0.75rem;
        transition: all 0.3s ease-in-out;
        margin-right: 0.75rem;
        @media screen and (max-width: 900px) {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
        }
    }
    :global(.skill-tag.show) {
        transform: scale(1);
    }
    .skill-tag:hover {
        transform: translateY(-4px) scale(1);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    .skills {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1rem;
    }
</style>
