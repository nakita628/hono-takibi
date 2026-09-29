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

With [`template`](/docs/guides/template), add a `client` block. The client is generated from the scaffolded app, and `rpc` and the hooks import it on their own. There is no path to write.

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

The type of the client is declared once, so it is worked out when the file is compiled rather than by every file that calls `hc`. This is the form the Hono guide [recommends](https://hono.dev/docs/guides/rpc#compile-your-code-before-using-it-recommended).

### Imports

Every import is worked out from where the files are written.

| File                 | Imports                                |
| -------------------- | -------------------------------------- |
| `src/lib/client.ts`  | `'../index'`, the app entry            |
| `src/lib/index.ts`   | `export * from './client'`, the barrel |
| `src/rpc.ts`         | `'./lib'`                              |
| `src/hooks/query.ts` | `'../lib'`                             |

With `template.pathAlias: '@/'` they become `'@/index'` and `'@/lib'`.

A client that is not an `index.ts` is re-exported by the `index.ts` beside it, and imported through it. No barrel is written when that `index.ts` is the output of another generator, the app entry for one: the client is then imported by its file.

### Base URL

`baseUrl` is what the client is created with. It defaults to `'/'`.

| `baseUrl`                                   | Generated                             |
| ------------------------------------------- | ------------------------------------- |
| `'http://localhost:3000'`                   | `hcWithType('http://localhost:3000')` |
| `{ env: 'VITE_API_URL' }`                   | `import.meta.env.VITE_API_URL ?? '/'` |
| `{ env: 'API_URL', source: 'process.env' }` | `process.env.API_URL ?? '/'`          |
| `{ env: 'API_URL', import: '@/env' }`       | `env.API_URL`, imported from `@/env`  |

The last form reads a property of an environment a module exports, one that validates what it hands out:

```ts
// src/env.ts
import * as z from 'zod'

const result = z.object({ API_URL: z.url() }).safeParse(process.env)

if (!result.success) {
  throw new Error(`Invalid env : ${result.error.message}`)
}

export const env = result.data
```

```ts
// src/lib/client.ts
import { env } from '@/env'

export const client = hcWithType(env.API_URL).api
```

`name` is the export to import, `env` by default.

## Larger applications

`template.split: true` divides the routes into groups. A client of one group resolves the routes of that group and not of the whole application, which is what keeps the editor responsive as the application grows.

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

export const items = app.openapi(getItemsRoute, getItemsRouteHandler)

export default app
```

Every group is registered on the one app. What is divided is the type: `app` is declared without routes, so each group is typed by the routes it registers.

```ts
// src/lib/client.ts
export const client = hcWithType('/').api

export const vaultsClient = hcVaultsWithType('/').api

export const itemsClient = hcItemsWithType('/').api
```

```ts
// src/rpc.ts
export async function getVaults(options?: ClientRequestOptions) {
  return await vaultsClient.vaults.$get(undefined, options)
}
```

### Groups

| Path                      | Group                               |
| ------------------------- | ----------------------------------- |
| `/vaults`, `/vaults/{id}` | `vaults`                            |
| `/v2-public/ping`         | `v2Public`                          |
| `/`                       | none, a route of `api` and `client` |
| `/api/...`, `/delete/...` | none, the name is taken             |

A group is the first segment of the path, named the way its handler file is. With `routeHandler: false` a group is the handler file the app mounts, which goes by the first tag.

The groups and `api` are written in the order their first route stands in the document. `split` works in every mode of the template.

## Your own client

Without the `client` block, name the module that exports the client in `import`. `client` is the name of the export, `client` by default.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  rpc: {
    output: './src/rpc.ts',
    import: '@packages/client',
    client: 'apiClient',
  },
})
```

The `client` block cannot be set on its own, it needs `template`. With it, the name of the export cannot be set in `rpc` or the hooks: it is `client`, and `<group>Client` for a group.

| Config                 | `import` | `client` name           |
| ---------------------- | -------- | ----------------------- |
| Without `client` block | required | optional, `client`      |
| With `client` block    | optional | not taken, a type error |

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
