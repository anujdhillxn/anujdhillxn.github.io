<script lang="ts">
    import CustomRenderer from "./CustomRenderer.svelte";
    import { info } from "$lib/info";
    import { typeText } from "$lib/animation";
    import { createIonosphere } from "ions-ts";
    import { isDarkTheme } from "$lib/theme";

    let { hasBeenVisited, onAnimationComplete, showNavigationButtons } = $props();
    let ionosphereStarted = false;
    let ionosphereInstance: any = null;

    function startIonosphere() {
        if (!ionosphereStarted) {
            ionosphereStarted = true;
            const bgColor = getComputedStyle(document.body).backgroundColor;
            ionosphereInstance = createIonosphere('ions', {repaint: bgColor});
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
        const aboutContent = document.getElementById("about-content");
        const btn = document.getElementById("cv-btn");

        if (!aboutContent) return;

        if (hasBeenVisited) {
            aboutContent.style.opacity = "1";
            if (btn) {
                btn.style.opacity = "1";
                startIonosphere();
            }
            return;
        }

        typeText(aboutContent, () => {
            if (btn) {
                btn.style.opacity = "1";
                startIonosphere();
            }
            onAnimationComplete?.();
        }, 20);
    });
</script>

<div id="about">
    <div class="ImageSection">
        <div class="about-info">
            <div id="about-content" style="opacity: 0;">
                <h4>
                    Hey there, I am <span> Anuj</span>
                </h4>
                <CustomRenderer htmlString={info.about} />
            </div>
            <button id="cv-btn" class="btn" style="opacity: 0; transition: opacity 0.5s ease-in-out;">
                <a href={info.cvLink}>Download CV</a>
            </button>
        </div>
    </div>
</div>

<style>
    .ImageSection {
        width: 100%;
        .about-info {
            h4 {
                font-size: 2rem;
                margin: 0;
            }
        }
    }
    .btn {
        padding: 1.5rem 3rem;
        background-color: var(--primary2);
        outline: none;
        border: none;
        font-family: inherit;
        font-size: inherit;
        color: var(--text1);
        text-transform: uppercase;
        cursor: pointer;
        position: relative;
        transition: all 0.8s ease-in-out;
        margin-top: 1.5rem;
        &::after {
            position: absolute;
            content: "";
            width: 0;
            height: 0.3rem;
            left: 0;
            bottom: 0;
            background-color: var(--primary2);
            transition: all 0.4s ease-in-out;
        }
        &:hover::after {
            width: 100%;
        }
        a {
            text-decoration: none;
            color: var(--text1);
        }
    }
    .btn:hover {
        background-color: var(--background2);
        color: var(--text2);
    }
</style>
