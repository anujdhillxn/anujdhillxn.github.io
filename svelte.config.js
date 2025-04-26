// svelte.config.js
import adapter from "@sveltejs/adapter-static";

const config = {
    kit: {
        adapter: adapter({
            pages: "build", // output folder for static files
            assets: "build",
            fallback: null,
        }),
        paths: {
            base: "",
        },
        appDir: "internal",
    },
};

export default config;
