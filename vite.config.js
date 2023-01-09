/** @type {import('vite').UserConfig} */
export default {
	// 설정 옵션들
	root: './',
	build: {
		target: 'esnext',
		outDir: './dist',
	},
	server: {
		port: 3000,
	},
	preview: {
		port: 4000,
	},
};
