<script lang="ts">
    import { info } from "$lib/info";
    import AboutSection from "./AboutSection.svelte";
    import ContactSection from "./ContactSection.svelte";
    import Divider from "./Divider.svelte";
    import ExperienceSection from "./ExperienceSection.svelte";
    import ProjectsSection from "./ProjectsSection.svelte";
    import SkillsSection from "./SkillsSection.svelte";

    const { commentList, apiCallStatus } = $props();

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
</script>

<div class="top-container">
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
    .top-container {
        padding: 5% 10% 10% 10%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>
