<script lang="ts">
    import { createIonosphere } from "ions-ts";
    import { API_URL, LOADED, LOADING, type Comment } from "$lib/api";
    import { info } from "$lib/info";
    import AboutSection from "../components/AboutSection.svelte";
    import ContactSection from "../components/ContactSection.svelte";
    import Divider from "../components/Divider.svelte";
    import ExperienceSection from "../components/ExperienceSection.svelte";
    import ProjectsSection from "../components/ProjectsSection.svelte";
    import SkillsSection from "../components/SkillsSection.svelte";

    let apiCallStatus = $state(LOADING);
    let commentList: Comment[] = $state([]);
    let views = $state("");

    let selectedSkills = $state(info.allSkills);
    const clickSkill = (skill: string) => {
        if (skill === "All") {
            selectedSkills = info.allSkills;
            return;
        }
        if (selectedSkills.length === info.allSkills.length) {
            selectedSkills = [skill];
            return;
        }
        if (selectedSkills.includes(skill)) {
            selectedSkills = selectedSkills.filter((item) => item !== skill);
        } else {
            selectedSkills = [...selectedSkills, skill];
        }
    };

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

    $effect(() => {
        const animate = createIonosphere('ions', {repaint: 'var(--background1)'});
        animate();
        fetchData();
    })
</script>

<canvas id='ions'></canvas>
<div class="content">
    <AboutSection />
    <SkillsSection {selectedSkills} {clickSkill} />
    <Divider />
    <ExperienceSection {selectedSkills} />
    <Divider />
    <ProjectsSection {selectedSkills} />
    <Divider />
    <ContactSection {commentList} {apiCallStatus} />
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
        height: 100%;
        padding: 12vh 20% 12vh 20%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    @media screen and (max-width: 600px) {
        .content {
            padding: 12vh 1rem 12vh 1rem;
        }
    }
    :global(p, li) {
        color: var(--text3);
    }
</style>
