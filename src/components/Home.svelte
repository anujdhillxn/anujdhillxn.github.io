<script lang="ts">
    import { API_URL, LOADED, LOADING, type Comment } from "$lib/api";
    import Content from "./Content.svelte";
    import Navbar from "./Navbar.svelte";
    import NavButton from "./NavButton.svelte";

    let hideNavbarInSmallerScreens = $state(true);
    let apiCallStatus = $state(LOADING);
    let commentList: Comment[] = $state([]);
    let views = $state("");
    const toggleNavbar = () => {
        hideNavbarInSmallerScreens = !hideNavbarInSmallerScreens;
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
        fetchData();
    });
</script>

<div class="home">
    <Navbar {apiCallStatus} {hideNavbarInSmallerScreens} {views} />
    <Content {commentList} {apiCallStatus} />
    <NavButton {toggleNavbar} />
</div>

<style>
    .home {
        height: 100vh;
        display: flex;
    }
</style>
