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

Use `x-*` vendor extensions to attach custom Zod error messages, with **one extension per JSON Schema keyword** (1:1 mapping). Each failure mode produces a distinct message — no silent collisions.

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
// Generated output
z.string({ error: 'Name must be a string' })
  .min(1, { error: 'Name cannot be empty' })
  .max(50, { error: 'Name must be at most 50 characters' })
```

### Extension Reference (30 total)

#### Common (any schema type)

| Extension              | Applies to                                                          |
| ---------------------- | ------------------------------------------------------------------- |
| `x-error-message`      | Schema constructor (type mismatch / generic fallback)               |
| `x-required-message`   | `issue.input === undefined` (missing required field)                |
| `x-const-message`      | `const` (literal mismatch)                                          |
| `x-enum-message`       | `enum` (value not in list)                                          |

#### Numeric (`number` / `integer`)

| Extension                    | Applies to                                                  |
| ---------------------------- | ----------------------------------------------------------- |
| `x-minimum-message`          | `minimum` (`.min()` / `.gte()`)                             |
| `x-maximum-message`          | `maximum` (`.max()` / `.lte()`)                             |
| `x-exclusiveMinimum-message` | `exclusiveMinimum` (`.gt()` / `.positive()`)                |
| `x-exclusiveMaximum-message` | `exclusiveMaximum` (`.lt()` / `.negative()`)                |
| `x-multipleOf-message`       | `.multipleOf()`                                             |

#### String

| Extension              | Applies to                            |
| ---------------------- | ------------------------------------- |
| `x-minLength-message`  | `minLength` (`.min()`)                |
| `x-maxLength-message`  | `maxLength` (`.max()`)                |
| `x-pattern-message`    | `pattern` (`.regex()`)                |
| `x-size-message`       | `minLength === maxLength` (`.length()`) |

#### Array

| Extension                  | Applies to                                       |
| -------------------------- | ------------------------------------------------ |
| `x-minItems-message`       | `minItems` (`.min()`)                            |
| `x-maxItems-message`       | `maxItems` (`.max()`)                            |
| `x-uniqueItems-message`    | `uniqueItems` (`.refine()` Set check)            |
| `x-contains-message`       | `contains` alone (at least 1 type-match)         |
| `x-minContains-message`    | `minContains` (count lower bound)                |
| `x-maxContains-message`    | `maxContains` (count upper bound)                |

#### Object

| Extension                       | Applies to                                                |
| ------------------------------- | --------------------------------------------------------- |
| `x-minProperties-message`       | `minProperties` (`.refine()` keys count)                  |
| `x-maxProperties-message`       | `maxProperties` (`.refine()` keys count)                  |
| `x-additionalProperties-message`| `additionalProperties: false` (`unrecognized_keys`)       |
| `x-propertyNames-message`       | `propertyNames` pattern / enum check                      |
| `x-patternProperties-message`   | `patternProperties` value check                           |
| `x-dependentRequired-message`   | `dependentRequired` (key A ⇒ key B required)              |
| `x-dependentSchemas-message`    | `dependentSchemas` (key A ⇒ sub-schema applies)           |

#### Combinators

| Extension          | Applies to                                  |
| ------------------ | ------------------------------------------- |
| `x-allOf-message`  | `allOf` composition                         |
| `x-anyOf-message`  | `anyOf` (`z.union`)                         |
| `x-oneOf-message`  | `oneOf` (`z.xor` / `z.discriminatedUnion`)  |
| `x-not-message`    | `not` predicate                             |

## Behavior Extensions

Beyond error messages, hono-takibi maps additional `x-*` extensions to Zod runtime behaviors: pre-validation transforms, type coercion, codecs, custom validation, default/fallback values, immutability, and format-specific options.

### String Pre-validation Transforms

Apply normalization to a string **before** validation runs. When combined with a validation format (e.g. `email`), the pipeline becomes `z.string().<transforms>.pipe(z.<format>())` so canonical forms are validated.

#### `x-trim`

```yaml
email:
  type: string
  format: email
  x-trim: true
```

```ts
// Generated
z.string().trim().pipe(z.email())
```

#### `x-toLowerCase`

```yaml
slug:
  type: string
  pattern: '^[a-z0-9-]+$'
  x-toLowerCase: true
```

```ts
z.string().toLowerCase().regex(/^[a-z0-9-]+$/)
```

#### `x-toUpperCase`

```yaml
country:
  type: string
  x-toUpperCase: true
```

```ts
z.string().toUpperCase()
```

#### `x-normalize`

Unicode normalization (NFC / NFD / NFKC / NFKD).

```yaml
text:
  type: string
  x-normalize: 'NFC'
```

```ts
z.string().normalize('NFC')
```

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

#### `x-codec: date`

Generates `z.codec()` for date / date-time formats — the input is an ISO string (validated against `z.iso.datetime()` / `z.iso.date()`), the parsed runtime value is a JavaScript `Date`. Removes the need for manual `.toISOString()` calls in route handlers.

```yaml
updatedAt:
  type: string
  format: date-time
  x-codec: date
```

```ts
z.codec(
  z.iso.datetime(),
  z.date(),
  {
    decode: (isoString) => new Date(isoString),
    encode: (date) => date.toISOString(),
  },
)
```

### Custom Validation

#### `x-refine`

Apply one or more `.refine()` checks. Each entry is `{ fn, message, path? }`.

```yaml
password:
  type: string
  x-refine:
    - fn: '(v) => v.length >= 8'
      message: 'Password must be at least 8 characters'
    - fn: '(v) => /[A-Z]/.test(v)'
      message: 'Password must contain an uppercase letter'
```

```ts
z.string()
  .refine((v) => v.length >= 8, { message: 'Password must be at least 8 characters' })
  .refine((v) => /[A-Z]/.test(v), { message: 'Password must contain an uppercase letter' })
```

#### `x-superRefine`

Apply `.superRefine()` for issue-level control (`ctx.addIssue`).

```yaml
normalizedEmail:
  type: string
  format: email
  x-superRefine:
    - |
      (v, ctx) => {
        if (v.endsWith('@blocked.example')) {
          ctx.addIssue({ code: 'custom', message: 'Blocked domain' })
        }
      }
```

```ts
z.email().superRefine((v, ctx) => {
  if (v.endsWith('@blocked.example')) {
    ctx.addIssue({ code: 'custom', message: 'Blocked domain' })
  }
})
```

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

#### Email — `x-emailPattern` / `x-emailRegex`

```yaml
htmlEmail:
  type: string
  format: email
  x-emailPattern: 'html5'   # preset: html5 / browser / unicode
customEmail:
  type: string
  format: email
  x-emailRegex: '^.+@example\.com$'  # custom regex
```

```ts
z.email({ pattern: z.regexes.html5Email })
z.email({ pattern: /^.+@example\.com$/ })
```

#### UUID — `x-uuidVersion`

```yaml
uuidV7:
  type: string
  format: uuid
  x-uuidVersion: v7   # v1 / v4 / v6 / v7 / v8
```

```ts
z.uuid({ version: 'v7' })
```

#### URL — `x-urlProtocol` / `x-urlHostname` / `x-urlNormalize`

```yaml
httpsUrl:
  type: string
  format: uri
  x-urlProtocol: '^https$'
  x-urlNormalize: true
```

```ts
z.url({ protocol: /^https$/, normalize: true })
```

#### ISO datetime — `x-isoPrecision` / `x-isoOffset` / `x-isoLocal`

```yaml
preciseDatetime:
  type: string
  format: date-time
  x-isoPrecision: 3   # fractional second digits
  x-isoOffset: true   # require timezone offset
localDatetime:
  type: string
  format: date-time
  x-isoLocal: true    # allow datetimes without timezone
```

```ts
z.iso.datetime({ precision: 3, offset: true })
z.iso.datetime({ local: true })
```

#### MAC — `x-macDelimiter`

```yaml
mac:
  type: string
  format: mac
  x-macDelimiter: ':'   # ':' / '-' / '.'
```

```ts
z.mac({ delimiter: ':' })
```

#### JWT — `x-jwtAlg`

```yaml
token:
  type: string
  format: jwt
  x-jwtAlg: 'HS256'
```

```ts
z.jwt({ alg: 'HS256' })
```

#### Hash — `x-hashAlg` / `x-hashEnc`

```yaml
sha256:
  type: string
  format: hash
  x-hashAlg: 'sha256'
  x-hashEnc: 'hex'   # 'hex' / 'base64' / 'base64url'
```

```ts
z.hash('sha256', { enc: 'hex' })
```

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
