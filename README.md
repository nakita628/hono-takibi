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

Use a typed config to drive generation and reuse the same settings with the Vite plugin. The examples below **always set `schema` and `route` together** and keep paths simple.

### Field reference (incl. `exportType` / `exportSchema`)

* `input: string` — Path to your OpenAPI (`.yaml`/`.json`) or TypeSpec (`.tsp`) source.
* `'zod-openapi'` (all-in-one)

  * **Do not set** top‑level `output` when `schema`/`route` blocks are present.
  * `schema`

    * `output: string | *.ts` — Directory when `split: true`; otherwise a single `*.ts` file.
    * `exportType?: boolean` (default: **false**) — Export inferred TS types per schema.
    * `split?: boolean` — Generate one file per schema (+ `index.ts`).
    * *Note:* `exportSchema` does **not** exist here; schemas are always exported in this block.
  * `route`

    * `output: string | *.ts` — Directory when `split: true`; otherwise a single `*.ts` file.
    * `import: string` — Import path used by generated routes to reference schemas/types (e.g., `"../schemas"`).
    * `split?: boolean` — Generate one file per route (+ `index.ts`).
* `rpc` (optional)

  * `output: string | *.ts` — Directory when `split: true`; otherwise a single `*.ts` file.
  * `import: string` — Import path used inside generated RPC stubs.
  * `split?: boolean` — Generate one file per operation (+ `index.ts`).

---

### Example A — Split schemas & split routes + RPC (split)

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.json',
  'zod-openapi': {
    schema: {
      output: './src/schemas',
      exportType: true,
      split: true,
    },
    route: {
      output: './src/routes',
      import: '../schemas',
      split: true,
    },
  },
  rpc: {
    output: './src/rpc/',
    import: '../client',
    split: true,
  },
})
```

### Example B — Split schemas & split routes (no RPC)

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.json',
  'zod-openapi': {
    schema: {
      output: './src/schemas',
      exportType: true,
      split: true,
    },
    route: {
      output: './src/routes',
      import: '../schemas',
      split: true,
    },
  },
})
```

### Example C — Single‑file schemas & single‑file routes (paired, non‑split)

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.json',
  'zod-openapi': {
    schema: {
      output: './src/index.ts',   // one file for all schemas
      exportType: true,
      // split omitted → false
    },
    route: {
      output: './src/index.ts',    // one file for all routes
      import: './schemas',
      // split omitted → false
    },
  },
})
```

### Example D — Single‑file schemas + split routes (mixed, still paired)

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.json',
  'zod-openapi': {
    schema: {
      output: './src/index.ts',
      exportType: false,
    },
    route: {
      output: './src/routes',
      import: './schemas',
      split: true,
    },
  },
})
```

### Example E — TypeSpec input (paired), split all

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'main.tsp',
  'zod-openapi': {
    schema: {
      output: './src/schemas',
      exportType: true,
      split: true,
    },
    route: {
      output: './src/routes',
      import: '../schemas',
      split: true,
    },
  },
})
```

### Example F — Paired, **split omitted** (defaults to non‑split single files)

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.json',
  'zod-openapi': {
    schema: {
      output: './src/index.ts',
      exportType: true,
      // split omitted → false (single file)
    },
    route: {
      output: './src/index.ts',
      import: '../index',
      // split omitted → false (single file)
    },
  },
})
```

### Example G — (Invalid) Paired but **without `output`** in `schema`/`route`

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.json',
  'zod-openapi': {
    schema: {
      // ❌ missing output → will fail validation
      exportType: true,
      split: true,
    },
    route: {
      // ❌ missing output → will fail validation
      import: '../schemas',
      split: true,
    },
  },
})
```

> **Why invalid?** In paired mode, `schema.output` and `route.output` are **required**. If you want a single file, set a `*.ts` path and omit `split`; if you want split files, set a **directory** and `split: true`. The loader will otherwise emit errors like:
>
> * `Invalid schema output path for split mode (must be a directory, not .ts): ...`
> * `Invalid route output path ...`

### Example H — Top‑level single file (no `schema`/`route`) — export schemas & types

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.json',
  'zod-openapi': {
    output: './src/index.ts', // single file; do not set schema/route blocks
    exportSchema: true,                 // export Zod schema constants
    exportType: true,                   // also export TS types via z.infer
  },
})
```

### Example I — Top‑level single file (no `schema`/`route`) — inline Zod (no exports)

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.json',
  'zod-openapi': {
    output: './src/index.ts',
    exportSchema: false, // inline Zod inside routes; no schema exports
    exportType: false,   // ignored when exportSchema is false
  },
})
```

> When using **top‑level** `'zod-openapi'.output`, **omit** the `schema` and `route` blocks entirely. The loader will reject configs that mix them.

### Example J — Top‑level single file (requested minimal form)

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.json',
  'zod-openapi': {
    output: 'src/index.ts',
    exportType: true,
    exportSchema: true,
  },
})
```

## HonoTakibiVite

**Auto‑regenerate + HMR**: Whenever you save `hono-takibi.config.ts`, your OpenAPI/TypeSpec input, or any files under the watched folders, the plugin regenerates code and triggers a full reload.

### Install & wire up

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { HonoTakibiVite } from 'hono-takibi/vite-plugin'

export default defineConfig({
  plugins: [
    HonoTakibiVite(),
  ],
})
```

> The plugin auto‑loads `hono-takibi.config.ts` at the project root and uses its settings.

### Behavior summary

* **Watches**: the config file, your `input` file, and nearby `**/*.yaml|json|tsp` files.
* **Generates** according to your config for:

  * `zod-openapi` (single file or split `schema` / `route`)
  * `rpc` (single file or split)
* **Prunes stale outputs safely**:

  * In split mode it keeps only the expected generated `*.ts` files and removes others.
  * In non‑split mode it unlinks the single `*.ts` output.
  * When toggling split↔non‑split or changing output paths, previous outputs are removed.
  * Empty output directories are removed when possible.
* **No marker files** are created; all pruning is shallow and limited to `*.ts` under the specified output paths.

### What gets generated (by mode)

| Kind    | Non‑split `output` | Split `output` dir                    |
| ------- | ------------------ | ------------------------------------- |
| Schemas | Single `*.ts`      | One `*.ts` per schema + `index.ts`    |
| Routes  | Single `*.ts`      | One `*.ts` per route + `index.ts`     |
| RPC     | Single `*.ts`      | One `*.ts` per operation + `index.ts` |

> Route file names are derived from operations; schema files are derived from component schema names.

### Demo (Vite + HMR)

![](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/vite/hono-takibi-vite.gif)


## With AI Prompt

### Sample Prompt — Schemas-Only Extractor (OpenAPI 3+)

A copy‑and‑paste prompt for **any LLM** that extracts **only** the contents of `#/components/schemas/` from an OpenAPI document.

## Prompt　Example

```md
You are a **Schemas‑Only Extractor** for OpenAPI 3+.

## 1. Version
- Accept files that start with `openapi: "3.0.0"` or newer.
- Otherwise reply with: `Unsupported OpenAPI version (must be 3.0+).`

## 2. Scope
- Look **only** inside `#/components/schemas/`. Ignore everything else.
- `$ref` must also point inside that section.

## 3. Schemas section present?
- If `components.schemas` is missing, reply with: `Missing '#/components/schemas/' section. Cannot proceed.`

## 4. File type
- Accept **.yaml**, **.json**, or **.tsp** files.
- Otherwise reply with: `Unsupported input file extension.`

## Format tips
- `format: uuid` usually means **UUID v4**.
- Other accepted identifiers include `uuidv6`, `uuidv7`, `ulid`, `cuid`, etc.
- With **hono‑takibi**, you can generate **Zod schemas** directly from a custom OpenAPI file.

## What the LLM should do
1. Validate the file with the four rules above.
2. If it passes, output **only** the YAML/JSON fragment under `#/components/schemas/` (preserve indentation).
3. Otherwise, output the exact error message above—nothing more.
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