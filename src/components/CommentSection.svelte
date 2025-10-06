<script lang="ts">
    import { typeText } from "$lib/animation";
    import { LOADED, API_URL } from "$lib/api";
    import ChargeWrapper from "./cursor/ChargeWrapper.svelte";
    import Button from "./ui/Button.svelte";

    const { apiCallStatus, commentList } = $props();
    let content = $state("");
    let author = $state("");

    const postComment = async () => {
        try {
            const resp = await fetch(`${API_URL}comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ author, content }),
            });

            const data = await resp.json();

            if (resp.ok) {
                alert(data.message);
                content = ""; // Clear the content field
                author = ""; // Clear the author field
            } else {
                throw new Error(data.message || "Failed to post comment");
            }
        } catch (e) {
            // @ts-ignore
            alert(e.message);
        }
    };

    $effect(() => {
        if (apiCallStatus !== LOADED) return;
        const el = document.getElementById("comment-list");
        if (!el) return;
        typeText(el as HTMLElement, () => {});
    });
</script>

<div class="comment-box">
    <div class="write-area">
        <div class="inputtext">
            <textarea
                maxlength="200"
                id="content"
                name="content"
                placeholder="Write comment..."
                bind:value={content}
            ></textarea>
            <textarea
                maxlength="200"
                id="author"
                name="author"
                placeholder="Write your name..."
                bind:value={author}
            ></textarea>
        </div>
        <div class="submit-button">
            <ChargeWrapper charge={-1}>
                <Button onclick={postComment}>Send</Button>
            </ChargeWrapper>
        </div>
    </div>
    {#if apiCallStatus === LOADED}
        <div class="display-area">
            <div id="comment-list">
                {#each commentList as item}
                    <div class="comment">
                        <div class="comment-body">
                            <p>{item.content}</p>
                        </div>
                        <div class="comment-info">
                            <span class="comment-author">{item.author}</span>
                            <p>{item.dateAdded}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .comment-box {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }

    .write-area .inputtext {
        text-align: center;
    }

    .write-area .inputtext textarea {
        width: 100%;
        resize: none;
        box-sizing: border-box;
        border: none;
        background-color: var(--background2);
        color: var(--text1);
        margin-bottom: 0.5rem;
        font-family: inherit;
        padding: 0.5rem;
        font-size: 1rem;
    }

    .write-area .submit-button {
        text-align: center;
    }

    @media screen and (max-width: 1270px) {
        .comment-box {
            grid-template-columns: repeat(1, 1fr);
        }

        .comment-box .write-area {
            width: 100%;
            margin-bottom: 1rem;
        }
    }

    .display-area {
        height: 10rem;
        overflow-y: scroll;
    }

    .display-area #comment-list {
        opacity: 0;
    }

    .display-area .comment {
        margin-bottom: 1rem;
    }

    .display-area .comment .comment-info p {
        font-size: 0.8rem;
        color: var(--text2);
    }

    .display-area .comment .comment-body {
        font-size: 1rem;
    }

    .display-area .comment .comment-body p {
        margin: 1rem 0 0 0;
    }
</style>
