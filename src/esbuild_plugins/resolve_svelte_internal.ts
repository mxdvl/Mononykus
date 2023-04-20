import type { Plugin } from "https://deno.land/x/esbuild@v0.17.16/mod.js";

const svelte_internal = await fetch(
	"https://cdn.jsdelivr.net/npm/svelte@3.58.0/internal/index.mjs",
);
const svelte_internal_src = await svelte_internal.text();

export const resolve_svelte_internal: Plugin = {
	name: "svelte/internal",
	setup(build) {
		build.onResolve({ filter: /^svelte(\/internal)?$/ }, () => {
			return {
				path: "svelte/internal",
				namespace: "svelte",
				external: false,
			};
		});

		build.onLoad({ filter: /.*/, namespace: "svelte" }, () => {
			return {
				contents: svelte_internal_src,
			};
		});
	},
};
