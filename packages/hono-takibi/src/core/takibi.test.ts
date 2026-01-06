import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../openapi/index.js'
import { takibi } from './takibi.js'

// Test run
// pnpm vitest run ./src/core/takibi.test.ts

const openapi: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'HonoTakibi🔥', version: 'v1' },
  tags: [{ name: 'Hono' }, { name: 'HonoX' }, { name: 'ZodOpenAPIHono' }],
  paths: {
    '/hono': {
      get: {
        tags: ['Hono'],
        summary: 'Hono',
        description: 'Hono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Hono🔥' } },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
    '/hono-x': {
      get: {
        tags: ['HonoX'],
        summary: 'HonoX',
        description: 'HonoX',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'HonoX🔥' } },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
    '/zod-openapi-hono': {
      get: {
        tags: ['ZodOpenAPIHono'],
        summary: 'ZodOpenAPIHono',
        description: 'ZodOpenAPIHono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'ZodOpenAPIHono🔥' } },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
  },
}

const runTakibi = async (
  openapi: OpenAPI,
  output: `${string}.ts`,
  options: { readonly template: boolean; readonly test: boolean; readonly basePath?: string },
) =>
  takibi(openapi, output, options.template, options.test, options.basePath ?? '/', {
    exportSchemasTypes: true,
    exportSchemas: true,
    exportParametersTypes: false,
    exportParameters: false,
    exportSecuritySchemes: false,
    exportRequestBodies: false,
    exportResponses: false,
    exportHeadersTypes: false,
    exportHeaders: false,
    exportExamples: false,
    exportLinks: false,
    exportCallbacks: false,
  })

describe('takibi generate (sandbox)', () => {
  it('should generate Hono app with OpenAPI routes (no template/test)', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-'))
    try {
      const input = path.join(
        dir,
        'openapi.json',
      ) as `${string}.yaml | ${string}.json | ${string}.tsp`
      const out = path.join(dir, 'zod-openapi-hono.ts') as `${string}.ts`
      fs.writeFileSync(input, JSON.stringify(openapi))

      const result = await runTakibi(openapi, out, { template: false, test: false })

      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value).toMatch('Generated code written to')
      }

      const generatedCode = fs.readFileSync(out, 'utf-8')
      const expectedCode = `import { createRoute, z } from '@hono/zod-openapi'

export const getHonoRoute = createRoute({
  method: 'get',
  path: '/hono',
  tags: ['Hono'],
  summary: 'Hono',
  description: 'Hono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'Hono🔥' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const getHonoXRoute = createRoute({
  method: 'get',
  path: '/hono-x',
  tags: ['HonoX'],
  summary: 'HonoX',
  description: 'HonoX',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'HonoX🔥' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  method: 'get',
  path: '/zod-openapi-hono',
  tags: ['ZodOpenAPIHono'],
  summary: 'ZodOpenAPIHono',
  description: 'ZodOpenAPIHono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'ZodOpenAPIHono🔥' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})
`
      expect(generatedCode).toBe(expectedCode)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate Hono app with OpenAPI routes (template & test ON)', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-'))
    try {
      const input = path.join(
        dir,
        'openapi.json',
      ) as `${string}.yaml | ${string}.json | ${string}.tsp`
      const out = path.join(dir, 'zod-openapi-hono.ts') as `${string}.ts`
      fs.writeFileSync(input, JSON.stringify(openapi))

      const result = await runTakibi(openapi, out, { template: true, test: true })

      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value).toMatch('Generated code and template files written')
      }
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('templateCode (sandbox)', () => {
  it('--template --test (first run: no main.ts)', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tpl-'))
    try {
      const input = path.join(
        dir,
        'openapi.json',
      ) as `${string}.yaml | ${string}.json | ${string}.tsp`
      const srcDir = path.join(dir, 'tmp-template', 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      fs.writeFileSync(input, JSON.stringify(openapi))

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      const result = await runTakibi(openapi, out, { template: true, test: true })

      expect(fs.existsSync(path.join(srcDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'hono.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'hono.test.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'honoX.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'honoX.test.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'zodOpenapiHono.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'zodOpenapiHono.test.ts'))).toBe(true)
      expect(result).toStrictEqual({ ok: true, value: 'Generated code and template files written' })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('--template --test false', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tpl-'))
    try {
      const input = path.join(
        dir,
        'openapi.json',
      ) as `${string}.yaml | ${string}.json | ${string}.tsp`
      const srcDir = path.join(dir, 'tmp-template', 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      fs.writeFileSync(input, JSON.stringify(openapi))

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      const result = await runTakibi(openapi, out, { template: true, test: false })

      expect(fs.existsSync(path.join(srcDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'hono.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'honoX.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'zodOpenapiHono.ts'))).toBe(true)
      expect(result).toStrictEqual({ ok: true, value: 'Generated code and template files written' })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('basePath "api" with test: true', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tpl-'))
    try {
      const input = path.join(
        dir,
        'openapi.json',
      ) as `${string}.yaml | ${string}.json | ${string}.tsp`
      const srcDir = path.join(dir, 'tmp-template', 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      fs.writeFileSync(input, JSON.stringify(openapi))

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      const result = await runTakibi(openapi, out, { template: true, test: true, basePath: '/api' })

      expect(fs.existsSync(path.join(srcDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'hono.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'hono.test.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'honoX.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'honoX.test.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'zodOpenapiHono.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'zodOpenapiHono.test.ts'))).toBe(true)

      const appCode = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      expect(appCode).toContain("new OpenAPIHono().basePath('/api')")

      expect(result).toStrictEqual({ ok: true, value: 'Generated code and template files written' })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('basePath "api" with test: false', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-tpl-'))
    try {
      const input = path.join(
        dir,
        'openapi.json',
      ) as `${string}.yaml | ${string}.json | ${string}.tsp`
      const srcDir = path.join(dir, 'tmp-template', 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      fs.writeFileSync(input, JSON.stringify(openapi))

      const out = path.join(srcDir, 'route.ts') as `${string}.ts`
      const result = await runTakibi(openapi, out, {
        template: true,
        test: false,
        basePath: '/api',
      })

      expect(fs.existsSync(path.join(srcDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'hono.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'honoX.ts'))).toBe(true)
      expect(fs.existsSync(path.join(srcDir, 'handlers', 'zodOpenapiHono.ts'))).toBe(true)

      const appCode = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf-8')
      expect(appCode).toContain("new OpenAPIHono().basePath('/api')")

      expect(result).toStrictEqual({ ok: true, value: 'Generated code and template files written' })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
