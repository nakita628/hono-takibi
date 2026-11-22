import { defineConfig } from 'vite-plus'

export default defineConfig({
  // Single source of truth for formatting style. Vite+ merges this root config into every
  // workspace config, so `packages/hono-takibi` and `test` inherit these options and only
  // declare what is specific to them.
  //
  // `fmt.ignorePatterns` is inherited too, so a root-relative pattern such as `packages/**`
  // makes the workspaces' own `vp check` exclude every file: only patterns that mean the same
  // from any workspace (`**/…`) belong here.
  fmt: {
    // release-please writes the changelog in its own Markdown style and rewrites it on every
    // release; a format failure there would fail Test on main and stop the release.
    ignorePatterns: ['**/CHANGELOG.md'],
    printWidth: 100,
    singleQuote: true,
    semi: false,
    // The default "css" sensitivity cannot see Tailwind's whitespace utilities, so it would
    // rewrap the whitespace-pre-wrap error pane in website's Playground.vue and change its
    // rendering. Must live here: workspace-level fmt options are not picked up.
    htmlWhitespaceSensitivity: 'strict',
    sortPackageJson: true,
    experimentalSortImports: {},
  },
})
