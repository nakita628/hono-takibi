// src/core/route.test.ts
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, it, expect } from 'vitest'
import { route } from './route.js'
import { OpenAPI } from '../openapi/index.js'

// Test run
// pnpm vitest run ./src/core/route.test.ts

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
      Hono: { type: 'object', required: ['hono'], properties: { hono: { type: 'string', enum: ['Hono'] } } },
      HonoX: { type: 'object', required: ['honoX'], properties: { honoX: { type: 'string', enum: ['HonoX'] } } },
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
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route-'))
    try {
      const input = path.join(dir, 'openapi.json') as `${string}.yaml | ${string}.json`
      fs.writeFileSync(input, JSON.stringify(openapi))
      const out = path.join(dir, 'test.ts')

      const result = await route(input, out, '@packages/schemas')
      const index = fs.readFileSync(out, 'utf-8')

      const expected = `import { createRoute } from '@hono/zod-openapi'
import { HonoSchema, HonoXSchema, ZodOpenAPIHonoSchema } from '@packages/schemas'

export const getHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/hono',
  operationId: 'HonoService_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})

export const getHonoxRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/honox',
  operationId: 'HonoXService_honox',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoXSchema } },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/zod-openapi-hono',
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
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route-'))
    try {
      const input = path.join(dir, 'openapi.json')  as `${string}.yaml | ${string}.json`
      fs.writeFileSync(input, JSON.stringify(openapi))
      const outDir = path.join(dir, 'test')

      const result = await route(input, outDir, '@packages/schemas', true)

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
  tags: ['Hono'],
  method: 'get',
  path: '/hono',
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
  tags: ['Hono'],
  method: 'get',
  path: '/honox',
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
  tags: ['Hono'],
  method: 'get',
  path: '/zod-openapi-hono',
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
