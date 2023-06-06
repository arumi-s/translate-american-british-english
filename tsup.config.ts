import type { Options } from 'tsup';

export const tsup: Options = {
	splitting: true,
	clean: true,
	dts: true,
	format: ['cjs', 'esm'],
	minify: true,
	bundle: true,
	skipNodeModulesBundle: true,
	entryPoints: ['src/index.ts'],
	external: [],
	target: 'es2018',
	outDir: 'dist',
	entry: ['src/**/index.ts', '!src/**/*.spec.ts'],
};
