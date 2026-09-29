---
title: Client
prev:
  text: 'Template'
  link: '/docs/guides/template'
next:
  text: 'Test & Mock'
  link: '/docs/guides/test-mock'
---

# Client

Generates the [Hono RPC client](https://hono.dev/docs/guides/rpc), typed wrappers around it, and hooks for your query library.

## Generated client

With [`template`](/docs/guides/template), a `client` block generates the client. `rpc` and the hooks import it on their own.

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

Imports are worked out from the output paths, and follow `template.pathAlias`.

### Base URL

| `baseUrl`                                   | Generated                             |
| ------------------------------------------- | ------------------------------------- |
| `'http://localhost:3000'`                   | `hcWithType('http://localhost:3000')` |
| `{ env: 'VITE_API_URL' }`                   | `import.meta.env.VITE_API_URL ?? '/'` |
| `{ env: 'API_URL', source: 'process.env' }` | `process.env.API_URL ?? '/'`          |
| `{ env: 'API_URL', import: '@/env' }`       | `env.API_URL`, imported from `@/env`  |

Defaults to `'/'`.

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

## Your own client

Without the `client` block, name the module in `import`.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  rpc: {
    output: './src/rpc.ts',
    import: '@packages/client',
    client: 'apiClient', // export name, default 'client'
  },
})
```

| `client` block | `import` | `client` name |
| -------------- | -------- | ------------- |
| Not set        | Required | Optional      |
| Set            | Optional | Not allowed   |

## RPC

```ts
export default defineConfig({
  input: 'openapi.yaml',
  rpc: {
    output: './src/rpc.ts',
    import: '../lib',
    parseResponse: true, // resolve with the parsed body
    docs: true, // operation summary and description as JSDoc
  },
})
```

## Query hooks

Supported: `swr`, `tanstack-query`, `preact-query`, `solid-query`, `vue-query`, `svelte-query`, `angular-query`.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  'tanstack-query': {
    output: './src/tanstack-query.ts',
    import: '../lib',
  },
})
```

```ts
const { data } = useUsersId({ param: { id: '1' } })
const { mutate } = usePostUsers()
```

Add `x-pagination: true` to a GET operation to get an infinite query hook.
