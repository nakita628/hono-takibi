![img](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/icon/hono-takibi.png)

# Hono Takibi

![img](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/img/hono-takibi.png)

```bash
npm install -D hono-takibi
```

## Migrate Legacy APIs to Hono

**[Hono Takibi](https://www.npmjs.com/package/hono-takibi)** is an OpenAPI-to-Hono code generator, specifically developed to assist in migrating APIs from various programming languages to Hono. This tool automates the creation of type-safe Hono routes from your existing OpenAPI specifications, making it easier to transition from legacy systems (Ruby, Perl, PHP, etc.) to a modern Hono architecture.

## What Problem Does It Solve?

Moving to [@hono/zod-openapi](https://hono.dev/examples/zod-openapi) requires:

* Manual conversion of OpenAPI paths to Hono routes
* Translation of OpenAPI schemas to Zod schemas
* Implementation of type-safe request/response handling

If you have OpenAPI specifications, Hono Takibi automates the conversion process to [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi), allowing you to focus on implementing your business logic rather than dealing with boilerplate code. While we aim for full compatibility in the generated code, we're continuously working to improve the conversion accuracy and support more OpenAPI features. We welcome feedback and contributions to make this tool even better for the community.

**Hono Takibi** automates this process by:
- Converting OpenAPI schemas to Zod schemas
- Generating type-safe route definitions
- Creating proper variable names and exports

## Usage

```bash
npx hono-takibi path/to/input.{yaml,json,tsp} -o path/to/output.ts
```

input:

```yaml
openapi: 3.1.0
info:
  title: Hono Takibi API
  version: "1.0.0"
paths:
  /:
    get:
      summary: Welcome
      description: Returns a welcome message from Hono Takibi.
      responses:
        "200":
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
          schema: z.object({ message: z.string().openapi({ example: 'Hono Takibi🔥' }) }),
        },
      },
    },
  },
})
```

### Demo 

![](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/demo/hono-takibi.gif)

## CLI

### Options

```bash
Options:
  --readonly                  make schemas immutable (adds .readonly() and 'as const')
  --export-schemas-types      export schemas types
  --export-schemas            export schemas
  --export-parameters-types   export parameters types
  --export-parameters         export parameters
  --export-security-schemes   export securitySchemes
  --export-request-bodies     export requestBodies
  --export-responses          export responses
  --export-headers-types      export headers types
  --export-headers            export headers
  --export-examples           export examples
  --export-links              export links
  --export-callbacks          export callbacks
  --template                  generate app file and handler stubs
  --test                      generate empty *.test.ts files
  --base-path <path>          api prefix (default: /)
  -h, --help                  display help for command
```

### Example

```bash
npx hono-takibi path/to/input.{yaml,json,tsp} -o path/to/output.ts --export-schemas --export-schemas-types --template --base-path '/api/v1'
```

## Configuration File (`hono-takibi.config.ts`)

Config used by both the CLI and the Vite plugin.

### Config Reference

All available options are shown below. In practice, use only the options you need.

```ts
// hono-takibi.config.ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    output: './src/index.ts',
    readonly: true,
    exportSchemas: true,
    exportSchemasTypes: true,
    exportParameters: true,
    exportParametersTypes: true,
    exportSecuritySchemes: true,
    exportRequestBodies: true,
    exportResponses: true,
    exportHeaders: true,
    exportHeadersTypes: true,
    exportExamples: true,
    exportLinks: true,
    exportCallbacks: true,
    routes: {
      output: './src/routes',
      split: true,
    },
    components: {
      schemas: {
        output: './src/schemas',
        exportTypes: true,
        split: true,
        import: '../schemas',
      },
      parameters: {
        output: './src/parameters',
        exportTypes: true,
        split: true,
        import: '../parameters',
      },
      securitySchemes: {
        output: './src/securitySchemes',
        split: true,
        import: '../securitySchemes',
      },
      requestBodies: {
        output: './src/requestBodies',
        split: true,
        import: '../requestBodies',
      },
      responses: {
        output: './src/responses',
        split: true,
        import: '../responses',
      },
      headers: {
        output: './src/headers',
        exportTypes: true,
        split: true,
        import: '../headers',
      },
      examples: {
        output: './src/examples',
        split: true,
        import: '../examples',
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
    },
  },
  type: {
    output: './src/types.ts',
  },
  rpc: {
    output: './src/rpc',
    import: '../client',
    split: true,
  },
})
```

## Essentials

* Put **`hono-takibi.config.ts`** at repo root.
* Default‑export with `defineConfig(...)`.
* `input`: **`openapi.yaml`** (recommended), or `*.json` / `*.tsp`.

> **About `split`**
>
> * `split: true` → `output` is a **directory**; many files + `index.ts`.
> * `split` **omitted** or `false` → `output` is a **single `*.ts` file** (one file only).

---

## Single‑file

One file. Set top‑level `output` (don't define `components`/`routes`).

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    output: './src/index.ts',
    exportSchemas: true,
    exportSchemasTypes: true,
  },
})
```

---

## RPC (optional)

Works with either pattern.

* `split: true` → `output` is a **directory**; many files + `index.ts`.
* `split` **omitted** or `false` → `output` is **one `*.ts` file**.

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': { output: './src/index.ts', exportSchemas: true, exportSchemasTypes: true },
  rpc: { output: './src/rpc', import: '../client', split: true },
})
```

---

## Vite Plugin (`honoTakibiVite`)

Auto‑regenerates on changes and reloads dev server.

```ts
// vite.config.ts
import { honoTakibiVite } from 'hono-takibi/vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [honoTakibiVite()],
})
```

**What it does**

* **Watches**: the config, your `input`, and nearby `**/*.{yaml,json,tsp}`.
* **Generates** outputs per your config (single‑file or split, plus `rpc`).
* **Cleans** old generated files safely when paths or `split` change.

That’s it — set `input`, choose one of the two patterns, and (optionally) add `rpc`. ✅

### Demo (Vite + HMR)

![](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/vite/hono-takibi-vite.gif)

### ⚠️ WARNING: Potential Breaking Changes Without Notice

**This package is in active development and may introduce breaking changes without prior notice.**
Specifically:
- Schema generation logic might be updated
- Output code structure could be modified
- Example value handling might be altered

We strongly recommend:
- Pinning to exact versions in production
- Testing thoroughly when updating versions
- Reviewing generated code after updates

We welcome feedback and contributions to improve the tool!

### Current Limitations

  **OpenAPI Support**
   - Not all OpenAPI features are supported
   - Complex schemas might not convert correctly
   - Limited support for certain response types
   - Some OpenAPI validations may not be perfectly converted to Zod validations

## License

Distributed under the MIT License. See [LICENSE](https://github.com/nakita-Ypm/hono-takibi?tab=MIT-1-ov-file) for more information.