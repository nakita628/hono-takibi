![img](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/icon/hono-takibi.png)

# Hono Takibi

![img](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/img/hono-takibi.png)

**[Hono Takibi](https://www.npmjs.com/package/hono-takibi)** generates type-safe [Hono](https://hono.dev/) code from [OpenAPI](https://www.openapis.org/) / [TypeSpec](https://typespec.io/) specifications.

- OpenAPI schemas to [Zod](https://zod.dev/) schemas
- [@hono/zod-openapi](https://hono.dev/examples/zod-openapi) route definitions
- App entry point + handler stubs + test files
- Client library hooks (SWR, TanStack Query, Preact Query, Solid Query, Vue Query, Svelte Query, Angular Query)
- RPC client, mock server, TypeScript types
- API reference docs with [hono-cli](https://github.com/honojs/cli) commands

```bash
npm install -D hono-takibi
```

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
  output: './src/routes.ts',
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
  output: './src/routes.ts',
  template: {
    test: true,
    pathAlias: '@/',
    testFramework: 'bun', // "vitest" (default) | "vite-plus" | "bun"
  },
})
```

This generates:

- `src/index.ts` - App entry point with route registrations
- `src/handlers/*.ts` - Handler stubs for each resource
- `src/handlers/*.test.ts` - Test files with `@faker-js/faker` mock data (imports from `vitest`, `vite-plus/test`, or `bun:test`)

Re-running after updating your OpenAPI spec is safe — your hand-written handler logic and test customizations are preserved. Only new routes are added as stubs.

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

#### `define: true`

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

The app entry defaults to `src/index.ts` (override with `output`, which must be an `index.ts` path such as `./server/index.ts`). Route files always go to `routes/` next to the app entry, and component schemas to `components/index.ts` (override with `components.output`).

## Client Library Integrations

Supported: SWR, TanStack Query, Preact Query, Solid Query, Vue Query, Svelte Query, Angular Query, RPC Client.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  'tanstack-query': {
    output: './src/tanstack-query',
    import: '../lib',
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
    import: '.',
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

## API Reference Docs

Generate API reference Markdown with [hono-cli](https://github.com/honojs/cli) `hono request` commands:

```ts
export default defineConfig({
  input: 'openapi.yaml',
  docs: {
    output: './docs/api.md',
    entry: 'src/index.ts',
  },
})
```

Set `curl: true` with `baseUrl` to generate `curl` commands for a running server:

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

Some options are mutually exclusive: `output` ↔ `routes`, `template.define` ↔ `routes`, `components.output` ↔ per-type components, `template.define` ↔ `routeHandler`.

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',

  output: './src/routes.ts', // single-file mode; with template.define, the app entry (an index.ts path, default ./src/index.ts)
  basePath: '/api',
  readonly: true,
  // format: {}, // oxfmt FormatConfig

  template: {
    test: true,
    routeHandler: false, // true: RouteHandler exports
    define: false, // true: defineOpenAPIRoute output
    pathAlias: '@/',
    testFramework: 'vitest', // "vitest" | "vite-plus" | "bun"
  },

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

  routes: {
    output: './src/routes',
    split: true,
    import: '@packages/routes',
  },

  webhooks: {
    output: './src/webhooks',
    split: true,
    import: '@packages/webhooks',
  },

  // `output` (single file) and the per-type fields below (split) are mutually exclusive.
  // `exportTypes` applies only to schemas / parameters / headers / mediaTypes.
  components: {
    output: './src/components/index.ts',

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

  type: {
    output: './src/types.ts',
    readonly: true,
  },

  rpc: {
    output: './src/rpc',
    import: '../lib',
    split: true,
    client: 'client',
    parseResponse: true,
    docs: false, // operation summary/description as JSDoc
  },

  swr: {
    output: './src/swr',
    import: '../lib',
    split: true,
    client: 'client',
  },
  'tanstack-query': {
    output: './src/tanstack-query',
    import: '../lib',
    split: true,
    client: 'client',
  },
  'preact-query': {
    output: './src/preact-query',
    import: '../lib',
    split: true,
    client: 'client',
  },
  'solid-query': {
    output: './src/solid-query',
    import: '../lib',
    split: true,
    client: 'client',
  },
  'vue-query': {
    output: './src/vue-query',
    import: '../lib',
    split: true,
    client: 'client',
  },
  'svelte-query': {
    output: './src/svelte-query',
    import: '../lib',
    split: true,
    client: 'client',
  },
  'angular-query': {
    output: './src/angular-query',
    import: '../lib',
    split: true,
    client: 'client',
  },

  test: {
    output: './src/test.ts',
    import: '.',
    testFramework: 'vitest', // "vitest" | "vite-plus" | "bun"
  },

  mock: {
    output: './src/mock.ts',
    useExamples: true,
    locale: 'en',
    delay: false,
    arrayMin: 1,
    arrayMax: 10,
  },

  docs: {
    output: './docs/api.md',
    entry: 'src/index.ts',
    curl: false, // true: curl commands (requires baseUrl); false: hono request
    baseUrl: 'http://localhost:3000',
  },
})
```

## Vendor Extensions (x-\*)

hono-takibi reads `x-*` vendor extensions on your OpenAPI / JSON Schema to customize the generated Zod. Each extension maps 1:1 to a Zod feature.

### Custom Validation Error Messages

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

All custom message extensions follow the `x-<keyword>-message` naming convention and map directly to Zod validator error messages.

#### Common (any schema type)

| Extension            | Applies to                                                     |
| -------------------- | -------------------------------------------------------------- |
| `x-error-message`    | All schemas (fallback when keyword-specific message is absent) |
| `x-required-message` | Required properties                                            |
| `x-const-message`    | `const`                                                        |
| `x-enum-message`     | `enum`                                                         |

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

| Extension               | Applies to                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `x-allOf-message`       | `allOf`                                                                                                          |
| `x-anyOf-message`       | `anyOf`                                                                                                          |
| `x-oneOf-message`       | `oneOf`                                                                                                          |
| `x-not-message`         | `not`                                                                                                            |
| `x-implication-message` | Implication pattern (`A → B`) encoded as `anyOf:[{not:A},{required:B}]`; takes precedence over `x-anyOf-message` |

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

### Behavior Extensions

#### String Pre-validation Transforms

| Extension       | Generated                     | Value                                   |
| --------------- | ----------------------------- | --------------------------------------- |
| `x-trim`        | `z.string().trim()`           | `true`                                  |
| `x-toLowerCase` | `z.string().toLowerCase()`    | `true`                                  |
| `x-toUpperCase` | `z.string().toUpperCase()`    | `true`                                  |
| `x-normalize`   | `z.string().normalize('NFC')` | `'NFC'` / `'NFD'` / `'NFKC'` / `'NFKD'` |

```yaml
homepage:
  type: string
  format: url
  x-trim: true
```

```ts
z.string().trim().pipe(z.url())
```

#### String Validation Checks

| Extension     | Generated                | Value  |
| ------------- | ------------------------ | ------ |
| `x-lowercase` | `z.string().lowercase()` | `true` |
| `x-uppercase` | `z.string().uppercase()` | `true` |

```yaml
slug:
  type: string
  x-lowercase: true
```

```ts
z.string().lowercase()
```

#### Preprocess

**`x-preprocess`**

```yaml
username:
  type: string
  x-preprocess: 'z.preprocess((val) => typeof val === "string" ? val.trim() : val, z.string())'
```

```ts
z.preprocess((val) => (typeof val === 'string' ? val.trim() : val), z.string())
```

#### Type Coercion

**`x-coerce`**

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

**`x-stringbool`**

```yaml
notify:
  type: boolean
  x-stringbool: true
```

```ts
z.stringbool()
```

```yaml
notify:
  type: boolean
  x-stringbool:
    truthy: ['yes', 'on']
    falsy: ['no', 'off']
    case: 'sensitive'
```

```ts
z.stringbool({ truthy: ['yes', 'on'], falsy: ['no', 'off'], case: 'sensitive' })
```

#### Codec

**`x-codec`**

```yaml
updatedAt:
  type: string
  format: date-time
  x-codec: 'z.codec(z.iso.datetime(), z.date(), { decode: (isoString) => new Date(isoString), encode: (date) => date.toISOString() })'
```

```ts
z.codec(z.iso.datetime(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
})
```

#### Custom Validation

**`x-refine`**

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

**`x-superRefine`**

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

#### Transform & Pipe

**`x-transform`**

```yaml
code:
  type: string
  x-transform: 'z.string().transform((val) => val.toUpperCase())'
```

```ts
z.string().transform((val) => val.toUpperCase())
```

**`x-pipe`**

```yaml
port:
  type: string
  x-pipe: 'z.string().pipe(z.number().int().positive())'
```

```ts
z.string().pipe(z.number().int().positive())
```

#### Default & Fallback Values

**`x-prefault`**

```yaml
greeting:
  type: string
  x-prefault: 'hello'
```

```ts
z.string().prefault('hello')
```

**`x-catch`**

```yaml
retries:
  type: integer
  x-catch: 0
```

```ts
z.int().catch(0)
```

#### Immutability

**`x-readonly`**

```yaml
config:
  type: object
  properties:
    name:
      type: string
  x-readonly: true
```

```ts
z.object({ name: z.string() }).readonly()
```

#### String Content Checks

**`x-startsWith` / `x-endsWith` / `x-includes`**

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

#### Format-Specific Options

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

| Extension        | Maps to                         | Values                                                |
| ---------------- | ------------------------------- | ----------------------------------------------------- |
| `x-emailPattern` | `z.email({ pattern })`          | `html5` / `rfc5322` / `unicode`                       |
| `x-emailRegex`   | `z.email({ pattern: /.../ })`   | custom regex string                                   |
| `x-uuidVersion`  | `z.uuid({ version })`           | `v1` / `v2` / `v3` / `v4` / `v5` / `v6` / `v7` / `v8` |
| `x-urlProtocol`  | `z.url({ protocol: /.../ })`    | regex string                                          |
| `x-urlHostname`  | `z.url({ hostname: /.../ })`    | regex string                                          |
| `x-urlNormalize` | `z.url({ normalize })`          | `true` / `false`                                      |
| `x-isoPrecision` | `z.iso.datetime({ precision })` | fractional second digits                              |
| `x-isoOffset`    | `z.iso.datetime({ offset })`    | `true` / `false`                                      |
| `x-isoLocal`     | `z.iso.datetime({ local })`     | `true` / `false`                                      |
| `x-macDelimiter` | `z.mac({ delimiter })`          | `:` / `-` / `.`                                       |
| `x-jwtAlg`       | `z.jwt({ alg })`                | `HS256` etc.                                          |
| `x-hashAlg`      | `z.hash(alg, ...)`              | `sha256` etc.                                         |
| `x-hashEnc`      | `z.hash(alg, { enc })`          | `hex` / `base64` / `base64url`                        |

### Branded Types (x-brand)

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

## Projects Using Hono Takibi

- **[resend-local](https://github.com/y-hiraoka/resend-local)** — A local emulator for the Resend email API.

## Contributing

We welcome feedback and contributions to improve the tool!

If you find any issues with the generated code or have suggestions for improvements, please:

- Open an issue at [GitHub Issues](https://github.com/nakita628/hono-takibi/issues)
- Submit a pull request with your improvements

## License

Distributed under the MIT License. See [LICENSE](https://github.com/nakita628/hono-takibi?tab=MIT-1-ov-file) for more information.
