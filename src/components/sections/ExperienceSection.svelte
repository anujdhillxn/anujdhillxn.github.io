<script lang="ts">
    import { info, type Experience } from "$lib/info";
    import CustomRenderer from "../CustomRenderer.svelte";
    import { IconLinkedin } from "$lib/icons";
    import Card from "../ui/Card.svelte";
</script>

{#snippet experience(item: Experience)}
    <Card>
        <div class="card-header">
            <div class="company-info">
                <h3 class="company">{item.employer}</h3>
                {#if item.linkedinUrl}
                    <a href={item.linkedinUrl} target="_blank" rel="noreferrer" class="linkedin-link">
                        {@html IconLinkedin}
                    </a>
                {/if}
            </div>
            <span class="duration">{`${item.startMonth} - ${item.endMonth}`}</span>
        </div>
        <h4 class="role">{item.role}</h4>
        <p class="description">{item.description}</p>
    </Card>
{/snippet}

<div id="experience" class="ExperiencePage">
    <div class="experience-container">
        {#each info.experiences as item}
            {@render experience(item)}
        {/each}
    </div>
</div>

<style>
    .experience-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    @media screen and (max-width: 768px) {
        .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
        }
    }

    .company-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .company {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--negative1);
        margin: 0;
    }

    .linkedin-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        opacity: 0.6;
        transition: opacity 0.3s ease-in-out;
    }

    .linkedin-link :global(svg) {
        width: 1.25rem !important;
        height: 1.25rem !important;
    }

    .linkedin-link:hover {
        opacity: 1;
    }

    .duration {
        font-size: 0.9rem;
        color: var(--text3);
    }

    .role {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text2);
        margin: 0 0 0.75rem 0;
    }

    .description {
        color: var(--text3);
        margin: 0;
        line-height: 1.6;
    }
</style>
