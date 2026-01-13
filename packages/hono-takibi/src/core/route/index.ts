/**
 * Route generation module.
 *
 * Generates Hono route definitions from OpenAPI path operations.
 *
 * ```mermaid
 * flowchart TD
 *   A["route(openAPI, routes, components)"] --> B["routeCode(openAPI)"]
 *   B --> C{"split mode?"}
 *   C -->|No| D["Write single file"]
 *   C -->|Yes| E["Extract route blocks"]
 *   E --> F["Write individual files"]
 *   F --> G["Write index.ts barrel"]
 * ```
 *
 * @module core/route
 */
import path from 'node:path'
import { routeCode } from '../../generator/zod-openapi-hono/openapi/routes/index.js'
import { core, makeBarell, makeImports } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { lowerFirst } from '../../utils/index.js'

/**
 * Generates Hono route files from OpenAPI specification.
 *
 * Creates route definitions with Zod validation based on OpenAPI paths.
 * Supports both single file output and split mode (one file per route).
 *
 * ```mermaid
 * flowchart LR
 *   subgraph Input
 *     A["OpenAPI Spec"]
 *   end
 *   subgraph Output
 *     B["routes.ts"]
 *     C["routes/getUsers.ts"]
 *     D["routes/postUsers.ts"]
 *     E["routes/index.ts"]
 *   end
 *   A -->|split=false| B
 *   A -->|split=true| C
 *   A -->|split=true| D
 *   A -->|split=true| E
 * ```
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param routes - Route output configuration
 * @param components - Component import configuration
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Single file output
 * await route(openAPI, { output: 'src/routes.ts' })
 *
 * // Split mode output
 * await route(openAPI, { output: 'src/routes', split: true })
 * // Creates: src/routes/getUsers.ts, src/routes/postUsers.ts, src/routes/index.ts
 * ```
 */
export async function route(
  openAPI: OpenAPI,
  routes?: {
    readonly output: string | `${string}.ts`
    readonly split?: boolean
  },
  components?: {
    readonly [k: string]: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }
  },
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!routes?.output) return { ok: false, error: 'routes.output is required' }

  const { output, split = false } = routes
  const routesSrc = routeCode(openAPI)

  // Write a single route file
  const writeFile = async (filePath: string, src: string) => {
    const code = makeImports(src, filePath, components)
    const result = await core(code, path.dirname(filePath), filePath)
    return result.ok ? { ok: true as const, value: filePath } : result
  }

  // Non-split mode: single file
  if (!split) {
    const result = await writeFile(output, routesSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated route code written to ${output}` }
  }

  // Split mode: extract route blocks from source
  const outDir = output.replace(/\.ts$/, '')
  const hits = Array.from(
    routesSrc.matchAll(/export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)Route\s*=/g),
  )
    .map((m) => ({ name: (m[1] ?? '').trim(), start: m.index ?? 0 }))
    .filter((h) => h.name.length > 0)
  const blocks = hits.map((h, i) => ({
    name: h.name,
    block: routesSrc.slice(h.start, hits[i + 1]?.start ?? routesSrc.length).trim(),
  }))

  // No blocks found: write as single file
  if (blocks.length === 0) {
    const result = await writeFile(String(output), routesSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated route code written to ${output}` }
  }

  // Write each route block and barrel file in parallel
  const allResults = await Promise.all([
    ...blocks.map(({ name, block }) => writeFile(`${outDir}/${lowerFirst(name)}.ts`, block)),
    core(
      makeBarell(Object.fromEntries(blocks.map((b) => [b.name, null]))),
      outDir,
      `${outDir}/index.ts`,
    ),
  ])

  const firstError = allResults.find((r) => !r.ok)
  if (firstError) return firstError

  return { ok: true, value: `Generated route code written to ${outDir}/*.ts (index.ts included)` }
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/core/route/index.ts
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest
  const fs = await import('node:fs')
  const os = await import('node:os')
  const path = await import('node:path')

  type OpenAPI = import('../../openapi/index.js').OpenAPI

  const openapi: OpenAPI = {
    openapi: '3.0.0',
    info: { title: '(title)', version: '0.0.0' },
    tags: [{ name: 'Hono' }],
    paths: {
      '/hono': {
        get: {
          operationId: 'HonoService_hono',
          parameters: [],
          responses: {
            '200': {
              description: 'The request has succeeded.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Hono' } } },
            },
          },
          tags: ['Hono'],
        },
      },
      '/honox': {
        get: {
          operationId: 'HonoXService_honox',
          parameters: [],
          responses: {
            '200': {
              description: 'The request has succeeded.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/HonoX' } } },
            },
          },
          tags: ['Hono'],
        },
      },
      '/zod-openapi-hono': {
        get: {
          operationId: 'ZodOpenAPIHonoService_zod_openapi_hono',
          parameters: [],
          responses: {
            '200': {
              description: 'The request has succeeded.',
              content: {
                'application/json': { schema: { $ref: '#/components/schemas/ZodOpenAPIHono' } },
              },
            },
          },
          tags: ['Hono'],
        },
      },
    },
    components: {
      schemas: {
        Hono: {
          type: 'object',
          required: ['hono'],
          properties: { hono: { type: 'string', enum: ['Hono'] } },
        },
        HonoX: {
          type: 'object',
          required: ['honoX'],
          properties: { honoX: { type: 'string', enum: ['HonoX'] } },
        },
        ZodOpenAPIHono: {
          type: 'object',
          required: ['zod-openapi-hono'],
          properties: { 'zod-openapi-hono': { type: 'string', enum: ['ZodOpenAPIHono'] } },
        },
        HonoUnion: {
          type: 'object',
          required: ['hono-union'],
          properties: {
            'hono-union': {
              anyOf: [
                { $ref: '#/components/schemas/Hono' },
                { $ref: '#/components/schemas/HonoX' },
                { $ref: '#/components/schemas/ZodOpenAPIHono' },
              ],
            },
          },
        },
      },
    },
  }

  describe('route', () => {
    it('should generate route code (single file)', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route'))
      try {
        const input = path.join(dir, 'openapi.json') as `${string}.yaml | ${string}.json`
        fs.writeFileSync(input, JSON.stringify(openapi))
        const out = path.join(dir, 'test.ts')

        const result = await route(
          openapi,
          { output: out },
          {
            schemas: {
              output: path.join(dir, 'schemas'),
              split: true,
              import: '@packages/schemas',
            },
          },
        )
        const index = fs.readFileSync(out, 'utf-8')
        const expected = `import { createRoute } from '@hono/zod-openapi'
import { HonoSchema, HonoXSchema, ZodOpenAPIHonoSchema } from '@packages/schemas'

export const getHonoRoute = createRoute({
  method: 'get',
  path: '/hono',
  tags: ['Hono'],
  operationId: 'HonoService_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})

export const getHonoxRoute = createRoute({
  method: 'get',
  path: '/honox',
  tags: ['Hono'],
  operationId: 'HonoXService_honox',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoXSchema } },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  method: 'get',
  path: '/zod-openapi-hono',
  tags: ['Hono'],
  operationId: 'ZodOpenAPIHonoService_zod_openapi_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: ZodOpenAPIHonoSchema } },
    },
  },
})
`

        expect(index).toBe(expected)
        expect(result).toStrictEqual({ ok: true, value: `Generated route code written to ${out}` })
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })

    it('should generate route code (split)', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route'))
      try {
        const input = path.join(dir, 'openapi.json') as `${string}.yaml | ${string}.json`
        fs.writeFileSync(input, JSON.stringify(openapi))
        const outDir = path.join(dir, 'test')

        const result = await route(
          openapi,
          { output: outDir, split: true },
          {
            schemas: {
              output: path.join(dir, 'schemas'),
              split: true,
              import: '@packages/schemas',
            },
          },
        )

        const index = fs.readFileSync(path.join(outDir, 'index.ts'), 'utf-8')
        const indexExpected = `export * from './getHono'
export * from './getHonox'
export * from './getZodOpenapiHono'
`
        const getHono = fs.readFileSync(path.join(outDir, 'getHono.ts'), 'utf-8')
        const getHonox = fs.readFileSync(path.join(outDir, 'getHonox.ts'), 'utf-8')
        const getZod = fs.readFileSync(path.join(outDir, 'getZodOpenapiHono.ts'), 'utf-8')
        const getHonoExpected = `import { createRoute } from '@hono/zod-openapi'
import { HonoSchema } from '@packages/schemas'

export const getHonoRoute = createRoute({
  method: 'get',
  path: '/hono',
  tags: ['Hono'],
  operationId: 'HonoService_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})
`

        const getHonoxExpected = `import { createRoute } from '@hono/zod-openapi'
import { HonoXSchema } from '@packages/schemas'

export const getHonoxRoute = createRoute({
  method: 'get',
  path: '/honox',
  tags: ['Hono'],
  operationId: 'HonoXService_honox',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoXSchema } },
    },
  },
})
`

        const getZodExpected = `import { createRoute } from '@hono/zod-openapi'
import { ZodOpenAPIHonoSchema } from '@packages/schemas'

export const getZodOpenapiHonoRoute = createRoute({
  method: 'get',
  path: '/zod-openapi-hono',
  tags: ['Hono'],
  operationId: 'ZodOpenAPIHonoService_zod_openapi_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: ZodOpenAPIHonoSchema } },
    },
  },
})
`

        expect(index).toBe(indexExpected)
        expect(getHono).toBe(getHonoExpected)
        expect(getHonox).toBe(getHonoxExpected)
        expect(getZod).toBe(getZodExpected)
        expect(result).toStrictEqual({
          ok: true,
          value: `Generated route code written to ${outDir}/*.ts (index.ts included)`,
        })
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })
}
