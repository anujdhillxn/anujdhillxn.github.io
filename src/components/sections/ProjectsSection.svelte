<script lang="ts">
    import { info, type Project } from "$lib/info";
    import CustomRenderer from "../CustomRenderer.svelte";
    import NavigationButton from "../ui/NavigationButton.svelte";
    import { IconGithub, IconLink } from "$lib/icons";
    import Card from "../ui/Card.svelte";
    import { createIonosphere } from "ions-ts";
    import { cursorCharge } from "$lib/cursorCharge";

    let currentPage = $state(0);
    let itemsPerPage = $state(3);
    let totalPages = $derived(Math.ceil(info.projects.length / itemsPerPage));
    let ionosphere: any;

    const nextPage = (e: MouseEvent) => {
        e.stopPropagation();
        if (currentPage < totalPages - 1) currentPage++;
    };

    const prevPage = (e: MouseEvent) => {
        e.stopPropagation();
        if (currentPage > 0) currentPage--;
    };

    const updateItemsPerPage = () => {
        const newItemsPerPage = 3;
        if (newItemsPerPage !== itemsPerPage) {
            itemsPerPage = newItemsPerPage;
            currentPage = 0;
        }
    };

    $effect(() => {
        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    });

    // Create ionosphere once
    $effect(() => {
        // Get the computed background color from the body element
        // This will properly resolve light-dark() based on the current color scheme
        const backgroundColor = getComputedStyle(document.body).backgroundColor;

        ionosphere = createIonosphere('ionsCanvas', {
            repaint: backgroundColor,
            trailMaxLength: 0,
            cursorCharge: $cursorCharge,
        });
        ionosphere.start();

        return () => {
            ionosphere.destroy();
        };
    });

    // Update ionosphere config when cursor charge changes
    $effect(() => {
        if (ionosphere) {
            ionosphere.updateConfig({ cursorCharge: $cursorCharge });
        }
    });
</script>

{#snippet project(item: Project)}
    <Card>
        <div id={item.id}>
            <div class="header">
                <h3>{item.title}</h3>
                {#each item.links as link}
                    <a href={link.url} target="_blank" rel="noreferrer" class="icon-link">
                        <CustomRenderer htmlString={link.url.includes('github.com') ? IconGithub : IconLink} />
                    </a>
                {/each}
            </div>
            <p>{item.description}</p>
        </div>
    </Card>
{/snippet}

<canvas id='ionsCanvas'></canvas>
<div id="projects" class="ProjectsPage">
    {#key currentPage}
        <div class="projects">
            {#each info.projects.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) as item}
                {@render project(item)}
            {/each}
        </div>
    {/key}
    <div class="nav-controls">
        <NavigationButton onclick={prevPage} disabled={currentPage === 0}>
            ◀
        </NavigationButton>
        <span class="page-indicator">{currentPage + 1} / {totalPages}</span>
        <NavigationButton onclick={nextPage} disabled={currentPage === totalPages - 1}>
            ▶
        </NavigationButton>
    </div>
</div>

<style>
        #ionsCanvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .ProjectsPage {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .projects {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        animation: slideIn 0.5s ease-in-out;
        justify-content: center;
    }

    .nav-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    .page-indicator {
        font-size: 0.875rem;
        color: var(--text3);
        min-width: 3rem;
        text-align: center;
    }

    .projects :global(.card) {
        width: 350px;
    }

    @media screen and (max-width: 900px) {
        .projects :global(.card) {
            width: 100%;
        }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .projects .header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
    }

    .projects .header h3 {
        margin: 0;
        font-weight: 600;
        color: var(--text1);
    }

    .projects .header .icon-link {
        display: inline-flex;
        opacity: 0.8;
        transition: opacity 0.2s;
    }

    .projects .header .icon-link:hover {
        opacity: 1;
    }

    .projects .header .icon-link :global(svg.icon) {
        width: 1.5rem !important;
        height: 1.5rem !important;
    }

    .projects p {
        margin: 0;
        color: var(--text2);
    }
</style>
