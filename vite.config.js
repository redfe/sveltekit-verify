import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	esbuild: {
		// "Expected signal to be an instanceof AbortSignal" 対応。see: Expected signal to be an instanceof AbortSignal"
		keepNames: true
	}
};

export default config;
