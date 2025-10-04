<script lang="ts">
    import { info, type Experience } from "$lib/info";
    import CustomRenderer from "./CustomRenderer.svelte";
    import { IconLinkedin } from "$lib/icons";
</script>

{#snippet experience(item: Experience)}
    <div class="experience-card">
        <div class="card-header">
            <div class="company-info">
                <!-- {#if item.logo}
                    <img src={item.logo} alt={item.employer} class="company-logo" />
                {/if} -->
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
    </div>
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
    .experience-card {
        background-color: var(--background2);
        padding: 1.5rem;
        border-radius: 8px;
        transition: all 0.3s ease-in-out;
    }
    .experience-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        @media screen and (max-width: 768px) {
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
    .company-logo {
        width: 2.5rem;
        height: 2.5rem;
        object-fit: contain;
        border-radius: 4px;
    }
    .company {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary1);
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
        width: 1.5rem;
        height: 1.5rem;
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
