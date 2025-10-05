<script lang="ts">
    import { createIonosphere } from "ions-ts";
    import { API_URL, LOADED, LOADING, type Comment } from "$lib/api";
    import { info } from "$lib/info";
    import AboutSection from "../components/AboutSection.svelte";
    import ContactSection from "../components/ContactSection.svelte";
    import ExperienceSection from "../components/ExperienceSection.svelte";
    import ProjectsSection from "../components/ProjectsSection.svelte";
    import SkillsSection from "../components/SkillsSection.svelte";
    import Section from "../components/Section.svelte";
    import Navbar from "../components/Navbar.svelte";
    // import ThemeSwitcher from "../components/ThemeSwitcher.svelte";

    let apiCallStatus = $state(LOADING);
    let commentList: Comment[] = $state([]);
    let views = $state("");
    let currentSection = $state(0);
    let isNavigating = $state(false);
    let showNavigation = $state(false);

    export function showNavigationButtons() {
        showNavigation = true;
    }

    const fetchData = async () => {
        try {
            apiCallStatus = LOADING;
            const resp = await fetch(API_URL);
            const json = await resp.json();
            commentList = json.commentList;
            views = json.views;
            apiCallStatus = LOADED;
        } catch (e) {
            // @ts-ignore
            apiCallStatus = e.message;
        }
    };

    const goDown = () => {
        if (isNavigating || currentSection >= 4) return;
        isNavigating = true;
        currentSection++;
        setTimeout(() => { isNavigating = false; }, 500);
    };

    const goUp = () => {
        if (isNavigating || currentSection <= 0) return;
        isNavigating = true;
        currentSection--;
        setTimeout(() => { isNavigating = false; }, 500);
    };

    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (isNavigating) return;

        if (e.deltaY > 0) {
            goDown();
        } else if (e.deltaY < 0) {
            goUp();
        }
    };

    $effect(() => {
        fetchData();

        const content = document.querySelector('.content');
        content?.addEventListener('wheel', handleWheel as any, { passive: false });

        return () => {
            content?.removeEventListener('wheel', handleWheel as any);
        };
    })
</script>

<canvas id='ions'></canvas>
<div class="navbar-container">
    {#if showNavigation}
        <Navbar {currentSection} {goUp} {goDown} />
    {/if}
</div>
<div class="content">
    {#key currentSection}
        {#if currentSection === 0}
            <Section title="About">
                <AboutSection {showNavigationButtons} />
            </Section>
        {:else if currentSection === 1}
            <Section title="Skills">
                <SkillsSection />
            </Section>
        {:else if currentSection === 2}
            <Section title="Experience">
                <ExperienceSection />
            </Section>
        {:else if currentSection === 3}
            <Section title="Projects">
                <ProjectsSection />
            </Section>
        {:else if currentSection === 4}
            <Section title="Contact">
                <ContactSection {commentList} {apiCallStatus} />
            </Section>
        {/if}
    {/key}
</div>

<style>
    #ions {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .navbar-container {
        height: 10vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1rem;
    }

    @media screen and (max-width: 768px) {
        .navbar-container {
            padding: 0;
        }
    }

    .content {
        height: 90vh;
        overflow: hidden;
    }
    :global(p, li) {
        color: var(--text3);
    }
</style>