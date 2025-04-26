<script>
    const { title, span } = $props();
</script>

<div class="title">
    <h3>
        {title}
        <span>{span}</span>
    </h3>
</div>

<style>
    .title {
        text-transform: uppercase;
        font-size: 2rem;
        color: var(--text1);
        position: relative;
        letter-spacing: 2px;
        &::after {
            content: "";
            bottom: 0;
            position: absolute;
            left: 0;
            background-color: var(--primary2);
            width: 3rem;
            height: 0.4rem;
            border-radius: 50px;
        }
        &::before {
            content: "";
            bottom: 0;
            position: absolute;
            left: 0;
            background-color: var(--primary1);
            width: 6rem;
            height: 0.4rem;
            border-radius: 50px;
        }
        span {
            position: absolute;
            top: 20%;
            left: 0;
            font-size: 3rem;
            opacity: 0.07;
        }
    }
</style>
