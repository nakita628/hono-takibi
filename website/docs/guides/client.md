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

| Option               | Sets                        | Meaning                                                  |
| -------------------- | --------------------------- | -------------------------------------------------------- |
| `client.output`      | the file                    | `rpc` and the hooks import it from there.                |
| `client.baseUrl`     | `hcWithType('/')`           | `'/'` (default) or an environment variable, see below.   |
| `basePath`           | `.api`                      | Calls are `client.users.$get()`, not `client.api.users`. |
| `client.import`      | `from '../index'`           | Where the app's type comes from. Only across packages.   |
| `client.package`     | imports elsewhere           | What other packages import the client by.                |
| `client.credentials` | `{ init: { credentials } }` | Send cookies with every request, see below.              |

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

### Cookies

A client of an API on another origin needs `credentials: 'include'` to send its cookies, as the [Hono guide](https://hono.dev/docs/guides/rpc#cookies) shows. `client.credentials` writes it as the `init` of `hc`:

```ts
client: { output: './src/lib/client.ts', credentials: 'include' }
```

```ts
export const client = hcWithType('/', { init: { credentials: 'include' } }).api
```

It is the `credentials` of `fetch`, one of three, and nothing is written when it is left out:

| `credentials`   | Cookies are sent                                                                 |
| --------------- | -------------------------------------------------------------------------------- |
| `'include'`     | to any origin. The server answers with `Access-Control-Allow-Credentials: true`. |
| `'same-origin'` | to the origin of the page alone: what the browser does when nothing is written.  |
| `'omit'`        | never, the same origin included.                                                 |

Per-request options still apply beside it: `fetch`, `headers` and the rest of a call's last argument. Anything else the client is created with is a per-request option, passed to the functions and hooks as above.

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

export const __root = app.openapi(getRoute, getRouteHandler)

export const vaults = app
  .openapi(getVaultsRoute, getVaultsRouteHandler)
  .openapi(postVaultsRoute, postVaultsRouteHandler)

export default app
```

```ts
// src/lib/client.ts
export const __rootClient = hc__RootWithType('/').api

export const vaultsClient = hcVaultsWithType('/').api
```

| Path                      | Group      | Client           |
| ------------------------- | ---------- | ---------------- |
| `/vaults`, `/vaults/{id}` | `vaults`   | `vaultsClient`   |
| `/v2-public/ping`         | `v2Public` | `v2PublicClient` |
| `/`                       | `__root`   | `__rootClient`   |

Every route belongs to a group, named after its handler file: the first tag, or else the first path segment. The root `/` is written to `__root.ts` and is the group `__root`; a segment that cannot be an export, a word of the language like `/delete`, is prefixed the same way, `__delete`. A resource is named with letters and digits alone, so a name that starts with `__` never collides with one, and `/root` is the group `root` beside `__root`. Any other identifier is a group under its own name, `client` and `api` included: the entry and the file of clients bind nothing that can take it. The two names they keep for themselves, the `app` the routes are registered on and the `OpenAPIHono` import, yield to a group of the same name as `app2` and `OpenAPIHono2`.

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

Every hook has a key factory, `getUsersQueryKey(args)` for TanStack Query and `getGetUsersKey(args)` for SWR, and the key is `['users', '/users/:id', args]`: the first segment of the path, the route, and the arguments, so that `['users']` invalidates every query under `/users` and `['users', '/users/:id', { param: { id: '1' } }]` every query of one user. A `header` or `cookie` argument is left out of the key: it says who asks, not what is asked for, and a persisted cache or the devtools would otherwise show the token.
