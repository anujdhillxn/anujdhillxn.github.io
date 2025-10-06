<script lang="ts">
    import { info } from "$lib/info";
    import Card from "../ui/Card.svelte";
    import ChargeWrapper from "../cursor/ChargeWrapper.svelte";
    import { visitedSections, markSectionVisited } from "$lib/visitedSections";

    const SECTION_INDEX = 1;
    const allSkills = info.allSkills;

    // Assign random charges to skills
    const skillsWithCharge = allSkills.map((skill) => ({
        name: skill,
        charge: [1, -1, 0][Math.floor(Math.random() * 3)]
    }));

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
        {#each skillsWithCharge as { name, charge }}
            <ChargeWrapper {charge} enableRotation={true}>
                <Card class="skill-card">
                    {name}
                </Card>
            </ChargeWrapper>
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
        padding: 0.75rem 1.5rem !important;
        color: var(--text2);
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease-in-out;
        font-size: 0.95rem;
    }

    @media screen and (max-width: 900px) {
        :global(.skill-card) {
            padding: 0.6rem 1.2rem !important;
            font-size: 0.85rem;
        }
    }

    :global(.skill-card.show) {
        opacity: 1;
        transform: scale(1);
    }

    /* Charge styling */
    :global(.charge-wrapper[data-charge="1"]) {
        position: relative;
    }

    :global(.charge-wrapper[data-charge="-1"]) {
        position: relative;
    }

    :global(.charge-wrapper[data-charge="1"] .card) {
        border-color: color-mix(in srgb, var(--positive2) 40%, transparent) !important;
    }

    :global(.charge-wrapper[data-charge="-1"] .card) {
        border-color: color-mix(in srgb, var(--negative2) 40%, transparent) !important;
    }
</style>
