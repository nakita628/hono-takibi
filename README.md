![img](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/icon/hono-takibi.png)

# Hono Takibi

![img](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/img/hono-takibi.png)

```bash
npm install -D hono-takibi
```

## OpenAPI to Hono Code Generator

**[Hono Takibi](https://www.npmjs.com/package/hono-takibi)** generates type-safe [Hono](https://hono.dev/) code from [OpenAPI](https://www.openapis.org/) / [TypeSpec](https://typespec.io/) specifications.

- OpenAPI schemas to [Zod](https://zod.dev/) schemas
- [@hono/zod-openapi](https://hono.dev/examples/zod-openapi) route definitions
- App entry point + handler stubs + test files
- Client library hooks (SWR, TanStack Query, Preact Query, Solid Query, Vue Query, Svelte Query, Angular Query)
- RPC client, mock server, TypeScript types
- API reference docs with [hono-cli](https://github.com/honojs/cli) commands

## Quick Start

### CLI

```bash
npx hono-takibi path/to/input.{yaml,json,tsp} -o path/to/output.ts
```

### Configuration File

Create `hono-takibi.config.ts`:

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    output: './src/routes.ts',
  },
})
```

```bash
npx hono-takibi
```

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

## Custom Validation Error Messages

Use `x-*` vendor extensions to attach custom Zod error messages, with **one extension per JSON Schema keyword** (1:1 mapping). The extension name follows the pattern `x-<jsonSchemaKeyword>-message` (e.g. `x-minLength-message`, `x-pattern-message`), plus four generic forms: `x-error-message`, `x-required-message`, `x-const-message`, `x-enum-message`.

```yaml
name:
  type: string
  minLength: 1
  maxLength: 50
  x-error-message: 'Name must be a string'
  x-minLength-message: 'Name cannot be empty'
  x-maxLength-message: 'Name must be at most 50 characters'
```

```ts
z.string({ error: 'Name must be a string' })
  .min(1, { error: 'Name cannot be empty' })
  .max(50, { error: 'Name must be at most 50 characters' })
```

### Extension Reference

All custom message extensions follow the `x-<keyword>-message` naming convention and map directly to Zod validator error messages.

#### Common (any schema type)

| Extension            | Applies to                       |
| -------------------- | -------------------------------- |
| `x-error-message`    | All schemas (top-level fallback) |
| `x-required-message` | Required properties              |
| `x-const-message`    | `const`                          |
| `x-enum-message`     | `enum`                           |

#### Numeric (number / integer)

| Extension                    | Applies to         |
| ---------------------------- | ------------------ |
| `x-minimum-message`          | `minimum`          |
| `x-maximum-message`          | `maximum`          |
| `x-exclusiveMinimum-message` | `exclusiveMinimum` |
| `x-exclusiveMaximum-message` | `exclusiveMaximum` |
| `x-multipleOf-message`       | `multipleOf`       |

#### String

| Extension             | Applies to                                 |
| --------------------- | ------------------------------------------ |
| `x-minLength-message` | `minLength`                                |
| `x-maxLength-message` | `maxLength`                                |
| `x-pattern-message`   | `pattern`                                  |
| `x-length-message`    | Exact length (`minLength` === `maxLength`) |

#### Array

| Extension               | Applies to    |
| ----------------------- | ------------- |
| `x-minItems-message`    | `minItems`    |
| `x-maxItems-message`    | `maxItems`    |
| `x-uniqueItems-message` | `uniqueItems` |
| `x-contains-message`    | `contains`    |
| `x-minContains-message` | `minContains` |
| `x-maxContains-message` | `maxContains` |

#### Object

| Extension                        | Applies to             |
| -------------------------------- | ---------------------- |
| `x-minProperties-message`        | `minProperties`        |
| `x-maxProperties-message`        | `maxProperties`        |
| `x-additionalProperties-message` | `additionalProperties` |
| `x-propertyNames-message`        | `propertyNames`        |
| `x-patternProperties-message`    | `patternProperties`    |
| `x-dependentRequired-message`    | `dependentRequired`    |
| `x-dependentSchemas-message`     | `dependentSchemas`     |

#### Combinators

| Extension         | Applies to |
| ----------------- | ---------- |
| `x-allOf-message` | `allOf`    |
| `x-anyOf-message` | `anyOf`    |
| `x-oneOf-message` | `oneOf`    |
| `x-not-message`   | `not`      |

#### Conditional

| Extension        | Applies to |
| ---------------- | ---------- |
| `x-if-message`   | `if`       |
| `x-then-message` | `then`     |
| `x-else-message` | `else`     |

#### Typeless / Array Applicator

| Extension                         | Applies to                      |
| --------------------------------- | ------------------------------- |
| `x-properties-message`            | `properties` (typeless schemas) |
| `x-prefixItems-message`           | `prefixItems`                   |
| `x-items-message`                 | `items`                         |
| `x-unevaluatedProperties-message` | `unevaluatedProperties`         |
| `x-unevaluatedItems-message`      | `unevaluatedItems`              |

## Behavior Extensions

`x-*` extensions map to Zod runtime behaviors in two forms:

- **Expression extensions** — `x-codec` / `x-preprocess` / `x-transform` / `x-pipe` / `x-refine` / `x-superRefine`. Each value is a complete Zod expression string. Paste Zod docs examples directly. The first four **replace** the base schema (mutually exclusive, precedence: `x-codec` > `x-preprocess` > `x-transform` > `x-pipe`); the latter two are appended as chain fragments (`.refine(...)` / `.superRefine(...)`).
- **Value extensions** — `x-brand` / `x-prefault` / `x-catch` / `x-freeze` / `x-coerce` / `x-trim` / `x-toLowerCase` / `x-toUpperCase` / `x-normalize` / format-specific options. Each takes a boolean / literal / enum value.

Callback arguments use `val` by convention (matches Zod docs).

### String Pre-validation Transforms

Apply normalization to a string **before** validation runs. When combined with a validation format, the pipeline becomes `z.string().<transforms>.pipe(z.<format>())`.

| Extension       | Generated                     | Value                                   |
| --------------- | ----------------------------- | --------------------------------------- |
| `x-trim`        | `z.string().trim()`           | `true`                                  |
| `x-toLowerCase` | `z.string().toLowerCase()`    | `true`                                  |
| `x-toUpperCase` | `z.string().toUpperCase()`    | `true`                                  |
| `x-normalize`   | `z.string().normalize('NFC')` | `'NFC'` / `'NFD'` / `'NFKC'` / `'NFKD'` |

```yaml
email:
  type: string
  format: email
  x-trim: true # z.string().trim().pipe(z.email())
```

### Preprocess (Input Normalization)

#### `x-preprocess`

Complete `z.preprocess(...)` expression.

```yaml
username:
  type: string
  x-preprocess: 'z.preprocess((val) => typeof val === "string" ? val.trim() : val, z.string())'
```

```ts
z.preprocess((val) => (typeof val === 'string' ? val.trim() : val), z.string())
```

Spec reference: [`z.preprocess`](https://zod.dev/api?id=preprocess).

### Type Coercion

#### `x-coerce`

Forces input to be coerced into the target type before validation (`z.coerce.*`).

```yaml
asNumber:
  type: number
  x-coerce: true
asDate:
  type: string
  format: date-time
  x-coerce: true
```

```ts
z.coerce.number()
z.coerce.date()
```

Supported types: `string`, `number`, `integer`, `boolean`, `date-time` / `date`.

### Codec (Bidirectional Transform)

#### `x-codec`

Complete `z.codec(...)` expression.

```yaml
updatedAt:
  type: string
  format: date-time
  x-codec: 'z.codec(z.iso.datetime(), z.date(), { decode: (val) => new Date(val), encode: (val) => val.toISOString() })'
```

```ts
z.codec(z.iso.datetime(), z.date(), {
  decode: (val) => new Date(val),
  encode: (val) => val.toISOString(),
})
```

Authors can define any codec — string ⇄ Date, base64 ⇄ Uint8Array, encrypted ⇄ decrypted object, custom domain types, etc. The full Zod API (`z.codec`, `z.iso.*`, `z.codec.map` once available) is reachable.

> **Warning**: When `x-codec` is present, the base schema is replaced and `x-error-message` is a no-op on this branch.

> **Warning**: For request bodies that must round-trip (parse on input, re-encode on output), use `x-codec` rather than `x-transform`. `x-transform` is one-directional; only `x-codec` keeps wire format and runtime value bidirectionally consistent. See [Transform & Pipe](#transform--pipe).

Spec reference: [`z.codec`](https://zod.dev/api?id=codecs).

### Custom Validation

#### `x-refine`

Complete `.refine(...)` chain fragment string. Chain multiple checks with `.refine(...).refine(...)`.

```yaml
password:
  type: string
  x-refine: '.refine((val) => val.length >= 8, { message: "Password must be at least 8 characters" }).refine((val) => /[A-Z]/.test(val), { message: "Password must contain an uppercase letter" })'
```

```ts
z.string()
  .refine((val) => val.length >= 8, { message: 'Password must be at least 8 characters' })
  .refine((val) => /[A-Z]/.test(val), { message: 'Password must contain an uppercase letter' })
```

#### `x-superRefine`

Complete `.superRefine(...)` chain fragment string for issue-level control (`ctx.addIssue`). Chain multiple checks with `.superRefine(...).superRefine(...)`.

```yaml
normalizedEmail:
  type: string
  format: email
  x-superRefine: '.superRefine((val, ctx) => { if (val.endsWith("@blocked.example")) ctx.addIssue({ code: "custom", message: "Blocked domain" }) })'
```

```ts
z.email().superRefine((val, ctx) => {
  if (val.endsWith('@blocked.example')) {
    ctx.addIssue({ code: 'custom', message: 'Blocked domain' })
  }
})
```

### Transform & Pipe

#### `x-transform`

Complete Zod expression ending in `.transform(...)`.

```yaml
code:
  type: string
  x-transform: 'z.string().transform((val) => val.toUpperCase())'
```

```ts
z.string().transform((val) => val.toUpperCase())
```

> **Warning**: `x-transform` widens the gap between `z.input<T>` and `z.output<T>`. In Hono, `c.req.valid('json')` returns `z.output<T>`, so the value seen inside a handler is the transformed shape. For request-side bidirectional conversion, use `x-codec` instead.

Spec reference: [`.transform`](https://zod.dev/api?id=transform).

#### `x-pipe`

Complete Zod expression ending in `.pipe(...)`.

```yaml
port:
  type: string
  x-pipe: 'z.string().pipe(z.number().int().positive())'
```

```ts
z.string().pipe(z.number().int().positive())
```

> **Warning**: `x-pipe` decouples the OpenAPI schema (`type: string`) from the runtime TypeScript type (`number`). Generated OpenAPI documents still advertise the input type to clients, while the Hono handler receives the piped output type. Prefer `x-codec` when bidirectional symmetry matters.

Spec reference: [`.pipe`](https://zod.dev/api?id=pipes).

### Default & Fallback Values

#### `x-prefault`

`z.prefault(value)` — substitutes the value when input is `undefined`.

```yaml
greeting:
  type: string
  x-prefault: 'hello'
```

```ts
z.string().prefault('hello')
```

#### `x-catch`

`z.catch(value)` — falls back to the value when validation fails.

```yaml
retries:
  type: integer
  x-catch: 0
```

```ts
z.int().catch(0)
```

### Immutability

#### `x-freeze`

Wraps with `.readonly()` for compile-time `Readonly<T>` typing.

```yaml
config:
  type: object
  properties:
    name:
      type: string
  x-freeze: true
```

```ts
z.object({ name: z.string() }).readonly()
```

### String Content Checks

#### `x-startsWith` / `x-endsWith` / `x-includes`

Literal substring checks (preserved as raw strings, not regex-escaped).

```yaml
url:
  type: string
  x-startsWith: 'https://'
  x-endsWith: '.com'
path:
  type: string
  x-includes: '/api/'
```

```ts
z.string().startsWith('https://').endsWith('.com')
z.string().includes('/api/')
```

### Format-Specific Options

Per-format fine-tuning options that map to Zod v4's format constructors.

```yaml
htmlEmail:
  type: string
  format: email
  x-emailPattern: 'html5' # email pattern preset
uuidV7:
  type: string
  format: uuid
  x-uuidVersion: v7 # uuid version
httpsUrl:
  type: string
  format: uri
  x-urlProtocol: '^https$' # url protocol regex
  x-urlNormalize: true
preciseDatetime:
  type: string
  format: date-time
  x-isoPrecision: 3 # iso datetime precision / offset / local
  x-isoOffset: true
```

| Extension        | Maps to                         | Values                           |
| ---------------- | ------------------------------- | -------------------------------- |
| `x-emailPattern` | `z.email({ pattern })`          | `html5` / `browser` / `unicode`  |
| `x-emailRegex`   | `z.email({ pattern: /.../ })`   | custom regex string              |
| `x-uuidVersion`  | `z.uuid({ version })`           | `v1` / `v4` / `v6` / `v7` / `v8` |
| `x-urlProtocol`  | `z.url({ protocol: /.../ })`    | regex string                     |
| `x-urlHostname`  | `z.url({ hostname: /.../ })`    | regex string                     |
| `x-urlNormalize` | `z.url({ normalize })`          | `true` / `false`                 |
| `x-isoPrecision` | `z.iso.datetime({ precision })` | fractional second digits         |
| `x-isoOffset`    | `z.iso.datetime({ offset })`    | `true` / `false`                 |
| `x-isoLocal`     | `z.iso.datetime({ local })`     | `true` / `false`                 |
| `x-macDelimiter` | `z.mac({ delimiter })`          | `:` / `-` / `.`                  |
| `x-jwtAlg`       | `z.jwt({ alg })`                | `HS256` etc.                     |
| `x-hashAlg`      | `z.hash(alg, ...)`              | `sha256` etc.                    |
| `x-hashEnc`      | `z.hash(alg, { enc })`          | `hex` / `base64` / `base64url`   |

## Branded Types

Use the `x-brand` vendor extension to generate [Zod branded types](https://zod.dev/api?id=branded-types), creating nominal types that are structurally identical but semantically distinct:

```yaml
components:
  schemas:
    Cat:
      type: object
      properties:
        name:
          type: string
      required:
        - name
      x-brand: Cat
    Dog:
      type: object
      properties:
        name:
          type: string
      required:
        - name
      x-brand: Dog
```

```ts
// Generated output
const CatSchema = z.object({ name: z.string() }).brand<'Cat'>().openapi('Cat')

const DogSchema = z.object({ name: z.string() }).brand<'Dog'>().openapi('Dog')
```

## Vite Plugin

Watches your OpenAPI spec and `hono-takibi.config.ts` for changes, then auto-regenerates code on save.

Requires `hono-takibi.config.ts` in your project root.

```ts
// vite.config.ts
import { honoTakibiVite } from 'hono-takibi/vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [honoTakibiVite()],
})
```

![](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/vite/hono-takibi-vite.gif)

## Template & Test Generation

Generate a complete app structure with handler stubs and test files:

```ts
export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    output: './src/routes.ts',
    template: {
      test: true,
      pathAlias: '@/',
      testFramework: 'bun', // "vitest" (default) | "vite-plus" | "bun"
    },
  },
})
```

This generates:

- `src/index.ts` - App entry point with route registrations
- `src/handlers/*.ts` - Handler stubs for each resource
- `src/handlers/*.test.ts` - Test files with `@faker-js/faker` mock data (imports from `vitest`, `vite-plus/test`, or `bun:test`)

Re-running after updating your OpenAPI spec is safe — your hand-written handler logic and test customizations are preserved. Only new routes are added as stubs.

> **Note:** If you remove a path from your OpenAPI spec and re-run, the corresponding handler and test files will be deleted. Make sure to back up or migrate any custom logic before removing API definitions.

### Handler Generation Modes

#### `routeHandler: false` (default)

Each handler creates its own sub-router and registers routes:

```ts
// src/handlers/health.ts
import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '@/routes'

const app = new OpenAPIHono()

export const healthHandler = app.openapi(getHealthRoute, (c) => {})
```

The app mounts handlers via `.route()`:

```ts
// src/index.ts
import { OpenAPIHono } from '@hono/zod-openapi'
import { healthHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.route('/', healthHandler)

export default app
```

#### `routeHandler: true`

Handlers export typed `RouteHandler` functions, and `index.ts` centralizes route registration:

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

## Client Library Integrations

Supported: SWR, TanStack Query, Preact Query, Solid Query, Vue Query, Svelte Query, Angular Query, RPC Client.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  'tanstack-query': {
    output: './src/tanstack-query',
    import: '../client',
    split: true,
    client: 'client',
  },
})
```

### Infinite Query (`x-pagination`)

Set `x-pagination: true` on a GET operation to generate infinite query hooks.

```yaml
paths:
  /posts:
    get:
      x-pagination: true
```

## Test & Mock Generation

### Test Generation

```ts
export default defineConfig({
  input: 'openapi.yaml',
  test: {
    output: './src/test.ts',
    import: '../index',
    testFramework: 'bun', // "vitest" (default) | "vite-plus" | "bun"
  },
})
```

### Mock Server Generation

```ts
export default defineConfig({
  input: 'openapi.yaml',
  mock: {
    output: './src/mock.ts',
  },
})
```

### API Reference Docs

Generate API reference Markdown with [hono-cli](https://github.com/honojs/cli) `hono request` commands that can be run directly without starting a server:

```ts
export default defineConfig({
  input: 'openapi.yaml',
  docs: {
    output: './docs/api.md',
    entry: 'src/index.ts',
  },
})
```

To generate `curl` commands instead of `hono request`:

```ts
export default defineConfig({
  input: 'openapi.yaml',
  docs: {
    output: './docs/api.md',
    curl: true,
    baseUrl: 'http://localhost:3000',
  },
})
```

## Full Config Reference

> `split: true` - `output` is a **directory** (many files + `index.ts`).
> `split` omitted or `false` - `output` is a **single `.ts` file**.
> `output` and `routes` are **mutually exclusive** in `zod-openapi`.

```ts
// hono-takibi.config.ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  // OpenAPI spec file (.yaml, .json, or .tsp)
  input: 'openapi.yaml',

  // Base path prefix for all routes
  basePath: '/api',

  // oxfmt FormatConfig for generated code output
  // @see https://www.npmjs.com/package/oxfmt
  // format: {},

  // Main code generation (Zod + OpenAPI + Hono)
  'zod-openapi': {
    // Output: use 'output' for single file, or 'routes' for split mode (mutually exclusive)
    output: './src/routes.ts',
    readonly: true, // Add 'as const' to generated schemas

    // Template generation (app entry point + handler stubs + tests)
    template: {
      test: true, // Generate test files
      routeHandler: false, // false: inline .openapi() (default), true: RouteHandler exports
      pathAlias: '@/', // TypeScript path alias for imports
      testFramework: 'vitest', // "vitest" (default) | "vite-plus" | "bun" — test import source
    },

    // Export options (OpenAPI Components Object)
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

    // Split routes into separate files
    routes: {
      output: './src/routes',
      split: true,
      import: '@packages/routes',
    },

    // Split webhooks into separate files
    webhooks: {
      output: './src/webhooks',
      split: true,
      import: '@packages/webhooks',
    },

    // Split components into separate files
    components: {
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
  },

  // TypeScript type generation
  type: {
    output: './src/types.ts',
    readonly: true,
  },

  // RPC client generation
  rpc: {
    output: './src/rpc',
    import: '../client', // Import path for the Hono RPC client
    split: true,
    client: 'client', // Export name of the client instance
    parseResponse: true, // Use parseResponse for type-safe responses
  },

  // Client library integrations (SWR, TanStack Query, Preact Query, Solid Query, Vue Query, Svelte Query, Angular Query)
  swr: {
    output: './src/swr',
    import: '../client',
    split: true,
    client: 'client',
  },
  'tanstack-query': {
    output: './src/tanstack-query',
    import: '../client',
    split: true,
    client: 'client',
  },
  'preact-query': {
    output: './src/preact-query',
    import: '../client',
    split: true,
    client: 'client',
  },
  'solid-query': {
    output: './src/solid-query',
    import: '../client',
    split: true,
    client: 'client',
  },
  'vue-query': {
    output: './src/vue-query',
    import: '../client',
    split: true,
    client: 'client',
  },
  'svelte-query': {
    output: './src/svelte-query',
    import: '../client',
    split: true,
    client: 'client',
  },
  'angular-query': {
    output: './src/angular-query',
    import: '../client',
    split: true,
    client: 'client',
  },

  // Test generation
  test: {
    output: './src/test.ts',
    import: '../index', // Import path for the app instance
    testFramework: 'vitest', // "vitest" (default) | "vite-plus" | "bun" — test import source
  },

  // Mock server generation
  mock: {
    output: './src/mock.ts',
  },

  // API reference docs generation
  docs: {
    output: './docs/api.md',
    entry: 'src/index.ts', // App entry point for hono request commands
    curl: false, // true: generate curl commands (requires baseUrl), false: hono request (default)
    baseUrl: 'http://localhost:3000', // Base URL for curl commands (required when curl: true)
  },
})
```

## Projects Using Hono Takibi

- **[resend-local](https://github.com/y-hiraoka/resend-local)** — A local emulator for the Resend email API.

## Limitations

**This package is in active development and may introduce breaking changes without prior notice.**

JSON Schema 2020-12 conformance is measured against the [official JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite). Current pass rate: **86.38%**.

### Known unsupported areas (Zod-architectural limits)

These keywords have no `x-*-message` extension because Zod has no corresponding primitive to wrap:

- **`if` / `then` / `else`** — applicator vocabulary; use `x-superRefine` with a custom function for conditional logic
- **`unevaluatedProperties` / `unevaluatedItems`** — applicator-aware annotation tracking is partially supported (~50–63% of spec-suite tests pass); for strict enforcement, prefer explicit `additionalProperties: false`
- **`contentEncoding` / `contentMediaType` / `contentSchema`** — base64 / JSON-decode is supported, but full content vocabulary is not exhaustive
- **`format` assertion vs annotation** — Zod's `z.email` / `z.uuid` / `z.url` etc. always assert; the spec's annotation-only mode is not distinguished

### Recommendations

- Pin to exact versions in production
- Test thoroughly when updating versions
- Review generated code after updates

## Contributing

We welcome feedback and contributions to improve the tool!

If you find any issues with the generated code or have suggestions for improvements, please:

- Open an issue at [GitHub Issues](https://github.com/nakita628/hono-takibi/issues)
- Submit a pull request with your improvements

## License

Distributed under the MIT License. See [LICENSE](https://github.com/nakita628/hono-takibi?tab=MIT-1-ov-file) for more information.
