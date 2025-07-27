<script lang="ts">
    import { LOADED } from "$lib/api";
    import { createSectionObserver } from "$lib/sectionObserver";
    import avatar from "../img/avatar.jpeg";
    const { hideNavbarInSmallerScreens, views, apiCallStatus } = $props();

    let activeNavItem = $state("");

    const onObserve = (element: Element) => {
        activeNavItem = element.id;
    };

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    $effect(() => {
        const observer = createSectionObserver(
            ["about", "experience", "projects", "contact"]
                .map((id) => document.getElementById(id))
                .filter((element) => element !== null),
            onObserve
        );
        return () => {
            observer.disconnect();
        };
    });
</script>

{#snippet navItem(id: string, text: string, tabIndex: number)}
    <li class={"nav-item" + (id === activeNavItem ? " active" : "")}>
        <div
            onclick={() => scrollToSection(id)}
            class="nav-link"
            role="button"
            tabindex={tabIndex}
            onkeydown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    scrollToSection(id);
                }
            }}
        >
            {text}
        </div>
    </li>
{/snippet}

<div
    class="sidebar {hideNavbarInSmallerScreens
        ? 'hide-in-smaller-screens'
        : ''}"
>
    <div class="NavBar">
        <nav class="nav">
            <div class="profile">
                <img src={avatar} alt="Anuj" />
            </div>
            <ul class="nav-items">
                {@render navItem("about", "About", 0)}
                {@render navItem("experience", "Experience", 1)}
                {@render navItem("projects", "Projects", 2)}
                {@render navItem("contact", "Contact", 3)}
            </ul>
            <footer class="footer">
                <p>
                    Views:{" "}
                    {apiCallStatus === LOADED ? views : apiCallStatus}
                </p>
            </footer>
        </nav>
    </div>
</div>

<style>
    .sidebar {
        height: 100%;
        z-index: 10;
        background-color: var(--background2);
        transform-origin: left;
        transition: all 0.4s ease-in-out;
        @media screen and (max-width: 1000px) {
            position: fixed;
            width: 30%;
        }
        @media screen and (max-width: 411px) {
            width: 50%;
        }
    }
    .hide-in-smaller-screens {
        @media screen and (max-width: 1000px) {
            transition: all 0.4s ease-in-out;
            width: 0%;
        }
    }
    .NavBar {
        height: 100%;
        .nav {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            overflow-x: hidden;
            .profile {
                width: 100%;
                text-align: center;
                margin-top: 1rem;
                img {
                    width: 70%;
                    border-radius: 100%;
                    margin-bottom: 1rem;
                }
            }

            .nav-items {
                width: 100%;
                padding-inline-start: 0;
                .nav-item {
                    list-style: none;
                    text-align: center;
                    cursor: pointer;
                    div {
                        border: none;
                        background: none;
                        text-align: center;
                        text-decoration: none;
                        color: var(--text3);
                        padding: 0.5rem 0;
                        position: relative;
                        &::before {
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 0.01rem;
                            height: 100%;
                            background-color: var(--primary1);
                            opacity: 0.5;
                            transform-origin: center;
                            transform: scale(0);
                            overflow-x: hidden;
                            transition:
                                transform 0.5s,
                                0.5s width 0.5s ease-in-out;
                        }

                        &:hover::before {
                            width: 100%;
                            transform: scale(1);
                        }
                    }
                }
                .active {
                    background-color: var(--primary1);
                    color: var(--background2);
                    transition: all 0.4s ease-in-out;
                    &::before {
                        display: none;
                    }
                }
            }

            .footer {
                width: 100%;
                p {
                    color: var(--text3);
                    text-align: center;
                    padding: 1rem 0;
                }
            }
        }
    }
</style>
