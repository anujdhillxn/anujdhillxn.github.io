<script lang="ts">
    import { info, type Project } from "$lib/info";
    import CustomRenderer from "./CustomRenderer.svelte";
    import NavigationButton from "./NavigationButton.svelte";

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
        const newItemsPerPage = window.innerWidth <= 900 ? 1 : 3;
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
    <div class="project" id={item.id}>
        <div class="image-data">
            <img src={item.image} alt={item.title} />
            <ul class="hover-items">
                {#each item.links as link}
                    <li>
                        <a
                            href={link.url}
                            target="_blank"
                            class="icon-holder"
                            rel="noreferrer"
                        >
                            <CustomRenderer htmlString={link.icon} />
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
        <h3 class="heading-text">{item.title}</h3>
        <p>{item.description}</p>
    </div>
{/snippet}

<div id="projects" class="ProjectsPage">
    <div class="projects-container">
        <div class="rotate-left">
            <NavigationButton onclick={prevPage} disabled={currentPage === 0}>
                ▲
            </NavigationButton>
        </div>
        <div class="projects-data">
            {#key currentPage}
                <div class="projects">
                    {#each info.projects.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) as item}
                        {@render project(item)}
                    {/each}
                </div>
            {/key}
        </div>
        <div class="rotate-right">
            <NavigationButton onclick={nextPage} disabled={currentPage === totalPages - 1}>
                ▲
            </NavigationButton>
        </div>
    </div>
</div>

<style>
    .projects-container {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    .rotate-left {
        transform: rotate(-90deg);
    }
    .rotate-right {
        transform: rotate(90deg);
    }
    .projects-data {
        flex: 1;
    }
    .projects {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 1rem;
        column-gap: 1rem;
        animation: slideIn 0.5s ease-in-out;
        @media screen and (max-width: 900px) {
            grid-template-columns: repeat(1, 1fr);
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
    .projects {
        .project {
            text-align: center;
            h3 {
                margin: 0;
                font-weight: 600;
                color: var(--text2);
            }
            .image-data {
                position: relative;
                &::before {
                    content: "";
                    position: absolute;
                    top: 5%;
                    left: 5%;
                    height: 90%;
                    width: 90%;
                    background-color: var(--background2);
                    transform-origin: center;
                    transform: scale(0);
                    transition: all 0.4s ease-in-out;
                    opacity: 0.9;
                }
                &:hover::before {
                    transform: scale(1);
                }
                img {
                    width: 100%;
                    height: 20rem;
                    max-width: 20rem;
                    object-fit: scale-down;
                }
                .hover-items {
                    list-style: none;
                    position: absolute;
                    top: 70%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    padding: 1rem 2rem;
                    opacity: 0;
                }
                &:hover {
                    .hover-items {
                        transition: all 0.5s ease-in-out 0.2s;
                        opacity: 1;
                        top: 50%;
                    }
                }
            }
        }
    }
</style>
