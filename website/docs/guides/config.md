---
title: Configuration
prev:
  text: 'Docs'
  link: '/docs'
next:
  text: 'Vendor'
  link: '/docs/guides/vendor'
---

# Configuration

## Configuration File

Create `hono-takibi.config.ts`:

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

To run a config file that lives somewhere else, pass `--config`. Paths inside it still
resolve against the current directory:

```sh
npx hono-takibi --config config/api.config.ts
```

## Full Configuration

::: code-group

```ts
// hono-takibi.config.ts
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
    output: './src/rpc',
    import: '../lib',
    split: true,
    client: 'client',
    parseResponse: true,
    docs: false, // operation summary/description as JSDoc
  },

  swr: {
    output: './src/swr',
    import: '../lib',
    split: true,
    client: 'client',
  },
  'tanstack-query': {
    output: './src/tanstack-query',
    import: '../lib',
    split: true,
    client: 'client',
  },
  'preact-query': {
    output: './src/preact-query',
    import: '../lib',
    split: true,
    client: 'client',
  },
  'solid-query': {
    output: './src/solid-query',
    import: '../lib',
    split: true,
    client: 'client',
  },
  'vue-query': {
    output: './src/vue-query',
    import: '../lib',
    split: true,
    client: 'client',
  },
  'svelte-query': {
    output: './src/svelte-query',
    import: '../lib',
    split: true,
    client: 'client',
  },
  'angular-query': {
    output: './src/angular-query',
    import: '../lib',
    split: true,
    client: 'client',
  },

  test: {
    output: './src/test.ts',
    import: '.',
    testFramework: 'vitest', // "vitest" | "vite-plus" | "bun"
  },

  mock: {
    output: './src/mock.ts',
    useExamples: true,
    locale: 'en',
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
