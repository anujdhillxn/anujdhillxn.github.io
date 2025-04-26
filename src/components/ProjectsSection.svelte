<script>
    import { info } from "$lib/info";
    import Title from "./Title.svelte";
    import CustomRenderer from "./CustomRenderer.svelte";
    import { createSectionObserver } from "$lib/sectionObserver";

    const { selectedSkills } = $props();

    $effect(() => {
        const observer = createSectionObserver(
            Array.from(document.getElementsByClassName("project")),
            (element) => {
                element.classList.add("show");
            },
            0.2
        );
        return () => {
            observer.disconnect();
        };
    });
</script>

{#snippet project(item)}
    <div class="project">
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
        <h5 class="heading-text">{item.title}</h5>
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
        padding-right: 20px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 2rem;
        column-gap: 1rem;
        @media screen and (max-width: 900px) {
            grid-template-columns: repeat(1, 1fr);
        }

        .project {
            width: 0;
            transform-origin: top;
            transition: all 0.5s ease-in-out;
            text-align: center;
            .image-data {
                position: relative;
                text-align: center;
                &::before {
                    content: "";
                    position: absolute;
                    top: 12px;
                    left: 15px;
                    height: calc(100% - 30px);
                    width: calc(100% - 30px);
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
                    height: 30vh;
                    max-width: 30vh;
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
