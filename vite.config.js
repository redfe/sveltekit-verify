import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	// Expected signal to be an instanceof AbortSignal 対策の試し
	// https://zenn.dev/merutin/articles/0a69e136a746e1
	build: {
		minify: 'terser',
		terserOptions: {
			// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
			mangle: false,
			sourceMap: true,
			// compress: false,
			// for airtable
			keep_classnames: /AbortSignal/,
			keep_fnames: /AbortSignal/,
			output: {
				beautify: true,
				indent_level: 1
			}
		}
	}
};

export default config;
