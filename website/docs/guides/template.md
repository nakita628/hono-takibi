---
title: Template
prev:
  text: 'Configuration'
  link: '/docs/guides/config'
next:
  text: 'Client'
  link: '/docs/guides/client'
---

# Template

Scaffolds the app entry, one handler file per tag, and optional tests around the generated routes.

```ts
import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: 'openapi.yaml',
  output: './src/routes.ts',
  template: {
    test: true,
    pathAlias: '@/',
    testFramework: 'vitest', // "vitest" (default) | "vite-plus" | "bun"
  },
})
```

Generated files:

- `src/index.ts`: app entry that registers every handler
- `src/handlers/*.ts`: handler stubs, one file per tag
- `src/handlers/*.test.ts`: tests with `@faker-js/faker` data (when `test: true`)

## Re-running is safe

Run it again after editing the spec. New operations get a stub, existing handlers keep the code you wrote.

- A handler you moved into another file is regenerated in place.
- When an operation leaves the spec, its handler declaration is removed. The file stays, delete it by hand when it is empty.
- Files under `handlers/` are never deleted. Only top-level files are scanned, not subdirectories.

## Modes

### `routeHandler: false` (default)

Each handler file creates its own sub-router. The app mounts them with `.route()`.

```ts
// src/handlers/health.ts
import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '@/routes'

const app = new OpenAPIHono()

export const healthHandler = app.openapi(getHealthRoute, (c) => {})
```

```ts
// src/index.ts
import { OpenAPIHono } from '@hono/zod-openapi'
import { healthHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.route('/', healthHandler)

export default app
```

![routeHandler: false, regenerating on TypeSpec save](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/template/template-default.gif)

::: tip
If you split routes into hand-written files, name each sub-router export `<fileBasename>Handler`, for example `sharesHandler` in `shares.ts`. That is the name the generator merges into.
:::

### `routeHandler: true`

Handlers export typed `RouteHandler` functions. Route registration lives in `index.ts`.

```ts
// src/handlers/health.ts
import type { RouteHandler } from '@hono/zod-openapi'
import type { getHealthRoute } from '../routes'

export const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {}
```

```ts
// src/index.ts
import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export default app
```

![routeHandler: true, regenerating on TypeSpec save](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/template/template-route-handler.gif)

### `define: true`

Route and handler live together in one `defineOpenAPIRoute()` call.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  template: { define: true },
})
```

```ts
// src/routes/users.ts
export const getUsersIdRoute = defineOpenAPIRoute({
  route: createRoute({
    method: 'get',
    path: '/users/{id}',
    request: { params: z.object({ id: z.string() }) },
    responses: {
      200: { description: 'ok', content: { 'application/json': { schema: UserSchema } } },
    },
  }),
  handler: async (c) => {},
  addRoute: true,
})
```

![define: true, regenerating on TypeSpec save](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/template/template-define.gif)

In this mode `output` is the app entry (default `./src/index.ts`, must be an `index.ts` path). Routes go to `routes/` next to it, and component schemas to `components/index.ts`.
