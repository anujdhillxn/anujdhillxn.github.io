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
            <button class="btn">
                <a href={info.cvLink}>Download CV</a>
            </button>
        </div>
    </div>
</div>

<style>
    .ImageSection {
        text-align: center;
        width: 100%;
        .about-info {
            margin-left: 2rem;
            h4 {
                font-size: 2rem;
            }
        }
        @media screen and (max-width: 1000px) {
            .about-info {
                margin-left: 0;
                margin-top: 1rem;
                h4 {
                    font-size: 2rem;
                }
            }
        }
    }
    .btn {
        padding: 1rem 2rem;
        background-color: var(--primary2);
        outline: none;
        border: none;
        font-family: inherit;
        font-size: inherit;
        color: var(--text1);
        text-transform: uppercase;
        cursor: pointer;
        margin-top: 1rem;
        position: relative;
        transition: all 0.8s ease-in-out;
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
