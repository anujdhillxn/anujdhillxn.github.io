<script lang="ts">
    import { typeText } from "$lib/animation";
    import { LOADED, API_URL } from "$lib/api";
    import { createSectionObserver } from "$lib/sectionObserver";

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
        const observer = createSectionObserver(
            [el],
            (element) => {
                typeText(element as HTMLElement, () => {});
            },
            0.2
        );
        return () => {
            observer.disconnect();
        };
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
            <button onclick={postComment} class="btn"> Send </button>
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
        .write-area {
            .inputtext {
                text-align: center;
                textarea {
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
            }
            .submit-button {
                text-align: center;
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
                }
                .btn:hover {
                    background-color: var(--background2);
                    color: var(--text2);
                }
            }
        }
        @media screen and (max-width: 1270px) {
            grid-template-columns: repeat(1, 1fr);
            .write-area {
                width: 100%;
                margin-bottom: 1rem;
            }
        }
        .display-area {
            height: 10rem;
            overflow-y: scroll;
            #comment-list {
                opacity: 0;
            }
            .comment {
                margin-bottom: 1rem;
                .comment-info {
                    p {
                        font-size: 0.8rem;
                        color: var(--text2);
                    }
                }
                .comment-body {
                    font-size: 1rem;
                    p {
                        margin: 1rem 0 0 0;
                    }
                }
            }
        }
    }
</style>
