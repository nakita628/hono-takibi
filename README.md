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
  // Client library integrations
  'tanstack-query': {
    output: './src/tanstack-query',
    import: '../client',
    split: true,
  },
  'svelte-query': {
    output: './src/svelte-query',
    import: '../client',
    split: true,
  },
  swr: {
    output: './src/swr',
    import: '../client',
    split: true,
  },
  'vue-query': {
    output: './src/vue-query',
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

## Schema Options

### `readonly` Mode

Enable `readonly: true` to generate immutable Zod schemas:

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    output: './src/index.ts',
    readonly: true,  // Enable immutable schemas
    exportSchemas: true,
  },
})
```

**Without `readonly`** (from Pet Store):
```ts
const CategorySchema = z
  .object({
    id: z.int64().exactOptional().openapi({ example: 1 }),
    name: z.string().exactOptional().openapi({ example: 'Dogs' }),
  })
  .openapi({ xml: { name: 'category' } })
  .openapi('Category')

const PetSchema = z
  .object({
    id: z.int64().exactOptional().openapi({ example: 10 }),
    name: z.string().openapi({ example: 'doggie' }),
    category: CategorySchema.exactOptional(),
    photoUrls: z.array(z.string().openapi({ xml: { name: 'photoUrl' } })).openapi({ xml: { wrapped: true } }),
    tags: z.array(TagSchema).exactOptional().openapi({ xml: { wrapped: true } }),
    status: z.enum(['available', 'pending', 'sold']).exactOptional().openapi({ description: 'pet status in the store' }),
  })
  .openapi({ required: ['name', 'photoUrls'], xml: { name: 'pet' } })
  .openapi('Pet')
```

**With `readonly: true`** (from Pet Store):
```ts
const CategorySchema = z
  .object({
    id: z.int64().exactOptional().openapi({ example: 1 }),
    name: z.string().exactOptional().openapi({ example: 'Dogs' }),
  })
  .openapi({ xml: { name: 'category' } })
  .readonly()  // Added
  .openapi('Category')

const PetSchema = z
  .object({
    id: z.int64().exactOptional().openapi({ example: 10 }),
    name: z.string().openapi({ example: 'doggie' }),
    category: CategorySchema.exactOptional(),
    photoUrls: z.array(z.string().openapi({ xml: { name: 'photoUrl' } })).openapi({ xml: { wrapped: true } }),
    tags: z.array(TagSchema).exactOptional().openapi({ xml: { wrapped: true } }),
    status: z.enum(['available', 'pending', 'sold']).exactOptional().openapi({ description: 'pet status in the store' }),
  })
  .openapi({ required: ['name', 'photoUrls'], xml: { name: 'pet' } })
  .readonly()  // Added
  .openapi('Pet')

// Route definitions also use `as const`
export const getPetPetIdRoute = createRoute({
  method: 'get',
  path: '/pet/{petId}',
  // ...
} as const)  // Added
```

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

## Client Library Integrations

| Library | Package | Config Key |
|---------|---------|------------|
| [TanStack Query](https://tanstack.com/query/latest) (React) | `@tanstack/react-query` | `tanstack-query` |
| [Svelte Query](https://tanstack.com/query/latest/docs/framework/svelte/overview) | `@tanstack/svelte-query` | `svelte-query` |
| [SWR](https://swr.vercel.app/) | `swr` | `swr` |
| [Vue Query](https://tanstack.com/query/latest/docs/framework/vue/overview) | `@tanstack/vue-query` | `vue-query` |

### TanStack Query (React)

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': { output: './src/index.ts', exportSchemas: true },
  'tanstack-query': { output: './src/hooks', import: '../client', split: true },
})
```

Generated code:

```ts
import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getGetPetFindByStatusQueryKey(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
) {
  return ['GET', '/pet/findByStatus', args] as const
}

export function useGetPetFindByStatus(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
  options?: {
    query?: UseQueryOptions<InferResponseType<typeof client.pet.findByStatus.$get> | undefined>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useQuery<InferResponseType<typeof client.pet.findByStatus.$get> | undefined>(
    {
      queryKey: getGetPetFindByStatusQueryKey(args),
      queryFn: async () => parseResponse(client.pet.findByStatus.$get(args, options?.client)),
      ...options?.query,
    },
    queryClient,
  )
}

export function usePostPet(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.pet.$post> | undefined,
      Error,
      InferRequestType<typeof client.pet.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.pet.$post> | undefined,
    Error,
    InferRequestType<typeof client.pet.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.pet.$post(args, options?.client)),
    },
    queryClient,
  )
}
```

### Svelte Query

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': { output: './src/index.ts', exportSchemas: true },
  'svelte-query': { output: './src/hooks', import: '../client', split: true },
})
```

Generated code:

```ts
import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getGetPetFindByStatusQueryKey(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
) {
  return ['GET', '/pet/findByStatus', args] as const
}

export function createGetPetFindByStatus(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.pet.findByStatus.$get> | undefined>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createQuery<InferResponseType<typeof client.pet.findByStatus.$get> | undefined>(
    {
      queryKey: getGetPetFindByStatusQueryKey(args),
      queryFn: async () => parseResponse(client.pet.findByStatus.$get(args, options?.client)),
      ...options?.query,
    },
    queryClient,
  )
}

export function createPostPet(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.pet.$post> | undefined,
      Error,
      InferRequestType<typeof client.pet.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.pet.$post> | undefined,
    Error,
    InferRequestType<typeof client.pet.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.pet.$post(args, options?.client)),
    },
    queryClient,
  )
}
```

### SWR

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': { output: './src/index.ts', exportSchemas: true },
  swr: { output: './src/hooks', import: '../client', split: true },
})
```

Generated code:

```ts
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../client'

export function getGetPetFindByStatusKey(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
): Key {
  return ['GET', '/pet/findByStatus', args] as const
}

export function useGetPetFindByStatus(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.pet.findByStatus.$get>>
    client?: ClientRequestOptions
  },
) {
  return useSWR<InferResponseType<typeof client.pet.findByStatus.$get>>(
    getGetPetFindByStatusKey(args),
    async () => parseResponse(client.pet.findByStatus.$get(args, options?.client)),
    options?.swr,
  )
}

export function usePostPet(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.pet.$post>,
    Error,
    string,
    InferRequestType<typeof client.pet.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.pet.$post>,
    Error,
    string,
    InferRequestType<typeof client.pet.$post>
  >(
    'POST /pet',
    async (_, { arg }) => parseResponse(client.pet.$post(arg, options?.client)),
    options?.swr,
  )
}
```

### Vue Query

```ts
import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': { output: './src/index.ts', exportSchemas: true },
  'vue-query': { output: './src/hooks', import: '../client', split: true },
})
```

Generated code:

```ts
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

export function getGetPetFindByStatusQueryKey(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
) {
  return ['GET', '/pet/findByStatus', args] as const
}

export function useGetPetFindByStatus(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return useQuery<InferResponseType<typeof client.pet.findByStatus.$get> | undefined>({
    queryKey: getGetPetFindByStatusQueryKey(args),
    queryFn: async () => parseResponse(client.pet.findByStatus.$get(args, clientOptions)),
  })
}

export function usePostPet(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.pet.$post> | undefined,
    Error,
    InferRequestType<typeof client.pet.$post>
  >({ mutationFn: async (args) => parseResponse(client.pet.$post(args, clientOptions)) })
}
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