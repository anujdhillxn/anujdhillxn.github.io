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
    import NavigationButton from "../components/NavigationButton.svelte";

    let apiCallStatus = $state(LOADING);
    let commentList: Comment[] = $state([]);
    let views = $state("");
    let currentSection = $state(0);
    let isAnimating = $state(false);

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
        if (isAnimating || currentSection >= 4) return;
        isAnimating = true;
        currentSection++;
        setTimeout(() => { isAnimating = false; }, 500);
    };

    const goUp = () => {
        if (isAnimating || currentSection <= 0) return;
        isAnimating = true;
        currentSection--;
        setTimeout(() => { isAnimating = false; }, 500);
    };

    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (isAnimating) return;

        if (e.deltaY > 0) {
            goDown();
        } else if (e.deltaY < 0) {
            goUp();
        }
    };

    $effect(() => {
        const animate = createIonosphere('ions', {repaint: 'var(--background1)'});
        animate();
        fetchData();

        const content = document.querySelector('.content');
        content?.addEventListener('wheel', handleWheel as any, { passive: false });

        return () => {
            content?.removeEventListener('wheel', handleWheel as any);
        };
    })
</script>

<canvas id='ions'></canvas>
<div class="content">
    {#key currentSection}
        {#if currentSection === 0}
            <Section title="About">
                <AboutSection />
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

<div class="navigation-arrows">
    <div class="buttons-row">
        <NavigationButton onclick={(e: MouseEvent) => { e.stopPropagation(); goUp(); }} disabled={currentSection === 0}>
            ▲
        </NavigationButton>
        <NavigationButton onclick={(e: MouseEvent) => { e.stopPropagation(); goDown(); }} disabled={currentSection === 4}>
            ▼
        </NavigationButton>
    </div>
    <p class="nav-hint">{currentSection + 1}/5</p>
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
    .content {
        height: 100vh;
        overflow: hidden;
    }
    .navigation-arrows {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        z-index: 100;
    }
    .buttons-row {
        display: flex;
        gap: 0.5rem;
    }
    .nav-hint {
        font-size: 0.75rem;
        color: var(--text3);
        margin: 0.25rem 0 0 0;
        opacity: 0.6;
    }
    :global(p, li) {
        color: var(--text3);
    }
</style>