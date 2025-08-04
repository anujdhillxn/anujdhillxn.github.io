<script lang="ts">
    import { info, type Project } from "$lib/info";
    import Title from "./Title.svelte";
    import CustomRenderer from "./CustomRenderer.svelte";
    import { createSectionObserver } from "$lib/sectionObserver";

    const { selectedSkills } = $props();

    const hasAppearedOnce: string[] = $state([]);

    $effect(() => {
        const observer = createSectionObserver(
            Array.from(document.getElementsByClassName("project")),
            (element) => {
                hasAppearedOnce.push(element.id);
            },
            0.2
        );
        return () => {
            observer.disconnect();
        };
    });
</script>

{#snippet project(item: Project)}
    <div
        class={`project ${hasAppearedOnce.findIndex((proId) => proId === item.id) !== -1 ? `show` : ``}`}
        id={item.id}
    >
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
    <div class="title">
        <Title title="Projects" span="Projects" />
    </div>
    <div class="projects-data">
        <div class="projects">
            {#each info.projects.filter((project) => {
                for (const skill of selectedSkills) {
                    if (project.skills
                            .split(",")
                            .map((item) => item.trim())
                            .includes(skill)) return true;
                }
                return false;
            }) as item}
                {@render project(item)}
            {/each}
        </div>
    </div>
</div>

<style>
    .projects {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 1rem;
        column-gap: 1rem;
        @media screen and (max-width: 900px) {
            grid-template-columns: repeat(1, 1fr);
        }

        .project {
            width: 0;
            transform-origin: top;
            transition: all 0.5s ease-in-out;
            text-align: center;
            h3 {
                margin: 0;
                font-weight: 600;
                color: var(--text2);
            }
            .image-data {
                position: relative;
                text-align: center;
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
                    @media screen and (max-width: 400px) {
                    }
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

        :global(.project.show) {
            width: 100%;
        }
    }
</style>
