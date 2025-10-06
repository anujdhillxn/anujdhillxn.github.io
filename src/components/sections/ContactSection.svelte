<script lang="ts">
    import { info } from "$lib/info";
    import CustomRenderer from "../CustomRenderer.svelte";
    import { IconEmail } from "$lib/icons";
    import CommentSection from "../CommentSection.svelte";
    import { typeText } from "$lib/animation";
    import Card from "../ui/Card.svelte";
    import { visitedSections, markSectionVisited } from "$lib/visitedSections";

    const SECTION_INDEX = 4;
    const { apiCallStatus, commentList } = $props();

    $effect(() => {
        const rightItemsContainer = document.getElementById("right-items");
        const iconHolder = document.getElementById("icon-holder");
        const iconHolders = document.querySelectorAll('.icon-holder');

        if (!rightItemsContainer || !iconHolder) {
            return;
        }

        if ($visitedSections.has(SECTION_INDEX)) {
            rightItemsContainer.style.opacity = "1";
            iconHolder.classList.add("show");
            iconHolders.forEach((icon) => {
                icon.classList.add('show');
            });
            return;
        }

        typeText(
            rightItemsContainer,
            () => {
                iconHolder.classList.add("show");
            },
            20
        );

        // Animate icons one by one
        iconHolders.forEach((icon, index) => {
            setTimeout(() => {
                icon.classList.add('show');
                if (index === iconHolders.length - 1) {
                    markSectionVisited(SECTION_INDEX);
                }
            }, index * 100);
        });
    });
</script>

<div id="contact">
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
        <a href="mailto:{info.email}" class="email-link">
            <Card class="ContactItem">
                <div id="icon-holder" class="contact-icon-holder">
                    <CustomRenderer htmlString={IconEmail} />
                </div>
                <div id="right-items" class="right-items">
                    <p>Email</p>
                    <p class="label">{info.email}</p>
                </div>
            </Card>
        </a>
    </div>
    <div class="separator-text">
        <h2>Or Write Anonymously</h2>
    </div>
    <CommentSection {apiCallStatus} {commentList} />
</div>

<style>
    .email-link {
        text-decoration: none;
        color: inherit;
    }

    :global(.ContactItem) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 !important;
    }

    .right-items .label {
        font-size: 1rem;
        color: var(--text2);
    }

    .ContactPage {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin-bottom: 2rem;
        gap: 2rem;
    }

    @media screen and (max-width: 1270px) {
        .ContactPage {
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

    .separator-text h2 {
        font-size: 1.2rem;
    }

    .icons {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    @media screen and (max-width: 1270px) {
        .icons {
            margin-bottom: 1rem;
        }
    }

    :global(.icon-holder) {
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease-in-out;
    }

    :global(.icon-holder.show) {
        opacity: 1;
        transform: scale(1);
    }

    :global(.icon) {
        width: 3rem;
        height: 3rem;
        transition: all 0.5s ease-in-out;
    }

    :global(.icon:hover) {
        transform: scale(1.1);
    }

    :global(.contact-icon-holder .icon) {
        width: 3rem;
        height: 3rem;
    }

    @media screen and (max-width: 900px) {
        :global(.icon) {
            width: 2.5rem !important;
            height: 2.5rem !important;
        }

        :global(.contact-icon-holder .icon) {
            width: 2.5rem !important;
            height: 2.5rem !important;
        }
    }
</style>
