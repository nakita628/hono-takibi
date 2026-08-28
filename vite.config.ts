import { defineConfig } from 'vite-plus'

export default defineConfig({
  // Single source of truth for formatting style. Vite+ merges this root config into every
  // workspace config, so `packages/hono-takibi` and `test` inherit these options and only
  // declare what is specific to them.
  //
  // Do not add `fmt.ignorePatterns` here: it is inherited too, and a root-relative pattern
  // such as `packages/**` makes the workspaces' own `vp check` exclude every file.
  fmt: {
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
