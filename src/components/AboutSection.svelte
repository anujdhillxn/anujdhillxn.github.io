<script>
    import CustomRenderer from "./CustomRenderer.svelte";
    import { info } from "$lib/info";
</script>

<div id="about">
    <div class="ImageSection">
        <div class="about-info">
            <h4>
                Hey there, I am <span> Anuj</span>
            </h4>
            <CustomRenderer htmlString={info.about} />
            <button class="btn">
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
