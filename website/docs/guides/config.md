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
    // package: '@packages/routes', // the name other packages import these routes by
  },

  webhooks: {
    output: './src/webhooks',
    split: true,
    // package: '@packages/webhooks',
  },

  // `output` (single file) and the per-type fields below (split) are mutually exclusive.
  // `exportTypes` applies only to schemas / parameters / headers / mediaTypes.
  // `package` names the package an output is written into, for the files of other packages
  // that import it; leave it out while everything is in one package.
  components: {
    output: './src/components/index.ts',
    // package: '@packages/components', // when src/components is a package of its own

    schemas: {
      output: './src/schemas',
      exportTypes: true,
      split: true,
      // package: '@packages/schemas',
    },
    responses: {
      output: './src/responses',
      split: true,
      // package: '@packages/responses',
    },
    parameters: {
      output: './src/parameters',
      exportTypes: true,
      split: true,
      // package: '@packages/parameters',
    },
    examples: {
      output: './src/examples',
      split: true,
      // package: '@packages/examples',
    },
    requestBodies: {
      output: './src/requestBodies',
      split: true,
      // package: '@packages/requestBodies',
    },
    headers: {
      output: './src/headers',
      exportTypes: true,
      split: true,
      // package: '@packages/headers',
    },
    securitySchemes: {
      output: './src/securitySchemes',
      split: true,
      // package: '@packages/securitySchemes',
    },
    links: {
      output: './src/links',
      split: true,
      // package: '@packages/links',
    },
    callbacks: {
      output: './src/callbacks',
      split: true,
      // package: '@packages/callbacks',
    },
    pathItems: {
      output: './src/pathItems',
      split: true,
      // package: '@packages/pathItems',
    },
    mediaTypes: {
      output: './src/mediaTypes',
      exportTypes: true,
      split: true,
      // package: '@packages/mediaTypes',
    },
  },

  type: {
    output: './src/types.ts',
    readonly: true,
  },

  // Hono client of the scaffolded app (needs `template`); `rpc` and the hooks import it.
  client: {
    output: './src/lib/client.ts',
    baseUrl: '/', // same origin (default); from the environment: { env: 'VITE_API_URL' }, { env: 'API_URL', source: 'process.env' }, { env: 'API_URL', import: '@/env' }
    // import: '@packages/server', // monorepo: where the app's type comes from
    // package: '@packages/client', // monorepo: what other packages import the client by
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
