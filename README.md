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

basic

```bash
Options:
  --export-type        export TypeScript type aliases
  --export-schema      export Zod schema objects
  --template           generate app file and handler stubs
  --test               generate empty *.test.ts files
  --base-path <path>   api prefix (default: /)
```

template

> **⚠️** When using the `--template` option, you must specify a valid directory path. Ensure the directory exists before executing the 

### Example

```bash
npx hono-takibi path/to/input.{yaml,json,tsp} -o path/to/output.ts --export-type --export-schema --template --base-path '/api/v1'
```

## Configuration File (`hono-takibi.config.ts`)

Config used by both the CLI and the Vite plugin.

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

One file. Set top‑level `output` (don’t define `schema`/`route`).

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    output: './src/index.ts',
    exportSchema: true,
    exportType: true,
  },
})
```

---

## Schemas & Routes

Define **both** `schema` and `route` (don’t set top‑level `output`).

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    // split ON → outputs are directories
    schema: { output: './src/schemas', split: true },
    route: { output: './src/routes', import: '../schemas', split: true },

    // split OFF example (one file each):
    // schema: { output: './src/schemas/index.ts' },
    // route: { output: './src/routes/index.ts', import: '../schemas' },
  },
})
```

---

## RPC (optional)

Works with either pattern.

* `split: true` → `output` is a **directory**; many files + `index.ts`.
* `split` **omitted** or `false` → `output` is **one `*.ts` file**.

**Example (split: true)**

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': { output: './src/index.ts', exportSchema: true, exportType: true },
  rpc: { output: './src/rpc', import: '../client', split: true },
})
```

**Example (single file; split omitted/false)**

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': { output: './src/index.ts', exportSchema: true, exportType: true },
  rpc: { output: './src/rpc/index.ts', import: '../client' },
})
```

---

## Vite Plugin (`HonoTakibiVite`)

Auto‑regenerates on changes and reloads dev server.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { HonoTakibiVite } from 'hono-takibi/vite-plugin'

export default defineConfig({ plugins: [HonoTakibiVite()] })
```

**What it does**

* **Watches**: the config, your `input`, and nearby `**/*.{yaml,json,tsp}`.
* **Generates** outputs per your config (single‑file or split, plus `rpc`).
* **Cleans** old generated files safely when paths or `split` change.

That’s it — set `input`, choose one of the two patterns, and (optionally) add `rpc`. ✅

### Demo (Vite + HMR)

![](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/vite/hono-takibi-vite.gif)


## With AI Prompt Example

```sh
Generate one **OpenAPI 3.x+** YAML (prefer **3.1.0**).

Rules:
- Use only `components.schemas` (no other `components`).
- Never include `parameters:`.
- No path params; all inputs in `requestBody` (`application/json`) with `$ref: '#/components/schemas/*'`.
- All responses use `application/json` with `$ref: '#/components/schemas/*'`.
- POST-only action routes: `/resource/create|get|search|update|delete`.
- No inline schemas in `paths`.

Fill, then generate:
- title / version / tags
- resources & fields
- ops per resource: create / get / search / update / delete

**Output format (strict):**
- Return a **single fenced code block** labeled `yaml` that contains **only** the YAML.
- No text before or after the code block.
```

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