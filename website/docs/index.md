---
title: Getting Started
prev: false
next:
  text: 'Configuration'
  link: '/docs/guides/config'
---

# Hono Takibi

[Hono Takibi](https://www.npmjs.com/package/hono-takibi) generates type-safe [Hono](https://hono.dev/) code from [OpenAPI](https://www.openapis.org/) / [TypeSpec](https://typespec.io/) specifications.

From one document it can generate:

- [Zod](https://zod.dev/) schemas and [@hono/zod-openapi](https://hono.dev/examples/zod-openapi) route definitions
- App entry, handler stubs and test files
- RPC client and hooks for SWR, TanStack Query, Preact / Solid / Vue / Svelte / Angular Query
- Mock server, TypeScript types and API reference docs

::: warning Pre-1.0
Hono Takibi is under active development and has not reached a stable release yet. Until 1.0, minor releases (`0.x` → `0.y`) may include breaking changes to the CLI, the config and the generated code. Patch releases are safe to update.
:::

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

## Usage

Pass an OpenAPI (`.yaml`, `.json`) or TypeSpec (`.tsp`) document and an output file:

::: code-group

```sh [npm]
npx hono-takibi openapi.yaml -o src/routes.ts
```

```sh [yarn]
yarn hono-takibi openapi.yaml -o src/routes.ts
```

```sh [pnpm]
pnpm hono-takibi openapi.yaml -o src/routes.ts
```

```sh [bun]
bunx hono-takibi openapi.yaml -o src/routes.ts
```

:::

For anything beyond a single routes file, use a [config file](/docs/guides/config).

## Example

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

Try it in the [Playground](/playground).

## CLI

`hono-takibi --help`:

```
DESCRIPTION
  Hono Takibi is a code generator from OpenAPI to @hono/zod-openapi

USAGE
  hono-takibi [flags] [<input>]

ARGUMENTS
  input input.{yaml,json,tsp} OpenAPI (.yaml, .json) or TypeSpec (.tsp) document to generate from (optional)

FLAGS
  --output, -o output.ts    TypeScript file the generated routes are written to
  --config, -c file         Config file to run (default: ./hono-takibi.config.ts)
  --watch, -w               Rerun the config on every change to its documents or itself

GLOBAL FLAGS
  --help, -h                                                          Show help information
  --version, -v                                                       Show version information
  --wizard                                                            Start wizard mode for a command
  --completions <bash|zsh|fish|sh>                                    Print shell completion script (choices: bash, zsh, fish, sh)
  --log-level <all|trace|debug|info|warn|warning|error|fatal|none>    Sets the minimum log level (choices: all, trace, debug, info, warn, warning, error, fatal, none)

EXAMPLES
  # Generate a single routes file
  hono-takibi openapi.yaml -o src/routes.ts

  # Run every generator declared in ./hono-takibi.config.ts
  hono-takibi

  # Run a config file from another location
  hono-takibi --config config/api.config.ts

  # Rerun on every change to the input documents or the config
  hono-takibi --watch
```
