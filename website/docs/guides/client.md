---
title: Client
prev:
  text: 'Template'
  link: '/docs/guides/template'
next:
  text: 'Mock'
  link: '/docs/guides/mock'
---

# Client

Generates the [Hono RPC client](https://hono.dev/docs/guides/rpc), typed wrappers around it, and hooks for your query library.

## Generated client

With [`template`](/docs/guides/template), a `client` block generates the client. `rpc` and the hooks import it on their own: the `client` block is the one place a client comes from.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  basePath: '/api',
  output: './src/routes.ts',
  template: { routeHandler: true },
  client: { output: './src/lib/client.ts' },
  rpc: { output: './src/rpc.ts' },
  'tanstack-query': { output: './src/hooks/query.ts' },
})
```

```ts
// src/lib/client.ts
import { hc } from 'hono/client'
import type { api } from '../index'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType('/').api
```

Imports are worked out from the output paths, and follow the top-level `pathAlias` inside the package of the app.

### Monorepo

When the client lives in a package of its own, name the module it imports the app from, and the package other packages import it by.

```ts
// apps/hono/hono-takibi.config.ts
export default defineConfig({
  input: 'openapi.yaml',
  output: 'src/index.ts',
  template: { define: true },
  client: {
    output: '../client/src/lib/client.ts',
    import: '@packages/server', // the client imports the app type from here (default: relative / alias)
    package: '@packages/client', // other packages import the client by this name
  },
  swr: { output: '../client/src/hooks/swr.ts' }, // same package as the client → '../lib'
  'tanstack-query': { output: '../web/src/api/hooks.ts' }, // another package → '@packages/client'
})
```

```ts
// apps/client/src/lib/client.ts
import { hc } from 'hono/client'
import type { api } from '@packages/server'
```

```ts
// apps/web/src/api/hooks.ts
import { client } from '@packages/client'
```

A package is what the nearest `package.json` above a generated file delimits. A file in the package of the client imports it relatively, as it does without `package`. `@packages/server` needs an `exports` (or `main`) entry that points at the app entry, `./src/index.ts` for example; no build step is needed for the types. The package of the hooks needs `hono` installed too: the generated hooks import from `hono/client`.

### Base URL

`baseUrl` is what the client is created with, `hc(baseUrl)`. It defaults to `'/'`: same-origin requests, which is what a frontend served by the app, or behind a dev proxy, wants.

| `baseUrl`                                   | Generated                             | When                                                                |
| ------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------- |
| `'/'` (default)                             | `hcWithType('/')`                     | Same origin                                                         |
| `'http://localhost:3000'`                   | `hcWithType('http://localhost:3000')` | One fixed URL, written into the file                                |
| `{ env: 'VITE_API_URL' }`                   | `import.meta.env.VITE_API_URL ?? '/'` | Vite build: the URL comes from `.env`, `/` when it is not set       |
| `{ env: 'API_URL', source: 'process.env' }` | `process.env.API_URL ?? '/'`          | Node.js: the URL comes from the environment, `/` when it is not set |
| `{ env: 'API_URL', import: '@/env' }`       | `env.API_URL`, imported from `@/env`  | A validated env module of yours (t3-env, valibot, zod): no fallback |

With `{ env }`, the variable is read once, when the client module is first imported. Vite only exposes variables prefixed `VITE_` to the browser. With `{ env, import }`, the client imports the object the module exports (`env` by default, `name` to pick another export) and reads the property named by `env`; because such a module validates its exports, the value is guaranteed and nothing stands in for it.

## Larger applications

`template.split: true` exports one group per first path segment, and one client per group.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  basePath: '/api',
  output: './src/routes.ts',
  template: { routeHandler: true, split: true },
  client: { output: './src/lib/client.ts' },
  rpc: { output: './src/rpc.ts' },
})
```

```ts
// src/index.ts
const app = new OpenAPIHono().basePath('/api')

export const api = app.openapi(getRoute, getRouteHandler)

export const vaults = app
  .openapi(getVaultsRoute, getVaultsRouteHandler)
  .openapi(postVaultsRoute, postVaultsRouteHandler)

export default app
```

```ts
// src/lib/client.ts
export const client = hcWithType('/').api

export const vaultsClient = hcVaultsWithType('/').api
```

| Path                      | Group      | Client           |
| ------------------------- | ---------- | ---------------- |
| `/vaults`, `/vaults/{id}` | `vaults`   | `vaultsClient`   |
| `/v2-public/ping`         | `v2Public` | `v2PublicClient` |
| `/`                       | `api`      | `client`         |

## RPC

```ts
export default defineConfig({
  input: 'openapi.yaml',
  output: './src/routes.ts',
  template: { routeHandler: true },
  client: { output: './src/lib/client.ts' },
  rpc: {
    output: './src/rpc.ts',
    parseResponse: true, // resolve with the parsed body
    docs: true, // operation summary and description as JSDoc
  },
})
```

Per-request options, headers for example, are passed to each generated function and hook as `ClientRequestOptions`. The `import` and `client` fields of `rpc` and the hooks were removed: the client is always the generated one, exported as `client`.

## Query hooks

Supported: `swr`, `tanstack-query`, `preact-query`, `solid-query`, `vue-query`, `svelte-query`, `angular-query`.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  output: './src/routes.ts',
  template: { routeHandler: true },
  client: { output: './src/lib/client.ts' },
  'tanstack-query': {
    output: './src/tanstack-query.ts',
  },
})
```

```ts
const { data } = useUsersId({ param: { id: '1' } })
const { mutate } = usePostUsers()
```

Add `x-pagination: true` to a GET operation to get an infinite query hook.
