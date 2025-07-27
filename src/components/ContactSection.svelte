<script lang="ts">
    import Title from "./Title.svelte";
    import { info } from "$lib/info";
    import CustomRenderer from "./CustomRenderer.svelte";
    import { IconEmail } from "$lib/icons";
    import CommentSection from "./CommentSection.svelte";
    import { typeText } from "$lib/animation";
    import { createSectionObserver } from "$lib/sectionObserver";

    const { apiCallStatus, commentList } = $props();

    $effect(() => {
        const observer = createSectionObserver(
            [...document.getElementsByClassName("ContactItem")],
            () => {
                const rightItemsContainer =
                    document.getElementById("right-items");
                const iconHolder = document.getElementById("icon-holder");
                const iconsContainer = document.getElementById("icons");
                if (!rightItemsContainer || !iconHolder || !iconsContainer) {
                    throw new Error("Check element IDs");
                }
                typeText(
                    rightItemsContainer,
                    () => {
                        iconHolder.classList.add("show");
                    },
                    20
                );
                iconsContainer.classList.add("show");
            }
        );

        return () => {
            observer.disconnect();
        };
    });
</script>

<div id="contact">
    <div class="title">
        <Title title="Contact" span="Contact" />
    </div>
    <div class="ContactPage">
        <div id="icons" class="icons">
            {#each info.links as link}
                <a
                    href={link.url}
                    target="_blank"
                    class="icon-holder"
                    rel="noreferrer"
                >
                    <CustomRenderer htmlString={link.icon} />
                </a>
            {/each}
        </div>
        <div class="ContactItem">
            <div id="icon-holder" class="contact-icon-holder">
                <CustomRenderer htmlString={IconEmail} />
            </div>
            <div id="right-items" class="right-items">
                <p>Email</p>
                <p class="label">{info.email}</p>
            </div>
        </div>
    </div>
    <div class="separator-text">
        <h2>Or Write Anonymously</h2>
    </div>
    <CommentSection {apiCallStatus} {commentList} />
</div>

<style>
    .ContactItem {
        width: 100%;
        display: flex;
        background-color: var(--background2);
        align-items: center;
        justify-content: space-around;
        .right-items {
            .label {
                font-size: 1rem;
                color: var(--text2);
            }
        }
    }

    .ContactPage {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin-bottom: 2rem;
        gap: 2rem;
        @media screen and (max-width: 1270px) {
            display: block;
        }
    }
    .contact-icon-holder {
        opacity: 0;
        transition: all 0.5s ease-in-out;
    }
    :global(.contact-icon-holder.show) {
        opacity: 1;
    }
    .separator-text {
        margin-bottom: 1rem;
    }
    .icons {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        transform: scale(0);
        transform-origin: top;
        transition: all 0.5s ease-in-out;
    }
    :global(.icon) {
        transition: all 0.5s ease-in-out;
    }
    :global(.icon:hover) {
        transform: scale(1.1);
    }
    :global(.icons.show) {
        transform: scale(1);
    }
</style>
