<script lang="ts">
    import { info } from "$lib/info";
    import Card from "./Card.svelte";
    import { visitedSections, markSectionVisited } from "$lib/visitedSections";

    const SECTION_INDEX = 1;
    const allSkills = info.allSkills;

    $effect(() => {
        const skillCards = document.querySelectorAll('.skill-card');

        if ($visitedSections.has(SECTION_INDEX)) {
            skillCards.forEach((card) => {
                card.classList.add('show');
            });
            return;
        }

        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
                if (index === skillCards.length - 1) {
                    markSectionVisited(SECTION_INDEX);
                }
            }, index * 50);
        });
    });
</script>

<div id="skills" class="SkillsPage">
    <div class="skills">
        {#each allSkills as skill}
            <Card class="skill-card">
                {skill}
            </Card>
        {/each}
    </div>
</div>

<style>
    .skills {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-bottom: 1rem;
    }

    :global(.skill-card) {
        padding: 1rem 2rem !important;
        color: var(--text2);
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease-in-out;
    }

    @media screen and (max-width: 900px) {
        :global(.skill-card) {
            padding: 0.75rem 1.5rem !important;
            font-size: 1rem;
        }
    }

    :global(.skill-card.show) {
        opacity: 1;
        transform: scale(1);
    }
</style>
