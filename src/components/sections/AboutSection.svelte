<script lang="ts">
    import Button from "../ui/Button.svelte";
    import ChargeWrapper from "../cursor/ChargeWrapper.svelte";
    import { info } from "$lib/info";
</script>

<div id="about">
    <div class="about-container">
        <div class="about-left">
            <h3>What I do</h3>
        <p class="about-text">
            I am fullstack software engineer.
            <br /> I enjoy solving problems and making products that works well for both the end users and my team.
            <br /> If this interests you, I am always open to discussing new opportunities.
        </p>
        </div>
        <div class="about-right">
            <h3>Know me better</h3>
            <p>
                <ChargeWrapper charge={-1} enableRotation={true}>
                    <a href="https://www.imdb.com/title/tt2560140/" target="_blank" rel="noreferrer">Watch this</a>
                </ChargeWrapper>
                <br />
                <ChargeWrapper charge={-1} enableRotation={true}>
                    <a href="https://www.google.com/maps/place/cult+indiranagar+6th+main/data=!4m2!3m1!1s0x3bae1792bc4dcc21:0x4a05ef69eabd2b18?sa=X&ved=1t:242&ictx=111" target="_blank" rel="noreferrer">Come here</a>
                </ChargeWrapper>
                <br />
                <ChargeWrapper charge={-1} enableRotation={true}>
                    <a href="https://open.spotify.com/blend/taste-match/fd74444c446e314f?si=3IfrrGXtQeqGSwvBBKIfWg&fallback=getapp&blendDecoration=5f9c38d2" target="_blank" rel="noreferrer">Blend?</a>
                </ChargeWrapper>
                <br />
                <ChargeWrapper charge={-1} enableRotation={true}>
                    <a href="https://github.com/anujdhillxn/lucive" target="_blank" rel="noreferrer">Contribute</a>
                </ChargeWrapper>
                <br />
                <ChargeWrapper charge={-1} enableRotation={true}>
                    <a href="https://store.steampowered.com/app/291550/Brawlhalla/" target="_blank" rel="noreferrer">2s?</a>
                </ChargeWrapper>
            </p>
        </div>
    </div>
    <div class="cv-button-container">
        <ChargeWrapper charge={-1}>
            <Button href={info.cvLink}>Download CV</Button>
        </ChargeWrapper>
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
        color: var(--text2);
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
        color: var(--text3);
        font-size: 1.125rem;
        line-height: 1.8;
    }

    .about-right a {
        color: var(--negative2);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .about-right a:hover {
        color: var(--negative1);
        text-decoration: underline;
    }

    .cv-button-container {
        display: flex;
        justify-content: flex-end;
        margin-top: 2rem;
    }
</style>
