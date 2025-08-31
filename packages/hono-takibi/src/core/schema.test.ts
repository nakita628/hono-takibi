import fs from 'node:fs'
import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { OpenAPI } from '../openapi'
import { schema } from './schema'

// Test run
// pnpm vitest run ./src/core/schema.test.ts

const openapi: OpenAPI = {
  openapi: '3.0.0',
  info: {
    title: '(title)',
    version: '0.0.0',
  },
  tags: [
    {
      name: 'Hono',
    },
  ],
  paths: {
    '/hono': {
      get: {
        operationId: 'HonoService_hono',
        parameters: [],
        responses: {
          '200': {
            description: 'The request has succeeded.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Hono',
                },
              },
            },
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
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/HonoX',
                },
              },
            },
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
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ZodOpenAPIHono',
                },
              },
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
        properties: {
          hono: {
            type: 'string',
            enum: ['Hono'],
          },
        },
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
      HonoX: {
        type: 'object',
        required: ['honoX'],
        properties: {
          honoX: {
            type: 'string',
            enum: ['HonoX'],
          },
        },
      },
      ZodOpenAPIHono: {
        type: 'object',
        required: ['zod-openapi-hono'],
        properties: {
          'zod-openapi-hono': {
            type: 'string',
            enum: ['ZodOpenAPIHono'],
          },
        },
      },
    },
  },
}

describe('schema()', () => {
  beforeEach(() => {
    fs.writeFileSync('openapi.json', JSON.stringify(openapi))
  })
  afterEach(() => {
    if (fs.existsSync('test')) {
      fs.rmSync('test', { recursive: true, force: true })
    }
  })
  afterAll(() => {
    if (fs.existsSync('openapi.json')) {
      fs.rmSync('openapi.json', { force: true })
    }
  })
  // output test export type true split false
  it('should generate schema code export type true split true', async () => {
    const result = await schema('openapi.json', 'test/index.ts', true)
    const index = fs.readFileSync('test/index.ts', 'utf-8')
    const indexExpected = `import { z } from '@hono/zod-openapi'

export const HonoSchema = z.object({ hono: z.literal('Hono') }).openapi('Hono')

export type Hono = z.infer<typeof HonoSchema>

export const HonoXSchema = z.object({ honoX: z.literal('HonoX') }).openapi('HonoX')

export type HonoX = z.infer<typeof HonoXSchema>

export const ZodOpenAPIHonoSchema = z
  .object({ 'zod-openapi-hono': z.literal('ZodOpenAPIHono') })
  .openapi('ZodOpenAPIHono')

export type ZodOpenAPIHono = z.infer<typeof ZodOpenAPIHonoSchema>

export const HonoUnionSchema = z
  .object({ 'hono-union': z.union([HonoSchema, HonoXSchema, ZodOpenAPIHonoSchema]) })
  .openapi('HonoUnion')

export type HonoUnion = z.infer<typeof HonoUnionSchema>
`

    expect(index).toBe(indexExpected)
    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated schema code written to test/index.ts',
    })
  })

  // output test export type false split false
  it('should generate schema code export type true split true', async () => {
    const result = await schema('openapi.json', 'test/index.ts', false)

    const index = fs.readFileSync('test/index.ts', 'utf-8')

    const indexExpected = `import { z } from '@hono/zod-openapi'

export const HonoSchema = z.object({ hono: z.literal('Hono') }).openapi('Hono')

export const HonoXSchema = z.object({ honoX: z.literal('HonoX') }).openapi('HonoX')

export const ZodOpenAPIHonoSchema = z
  .object({ 'zod-openapi-hono': z.literal('ZodOpenAPIHono') })
  .openapi('ZodOpenAPIHono')

export const HonoUnionSchema = z
  .object({ 'hono-union': z.union([HonoSchema, HonoXSchema, ZodOpenAPIHonoSchema]) })
  .openapi('HonoUnion')
`

    expect(index).toBe(indexExpected)
    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated schema code written to test/index.ts',
    })
  })

  // output test export type false split true
  it('should generate schema code export type true split true', async () => {
    const result = await schema('openapi.json', 'test', false, true)

    const index = fs.readFileSync('test/index.ts', 'utf-8')
    const indexExpected = `export * from './hono'
export * from './honoX'
export * from './zodOpenAPIHono'
export * from './honoUnion'
`
    expect(index).toBe(indexExpected)

    const hono = fs.readFileSync('test/hono.ts', 'utf-8')
    const honoExpected = `import { z } from '@hono/zod-openapi'

export const HonoSchema = z.object({ hono: z.literal('Hono') }).openapi('Hono')
`
    expect(hono).toBe(honoExpected)

    const honox = fs.readFileSync('test/honoX.ts', 'utf-8')
    const honoxExpected = `import { z } from '@hono/zod-openapi'

export const HonoXSchema = z.object({ honoX: z.literal('HonoX') }).openapi('HonoX')
`

    expect(honox).toBe(honoxExpected)
    const zodopenapihono = fs.readFileSync('test/zodOpenAPIHono.ts', 'utf-8')
    const zodopenapihonoExpected = `import { z } from '@hono/zod-openapi'

export const ZodOpenAPIHonoSchema = z
  .object({ 'zod-openapi-hono': z.literal('ZodOpenAPIHono') })
  .openapi('ZodOpenAPIHono')
`
    expect(zodopenapihono).toBe(zodopenapihonoExpected)
    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated schema code written to test/*.ts (index.ts included)',
    })
  })

  // output test export type true split true
  it('should generate schema code export type true split true', async () => {
    const result = await schema('openapi.json', 'test', true, true)

    const index = fs.readFileSync('test/index.ts', 'utf-8')
    const indexExpected = `export * from './hono'
export * from './honoX'
export * from './zodOpenAPIHono'
export * from './honoUnion'
`
    expect(index).toBe(indexExpected)

    const hono = fs.readFileSync('test/hono.ts', 'utf-8')
    const honoExpected = `import { z } from '@hono/zod-openapi'

export const HonoSchema = z.object({ hono: z.literal('Hono') }).openapi('Hono')

export type Hono = z.infer<typeof HonoSchema>
`
    expect(hono).toBe(honoExpected)

    const honox = fs.readFileSync('test/honoX.ts', 'utf-8')
    const honoxExpected = `import { z } from '@hono/zod-openapi'

export const HonoXSchema = z.object({ honoX: z.literal('HonoX') }).openapi('HonoX')

export type HonoX = z.infer<typeof HonoXSchema>
`

    expect(honox).toBe(honoxExpected)
    const zodopenapihono = fs.readFileSync('test/zodOpenAPIHono.ts', 'utf-8')
    const zodopenapihonoExpected = `import { z } from '@hono/zod-openapi'

export const ZodOpenAPIHonoSchema = z
  .object({ 'zod-openapi-hono': z.literal('ZodOpenAPIHono') })
  .openapi('ZodOpenAPIHono')

export type ZodOpenAPIHono = z.infer<typeof ZodOpenAPIHonoSchema>
`
    expect(zodopenapihono).toBe(zodopenapihonoExpected)
    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated schema code written to test/*.ts (index.ts included)',
    })
  })
})
