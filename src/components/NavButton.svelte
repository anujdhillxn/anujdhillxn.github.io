<script>
    const { toggleNavbar } = $props();
</script>

<div
    class="nav-btn"
    onclick={toggleNavbar}
    onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleNavbar();
        }
    }}
    role="button"
    tabindex="0"
>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
</div>

<style>
    .nav-btn {
        position: fixed;
        z-index: 4;
        right: 10%;
        top: 5%;
        width: 4rem;
        height: 4rem;
        display: none;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        @media screen and (max-width: 1000px) {
            display: block;
            .line {
                display: block;
            }
        }
    }
    .line {
        height: 0.4rem;
        width: 100%;
        background-color: var(--primary2);
        pointer-events: none;
        display: none;
        border-radius: 20px;
        &:not(:last-child) {
            margin-bottom: 0.5rem;
        }
    }
</style>
