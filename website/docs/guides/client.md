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

With [`template`](/docs/guides/template), a `client` block generates the client. `rpc` and the hooks import it; you never create one.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  basePath: '/api',
  output: './src/routes.ts',
  template: { routeHandler: true },
  client: { output: './src/lib/client.ts' },
  rpc: { output: './src/rpc.ts' },
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

| Option           | Sets              | Meaning                                                  |
| ---------------- | ----------------- | -------------------------------------------------------- |
| `client.output`  | the file          | `rpc` and the hooks import it from there.                |
| `client.baseUrl` | `hcWithType('/')` | `'/'` (default) or an environment variable, see below.   |
| `basePath`       | `.api`            | Calls are `client.users.$get()`, not `client.api.users`. |
| `client.import`  | `from '../index'` | Where the app's type comes from. Only across packages.   |
| `client.package` | imports elsewhere | What other packages import the client by.                |

Only the type of the app is imported, so no server code reaches the browser. The file is overwritten on every run.

Per-request options (`headers`, `init`, `fetch`) go in the last argument, everywhere:

```ts
await client.users.$get(undefined, { headers: { Authorization: `Bearer ${token}` } })
await getUsers({ headers: { Authorization: `Bearer ${token}` } }) // rpc
useUsers({ options: { headers: { Authorization: `Bearer ${token}` } } }) // hooks
```

### Base URL

`'/'` by default: same-origin requests. Anything else comes from the environment at startup; there is no fallback.

| `baseUrl`                                   | Generated                       |
| ------------------------------------------- | ------------------------------- |
| `{ env: 'VITE_API_URL' }`                   | `import.meta.env.VITE_API_URL!` |
| `{ env: 'API_URL', source: 'process.env' }` | `process.env.API_URL!`          |
| `{ env: 'API_URL', import: '@/env' }`       | `env.API_URL` from `@/env`      |

With `import`, the export is `env` unless `name` says otherwise:

```ts
baseUrl: { env: 'API_URL', import: '../config', name: 'config' } // config.API_URL
```

### Monorepo

When the client is a package of its own, name where the app's type comes from and what other packages import the client by:

```ts
// apps/hono/hono-takibi.config.ts
client: {
  output: '../client/src/lib/client.ts',
  import: '@packages/server', // → import type { api } from '@packages/server'
  package: '@packages/client', // → import { client } from '@packages/client' (in other packages)
},
swr: { output: '../client/src/hooks/swr.ts' }, // same package → '../lib'
'tanstack-query': { output: '../web/src/api/hooks.ts' }, // other package → '@packages/client'
```

A package is what the nearest `package.json` above a file delimits. `@packages/server` needs an `exports` (or `main`) pointing at the app entry; no build is needed for the types. The hooks' package needs `hono` installed.

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
