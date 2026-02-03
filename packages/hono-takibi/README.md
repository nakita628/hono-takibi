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
          schema: z
            .object({ message: z.string().openapi({ example: 'Hono Takibi🔥' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})
```

## CLI

### Options

```bash
Options:
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
  --readonly                  make schemas immutable (adds .readonly() and 'as const')
  --template                  generate app file and handler stubs
  --test                      generate test files with vitest and faker.js
  --base-path <path>          api prefix (default: /)
  -h, --help                  display help for command
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
    readonly: true,
  },
  rpc: {
    output: './src/rpc',
    import: '../client',
    split: true,
    client: 'client',
    parseResponse: true, // Wrap calls with parseResponse() for type-safe response parsing
  },
  // Client library integrations
  'tanstack-query': {
    output: './src/tanstack-query',
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
  swr: {
    output: './src/swr',
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
  // Testing & Mock
  test: {
    output: './src/test.ts',
    import: '../index',
  },
  mock: {
    output: './src/mock.ts',
  },
})
```

### Essentials

* Put **`hono-takibi.config.ts`** at repo root.
* Default-export with `defineConfig(...)`.
* `input`: **`openapi.yaml`** (recommended), or `*.json` / `*.tsp`.

> **About `split`**
>
> * `split: true` → `output` is a **directory**; many files + `index.ts`.
> * `split` **omitted** or `false` → `output` is a **single `*.ts` file** (one file only).

## Client Library Integrations

### TanStack Query

```ts
export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': { output: './src/routes.ts', exportSchemas: true },
  'tanstack-query': { output: './src/hooks', import: '../client', split: true, client: 'client' },
})
```

Generated hooks (from Pet Store):

```ts
import type {
  QueryFunctionContext,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/pet-store'

/**
 * Generates TanStack Query mutation key for PUT /pet
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutPetMutationKey() {
  return ['pet', 'PUT', '/pet'] as const
}

/**
 * Returns TanStack Query mutation options for PUT /pet
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutPetMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutPetMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.pet.$put>) =>
    parseResponse(client.pet.$put(args, clientOptions)),
})

/**
 * PUT /pet
 *
 * Update an existing pet
 *
 * Update an existing pet by Id
 */
export function usePutPet(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.$put>>>>>,
    Error,
    InferRequestType<typeof client.pet.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPutPetMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
```

## Test & Mock Generation

### Test Generation

Generate Vitest test files for your API endpoints:

```ts
export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': { output: './src/routes.ts' },
  test: {
    output: './src/test.ts',
    import: '../index', // Path to import the Hono app
  },
})
```

Generated test files use `@faker-js/faker` to generate mock data based on your OpenAPI schemas.

### Mock Server Generation

Generate a Hono mock server that returns fake data:

```ts
export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': { output: './src/routes.ts', readonly: true },
  mock: {
    output: './src/mock.ts',
  },
})
```

The mock server generates realistic responses using `@faker-js/faker` based on your OpenAPI response schemas.

## Vite Plugin

Auto-regenerate on file changes:

```ts
// vite.config.ts
import { honoTakibiVite } from 'hono-takibi/vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [honoTakibiVite()],
})
```

![](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/vite/hono-takibi-vite.gif)

## Limitations

**This package is in active development and may introduce breaking changes without prior notice.**

- Not all OpenAPI features are supported
- Complex schemas might not convert correctly
- Some OpenAPI validations may not be perfectly converted to Zod
- Schema generation logic might be updated
- Output code structure could be modified

We strongly recommend:
- Pinning to exact versions in production
- Testing thoroughly when updating versions
- Reviewing generated code after updates

## Contributing

We welcome feedback and contributions to improve the tool!

If you find any issues with the generated code or have suggestions for improvements, please:

- Open an issue at [GitHub Issues](https://github.com/nakita628/hono-takibi/issues)
- Submit a pull request with your improvements

Your contributions help make this tool better for the community.

## License

Distributed under the MIT License. See [LICENSE](https://github.com/nakita628/hono-takibi?tab=MIT-1-ov-file) for more information.