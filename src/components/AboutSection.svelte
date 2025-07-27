<script>
    import CustomRenderer from "./CustomRenderer.svelte";
    import Title from "./Title.svelte";
    import { info } from "$lib/info";
</script>

<div id="about">
    <Title title={"About Me"} span={"About Me"} />
    <div class="ImageSection">
        <div class="about-info">
            <h4>
                Hey there, I am <span> Anuj</span>
            </h4>
            <CustomRenderer htmlString={info.about} />
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
</style>
