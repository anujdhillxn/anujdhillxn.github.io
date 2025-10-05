<script lang="ts">
    import { info, type Project } from "$lib/info";
    import CustomRenderer from "./CustomRenderer.svelte";
    import NavigationButton from "./NavigationButton.svelte";
    import { IconGithub, IconLink } from "$lib/icons";
    import Card from "./Card.svelte";

    let currentPage = $state(0);
    let itemsPerPage = $state(3);
    let totalPages = $derived(Math.ceil(info.projects.length / itemsPerPage));

    const nextPage = (e: MouseEvent) => {
        e.stopPropagation();
        if (currentPage < totalPages - 1) currentPage++;
    };

    const prevPage = (e: MouseEvent) => {
        e.stopPropagation();
        if (currentPage > 0) currentPage--;
    };

    const updateItemsPerPage = () => {
        const newItemsPerPage = window.innerWidth <= 900 ? 2 : 3;
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

<div id="projects" class="ProjectsPage">
    <div class="projects-container">
        <NavigationButton onclick={prevPage} disabled={currentPage === 0}>
            ◀
        </NavigationButton>
        {#key currentPage}
            <div class="projects">
                {#each info.projects.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) as item}
                    {@render project(item)}
                {/each}
            </div>
        {/key}
        <NavigationButton onclick={nextPage} disabled={currentPage === totalPages - 1}>
            ▶
        </NavigationButton>
    </div>
</div>

<style>
    .projects-container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .projects {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        animation: slideIn 0.5s ease-in-out;
        justify-content: center;
        flex: 1;
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
