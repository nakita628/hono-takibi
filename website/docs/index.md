---
title: Hono Takibi is a code generator from OpenAPI to @hono/zod-openapi
prev: false
next:
  text: 'Guides'
  link: '/docs/guides/config'
---

# Hono Takibi

[Hono Takibi](https://www.npmjs.com/package/hono-takibi) generates type-safe [Hono](https://hono.dev/) code from [OpenAPI](https://www.openapis.org/) / [TypeSpec](https://typespec.io/) specifications.

## Installation

::: code-group

```sh [npm]
npm install -D hono-takibi
```

```sh [yarn]
yarn add -D hono-takibi
```

```sh [pnpm]
pnpm add -D hono-takibi
```

```sh [bun]
bun add -D hono-takibi
```

:::

::: code-group

```sh [npm]
npx hono-takibi path/to/input.{yaml,json,tsp} -o path/to/output.ts
```

```sh [yarn]
yarn hono-takibi path/to/input.{yaml,json,tsp} -o path/to/output.ts
```

```sh [pnpm]
pnpm hono-takibi path/to/input.{yaml,json,tsp} -o path/to/output.ts
```

```sh [bun]
bunx hono-takibi path/to/input.{yaml,json,tsp} -o path/to/output.ts
```

:::

Run `hono-takibi --help` for the full flag list, including `--config` for a config file
outside the current directory and `--completions` for a shell completion script.

### Example

input:

```yaml
openapi: 3.1.0
info:
  title: Hono Takibi API
  version: '1.0.0'
paths:
  /:
    get:
      summary: Welcome
      description: Returns a welcome message from Hono Takibi.
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Hono Takibi🔥
                required:
                  - message
```

output:

```ts
import { createRoute, z } from '@hono/zod-openapi'

export const getRoute = createRoute({
  method: 'get',
  path: '/',
  summary: 'Welcome',
  description: 'Returns a welcome message from Hono Takibi.',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({
              message: z.string().openapi({ example: 'Hono Takibi🔥' }),
            })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})
```
