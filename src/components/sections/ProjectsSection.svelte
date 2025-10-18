<script lang="ts">
    import { info } from "$lib/info";
    import CustomRenderer from "../CustomRenderer.svelte";

    let expandedProjectId = $state<string | null>(null);

    const toggleProject = (projectId: string) => {
        expandedProjectId = expandedProjectId === projectId ? null : projectId;
    };

    // Calculate height based on number of accordions
    // Each collapsed accordion header is approximately 70px
    const accordionHeaderHeight = 70;
    const totalHeight = info.projects.length * accordionHeaderHeight;

    // Calculate animation delay based on distance from clicked item
    const getAnimationDelay = (projectId: string) => {
        if (expandedProjectId === null) return 0;
        const expandedIndex = info.projects.findIndex(p => p.id === expandedProjectId);
        const currentIndex = info.projects.findIndex(p => p.id === projectId);
        const distance = Math.abs(expandedIndex - currentIndex) - 1;
        return distance * 0.1; // 0.1s delay per item distance
    };

</script>

<div id="projects" class="ProjectsPage">
    <div class="accordion" style="height: {totalHeight}px;">
        {#each info.projects as project}
            <div
                class="accordion-item"
                class:expanded={expandedProjectId === project.id}
                class:hidden={expandedProjectId !== null && expandedProjectId !== project.id}
                style="transition-delay: {getAnimationDelay(project.id)}s;"
            >
                <button
                    class="accordion-header"
                    onclick={(e) => {
                        e.stopPropagation();
                        toggleProject(project.id)
                    }}
                    aria-expanded={expandedProjectId === project.id}
                >
                    <h3>{project.title}</h3>
                    <span
                        class="arrow"
                        class:rotated={expandedProjectId === project.id}
                        class:hidden-arrow={expandedProjectId !== null && expandedProjectId !== project.id}
                    >▼</span>
                </button>

                {#if expandedProjectId === project.id}
                    {@const currentIndex = info.projects.findIndex(p => p.id === project.id)}
                    <div class="accordion-content" style="animation-delay: {currentIndex * 0.1}s;">
                        <p class="description">{project.description}</p>
                        <div class="links">
                            {#each project.links as link}
                                <a href={link.url} target="_blank" rel="noreferrer" class="icon-link">
                                    <CustomRenderer htmlString={link.icon} />
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .ProjectsPage {
        display: flex;
        flex-direction: column;
    }

    .accordion {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .accordion-item {
        background: var(--bg2);
        border-bottom: 1px solid rgba(128, 128, 128, 0.2);
        max-height: 70px;
        opacity: 1;
        overflow: hidden;
        transform: translateX(0);
        transition: max-height 0.4s ease, opacity 0.4s ease, transform 0.4s ease;
    }

    .accordion-item.hidden {
        max-height: 0;
        opacity: 0;
        transform: translateX(-10%);
        border-bottom: none;
    }

    .accordion-item:hover:not(.expanded):not(.hidden) {
        background: var(--bg3);
        transform: translateX(0) scale(1.02);
    }

    .accordion-item:hover:not(.expanded):not(.hidden) .accordion-header h3 {
        color: var(--accent);
        transform: translateX(8px);
    }

    .accordion-item.expanded {
        background: var(--bg3);
        flex: 1;
        border-bottom: none;
        max-height: none;
    }

    .accordion-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem 1.75rem;
        background: transparent;
        border: none;
        cursor: pointer;
        text-align: left;
        font-family: inherit;
    }

    .accordion-header h3 {
        margin: 0;
        font-weight: 600;
        color: var(--text2);
        font-size: 1.1rem;
        transition: color 0.3s ease, transform 0.3s ease;
    }

    .arrow {
        color: var(--accent);
        font-size: 0.75rem;
        flex-shrink: 0;
        margin-left: 1rem;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0.7;
        font-weight: 300;
    }

    .accordion-item:hover .arrow {
        opacity: 1;
    }

    .arrow.rotated {
        transform: rotate(180deg);
    }

    .arrow.hidden-arrow {
        transform: rotate(90deg);
    }

    .accordion-content {
        padding: 0 1.75rem 1.75rem 1.75rem;
        animation: fadeSlideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        animation-fill-mode: both;
    }

    @keyframes fadeSlideIn {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .description {
        margin: 0 0 1.25rem 0;
        color: var(--text2);
        line-height: 1.7;
        font-size: 1rem;
        padding: 1rem;
        background: var(--bg2);
        border-radius: 0.5rem;
        border-left: 3px solid var(--accent);
    }

    .links {
        display: flex;
        gap: 1rem;
        align-items: center;
        padding: 0.5rem 0;
    }

    .icon-link {
        display: inline-flex;
        padding: 0.5rem;
        border-radius: 0.5rem;
        background: var(--bg2);
        opacity: 0.9;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .icon-link:hover {
        opacity: 1;
        transform: translateY(-2px) scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        background: var(--accent);
    }

    .icon-link :global(svg.icon) {
        width: 1.5rem !important;
        height: 1.5rem !important;
    }

    @media screen and (max-width: 768px) {
        .accordion-header {
            padding: 1rem 1.25rem;
        }

        .accordion-header h3 {
            font-size: 1.1rem;
        }

        .accordion-content {
            padding: 0 1.25rem 1.25rem 1.25rem;
        }
    }
</style>
