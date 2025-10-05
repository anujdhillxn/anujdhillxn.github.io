<script lang="ts">
    import Button from "./Button.svelte";
    import { info } from "$lib/info";
    import { typeText } from "$lib/animation";
    import { createIonosphere } from "ions-ts";
    import { isDarkTheme } from "$lib/theme";
    import { visitedSections, markSectionVisited } from "$lib/visitedSections";

    const SECTION_INDEX = 0;
    let { showNavigationButtons } = $props();
    let ionosphereStarted = false;
    let ionosphereInstance: any = null;

    function startIonosphere() {
        if (!ionosphereStarted) {
            ionosphereStarted = true;
            const bgColor = getComputedStyle(document.body).backgroundColor;
            ionosphereInstance = createIonosphere('ions', {repaint: bgColor, trailMaxLength: 0});
            ionosphereInstance.start();
            showNavigationButtons?.();
        }
    }

    // React to theme changes
    $effect(() => {
        const isDark = $isDarkTheme;
        document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

        if (ionosphereInstance) {
            setTimeout(() => {
                const bgColor = getComputedStyle(document.body).backgroundColor;
                ionosphereInstance.updateConfig({repaint: bgColor});
            }, 50);
        }
    });

    $effect(() => {
        const leftHeader = document.getElementById("left-header");
        const aboutContent = document.getElementById("about-content");
        const rightHeader = document.getElementById("right-header");
        const linksContent = document.getElementById("links-content");
        const btn = document.getElementById("cv-btn");

        if (!leftHeader || !aboutContent || !rightHeader || !linksContent) return;

        if ($visitedSections.has(SECTION_INDEX)) {
            leftHeader.style.opacity = "1";
            aboutContent.style.opacity = "1";
            rightHeader.style.opacity = "1";
            linksContent.style.opacity = "1";
            if (btn) {
                btn.style.opacity = "1";
                startIonosphere();
            }
            return;
        }

        setTimeout(() => {
            // Type left section first
            typeText(leftHeader, () => {
                typeText(aboutContent, () => {
                    // Then type right section
                    typeText(rightHeader, () => {
                        typeText(linksContent, () => {
                            if (btn) {
                                btn.style.opacity = "1";
                                startIonosphere();
                            }
                            markSectionVisited(SECTION_INDEX);
                        }, 20);
                    }, 20);
                }, 20);
            }, 20);
        }, 1000);
    });
</script>

<div id="about">
    <div class="about-container">
        <div class="about-left">
            <div id="left-header" style="opacity: 0;">
                <h3>What I do</h3>
            </div>
            <div id="about-content" style="opacity: 0;">
                <p class="about-text">
                    I build things for the web.
                    <br /> Backend, frontend, whatever works.
                    <br /> Into AI, automation, and clean UX.
                    <br /> Scroll down to see my work.
                </p>
            </div>
        </div>
        <div class="about-right">
            <div id="right-header" style="opacity: 0;">
                <h3>Know me better</h3>
            </div>
            <div id="links-content" style="opacity: 0;">
                <p>
                    <a href="https://www.imdb.com/title/tt2560140/" target="_blank" rel="noreferrer">Watch this</a>
                    <br /><a href="https://www.google.com/maps/place/cult+indiranagar+6th+main/data=!4m2!3m1!1s0x3bae1792bc4dcc21:0x4a05ef69eabd2b18?sa=X&ved=1t:242&ictx=111" target="_blank" rel="noreferrer">Come here</a>
                    <br /><a href="https://open.spotify.com/blend/taste-match/fd74444c446e314f?si=3IfrrGXtQeqGSwvBBKIfWg&fallback=getapp&blendDecoration=5f9c38d2" target="_blank" rel="noreferrer">Blend?</a>
                    <br /><a href="https://github.com/anujdhillxn/lucive" target="_blank" rel="noreferrer">Contribute</a>
                    <br /><a href="https://store.steampowered.com/app/291550/Brawlhalla/" target="_blank" rel="noreferrer">2s?</a>
                </p>
            </div>
        </div>
    </div>
    <div id="cv-btn" class="cv-button-container" style="opacity: 0; transition: opacity 0.5s ease-in-out;">
        <Button href={info.cvLink}>Download CV</Button>
    </div>
</div>

<style>
    .about-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        width: 100%;
    }

    .about-left {
        display: flex;
        flex-direction: column;
    }

    .about-left h3,
    .about-right h3 {
        margin: 0 0 0.5rem 0;
        font-weight: 600;
        color: var(--text1);
    }

    .about-right {
        display: flex;
        flex-direction: column;
        align-items: flex-left;
        text-align: left;
    }

    @media (max-width: 768px) {
        .about-container {
            grid-template-columns: 1fr;
        }
    }

    .about-text,
    .about-right p {
        margin: 0;
        color: var(--text2);
        font-size: 1.125rem;
        line-height: 1.8;
    }

    .about-right a {
        color: var(--primary2);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .about-right a:hover {
        color: var(--primary1);
        text-decoration: underline;
    }

    .cv-button-container {
        display: flex;
        justify-content: flex-end;
        margin-top: 2rem;
    }
</style>
