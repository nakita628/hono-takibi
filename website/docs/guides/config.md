---
title: Configuration
prev:
  text: 'Getting Started'
  link: '/docs'
next:
  text: 'Template'
  link: '/docs/guides/template'
---

# Configuration

## Config file

Create `hono-takibi.config.ts` and run the CLI with no arguments:

```ts
import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: 'openapi.yaml',
  output: './src/routes.ts',
})
```

::: code-group

```sh [npm]
npx hono-takibi
```

```sh [yarn]
yarn hono-takibi
```

```sh [pnpm]
pnpm hono-takibi
```

```sh [bun]
bunx hono-takibi
```

:::

Every generator is opted in by adding its section to the config. See the [full reference](#full-reference) below.

To run a config file from another location, pass `--config`. Paths inside it still resolve against the current directory:

```sh
npx hono-takibi --config config/api.config.ts
```

## Watch mode

```sh
npx hono-takibi --watch
```

Reruns the config whenever the input documents or the config itself change, and keeps watching when a run fails.
The whole directory of the input document is watched, so TypeSpec imports and external `$ref` files trigger a rerun too.

Prefer a Vite dev server? Use the [Vite plugin](/docs/guides/vite-plugin) instead.

## Rules

- Every generator needs its own `output`. Two generators writing to one file is an error.
- `output` (single file) and `routes` (split) are mutually exclusive. Same for `components.output` and the per-type `components.*` sections.
- A `split` directory belongs to the generator: its `.ts` files are removed before each run. Keep hand-written code elsewhere.
- `basePath` must start with `/`. `client.import` and every `package` must be module specifiers.
- Generated files import one another relatively, under `pathAlias` when the target is in the directory of the app entry, and by the target's `package` from another package. A target in another package without a `package` is an error.
- The `client` block needs `template`.
- `rpc` and the hooks need the `client` block: they import the generated client, relatively or by `client.package` from another package.

## Full reference

```ts
import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: 'openapi.yaml',

  output: './src/routes.ts', // single-file mode; with template.define, the app entry (an index.ts path, default ./src/index.ts)
  basePath: '/api',
  readonly: true,
  // Import prefix the generated files of this package use for one another, `@/routes` instead
  // of `../routes`. Map it in tsconfig (`"@/*": ["./src/*"]`). Files written into another
  // package never use it.
  pathAlias: '@/',
  // format: {}, // oxfmt FormatConfig

  template: {
    routeHandler: false, // true: RouteHandler exports
    define: false, // true: defineOpenAPIRoute output
    split: false, // true: one exported group per first path segment
  },

  exportSchemas: true,
  exportSchemasTypes: true,
  exportResponses: true,
  exportParameters: true,
  exportParametersTypes: true,
  exportExamples: true,
  exportRequestBodies: true,
  exportHeaders: true,
  exportHeadersTypes: true,
  exportSecuritySchemes: true,
  exportLinks: true,
  exportCallbacks: true,
  exportPathItems: true,
  exportMediaTypes: true,
  exportMediaTypesTypes: true,

  // How generated files import one another: relatively inside a package, under `pathAlias`
  // when the target is in the directory of the app entry, and by `package` from another
  // package (the nearest package.json above an output delimits its package).
  routes: {
    output: './src/routes',
    split: true,
    // package: '@repo/routes', // the name other packages import these routes by
  },

  webhooks: {
    output: './src/webhooks',
    split: true,
    // package: '@repo/webhooks',
  },

  // `output` (single file) and the per-type fields below (split) are mutually exclusive.
  // `exportTypes` applies only to schemas / parameters / headers / mediaTypes.
  // `package` names the package an output is written into, for the files of other packages
  // that import it; leave it out while everything is in one package.
  components: {
    output: './src/components/index.ts',

    schemas: {
      output: './src/schemas',
      exportTypes: true,
      split: true,
      // package: '@repo/schemas',
    },
    responses: {
      output: './src/responses',
      split: true,
      // package: '@repo/responses',
    },
    parameters: {
      output: './src/parameters',
      exportTypes: true,
      split: true,
      // package: '@repo/parameters',
    },
    examples: {
      output: './src/examples',
      split: true,
      // package: '@repo/examples',
    },
    requestBodies: {
      output: './src/requestBodies',
      split: true,
      // package: '@repo/requestBodies',
    },
    headers: {
      output: './src/headers',
      exportTypes: true,
      split: true,
      // package: '@repo/headers',
    },
    securitySchemes: {
      output: './src/securitySchemes',
      split: true,
      // package: '@repo/securitySchemes',
    },
    links: {
      output: './src/links',
      split: true,
      // package: '@repo/links',
    },
    callbacks: {
      output: './src/callbacks',
      split: true,
      // package: '@repo/callbacks',
    },
    pathItems: {
      output: './src/pathItems',
      split: true,
      // package: '@repo/pathItems',
    },
    mediaTypes: {
      output: './src/mediaTypes',
      exportTypes: true,
      split: true,
      // package: '@repo/mediaTypes',
    },
  },

  type: {
    output: './src/types.ts',
    readonly: true,
  },

  // Hono client of the scaffolded app (needs `template`). `rpc` and the hooks import it:
  // relatively (or by `pathAlias`) inside this package, by `package` from another package.
  client: {
    output: './src/lib/client.ts',
    // What `hc()` is created with. Pick one:
    baseUrl: '/', // same origin (default)
    // baseUrl: 'http://localhost:3000', // one fixed URL
    // baseUrl: { env: 'VITE_API_URL' }, // Vite: import.meta.env.VITE_API_URL, '/' when unset
    // baseUrl: { env: 'API_URL', source: 'process.env' }, // Node.js: process.env.API_URL, '/' when unset
    // baseUrl: { env: 'API_URL', import: '@/env', name: 'env' }, // your validated env module: env.API_URL
    //
    // Monorepo: the client in a package of its own.
    // import: '@repo/server', // where the client imports the app's type from (default: relative, or pathAlias)
    // package: '@repo/client', // what files written into other packages import the client by
  },

  rpc: {
    output: './src/rpc.ts',
    parseResponse: true,
    docs: false, // operation summary/description as JSDoc
  },

  swr: { output: './src/swr.ts' },
  'tanstack-query': { output: './src/tanstack-query.ts' },
  'preact-query': { output: './src/preact-query.ts' },
  'solid-query': { output: './src/solid-query.ts' },
  'vue-query': { output: './src/vue-query.ts' },
  'svelte-query': { output: './src/svelte-query.ts' },
  'angular-query': { output: './src/angular-query.ts' },

  mock: {
    output: './src/mock.ts',
    useExamples: true, // true: response examples | 'all': also schema/property examples | false
    locale: 'en',
    seed: 42, // optional: same body per route on every request (snapshot-friendly)
    delay: false,
    arrayMin: 1,
    arrayMax: 10,
  },

  docs: {
    output: './docs/api.md',
    entry: 'src/index.ts',
    curl: false, // true: curl commands (requires baseUrl); false: hono request
    baseUrl: 'http://localhost:3000',
  },
})
```
