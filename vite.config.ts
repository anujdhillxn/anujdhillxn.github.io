import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		// ions-ts ships ESM in a .js file without "type":"module", so Node's
		// CJS loader chokes on `export` during SSR. Let Vite transform it instead.
		noExternal: ['ions-ts']
	}
});
