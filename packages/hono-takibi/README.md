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

## Demo 

![](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/demo/hono-takibi.gif)

## HonoTakibiVite

### Automatic Code Regeneration & HMR

With **HonoTakibiVite**, saving your OpenAPI spec while the Vite dev server is running instantly regenerates the code.

### OpenAPI Schema Requirements

- Your OpenAPI definition must include **only the `#/components/schemas/` section**.
- It must be fully compliant with **OpenAPI 3.0 or later (e.g., 3.0 or 3.1)**.
- Do **not** include `paths`, `tags`, or any other OpenAPI sections.

### Supported Input Formats

You may specify the input file in one of the following formats:

- `.yaml` — OpenAPI YAML (schemas only)
- `.json` — OpenAPI JSON (schemas only)
- `.tsp` — TypeSpec source file

### TypeSpec Setup (if using `.tsp`)

If you use a `.tsp` TypeSpec file, you must set up the TypeSpec environment and install required libraries:

- @typespec/http
- @typespec/rest
- ...other

### Example

`vite.config.ts`

```ts
import { defineConfig } from 'vite'
import HonoTakibiVite from 'hono-takibi/vite-plugin'

export default defineConfig({
  plugins: [HonoTakibiVite('main.tsp', 'index.ts', true, true)],
})
```

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

![](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/ai/hono-takibi-ai.gif)

This project is in **early development** and being maintained by a developer with about 2 years of experience. While I'm doing my best to create a useful tool:

### ⚠️ WARNING: Potential Breaking Changes Without Notice

**This package is in active development and may introduce breaking changes without prior notice.**
Specifically:
- Query parameter coercion behavior may change
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