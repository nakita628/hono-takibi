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
- `basePath` must start with `/`. `client` must be an identifier and `import` a module specifier.

## Full reference

```ts
import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: 'openapi.yaml',

  output: './src/routes.ts', // single-file mode; with template.define, the app entry (an index.ts path, default ./src/index.ts)
  basePath: '/api',
  readonly: true,
  // format: {}, // oxfmt FormatConfig

  template: {
    test: true,
    routeHandler: false, // true: RouteHandler exports
    define: false, // true: defineOpenAPIRoute output
    pathAlias: '@/',
    testFramework: 'vitest', // "vitest" | "vite-plus" | "bun"
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

  routes: {
    output: './src/routes',
    split: true,
    import: '@packages/routes',
  },

  webhooks: {
    output: './src/webhooks',
    split: true,
    import: '@packages/webhooks',
  },

  // `output` (single file) and the per-type fields below (split) are mutually exclusive.
  // `exportTypes` applies only to schemas / parameters / headers / mediaTypes.
  components: {
    output: './src/components/index.ts',

    schemas: {
      output: './src/schemas',
      exportTypes: true,
      split: true,
      import: '../schemas',
    },
    responses: {
      output: './src/responses',
      split: true,
      import: '../responses',
    },
    parameters: {
      output: './src/parameters',
      exportTypes: true,
      split: true,
      import: '../parameters',
    },
    examples: {
      output: './src/examples',
      split: true,
      import: '../examples',
    },
    requestBodies: {
      output: './src/requestBodies',
      split: true,
      import: '../requestBodies',
    },
    headers: {
      output: './src/headers',
      exportTypes: true,
      split: true,
      import: '../headers',
    },
    securitySchemes: {
      output: './src/securitySchemes',
      split: true,
      import: '../securitySchemes',
    },
    links: {
      output: './src/links',
      split: true,
      import: '../links',
    },
    callbacks: {
      output: './src/callbacks',
      split: true,
      import: '../callbacks',
    },
    pathItems: {
      output: './src/pathItems',
      split: true,
      import: '../pathItems',
    },
    mediaTypes: {
      output: './src/mediaTypes',
      exportTypes: true,
      split: true,
      import: '../mediaTypes',
    },
  },

  type: {
    output: './src/types.ts',
    readonly: true,
  },

  rpc: {
    output: './src/rpc.ts',
    import: '../lib',
    client: 'client',
    parseResponse: true,
    docs: false, // operation summary/description as JSDoc
  },

  swr: {
    output: './src/swr.ts',
    import: '../lib',
    client: 'client',
  },
  'tanstack-query': {
    output: './src/tanstack-query.ts',
    import: '../lib',
    client: 'client',
  },
  'preact-query': {
    output: './src/preact-query.ts',
    import: '../lib',
    client: 'client',
  },
  'solid-query': {
    output: './src/solid-query.ts',
    import: '../lib',
    client: 'client',
  },
  'vue-query': {
    output: './src/vue-query.ts',
    import: '../lib',
    client: 'client',
  },
  'svelte-query': {
    output: './src/svelte-query.ts',
    import: '../lib',
    client: 'client',
  },
  'angular-query': {
    output: './src/angular-query.ts',
    import: '../lib',
    client: 'client',
  },

  test: {
    output: './src/test.ts',
    import: '.',
    testFramework: 'vitest', // "vitest" | "vite-plus" | "bun"
  },

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
