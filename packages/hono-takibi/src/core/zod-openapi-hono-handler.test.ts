import fs from 'node:fs'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { OpenAPI } from '../openapi/index.js'
import { zodOpenAPIHonoHandler } from './zod-openapi-hono-handler.js'

// Test run
// pnpm vitest run ./src/core/zod-openapi-hono-handler.test.ts

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

describe('zodOpenAPIHonoHandler', () => {
  beforeEach(() => {
    fs.rmSync('tmp-route', { recursive: true, force: true })
  })
  afterEach(() => {
    fs.rmSync('tmp-route', { recursive: true, force: true })
  })
  it('zodOpenAPIHonoHandler test false', async () => {
    const result = await zodOpenAPIHonoHandler(openapi, 'tmp-route/test.ts', false)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).toBe(undefined)
    }
    const indexResult = fs.readFileSync('tmp-route/handlers/index.ts', 'utf-8')
    const indexExpected = `export * from './hono.ts'
export * from './honoX.ts'
export * from './zodOpenapiHono.ts'
`
    expect(indexResult).toBe(indexExpected)

    const honoResult = fs.readFileSync('tmp-route/handlers/hono.ts', 'utf-8')
    const honoExpected = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getHonoRoute } from '../test'

export const getHonoRouteHandler: RouteHandler<typeof getHonoRoute> = async (c) => {}
`
    expect(honoResult).toBe(honoExpected)

    const honoXResult = fs.readFileSync('tmp-route/handlers/honoX.ts', 'utf-8')
    const honoXExpected = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getHonoXRoute } from '../test'

export const getHonoXRouteHandler: RouteHandler<typeof getHonoXRoute> = async (c) => {}
`
    expect(honoXResult).toBe(honoXExpected)

    const zodOpenAPIHonoResult = fs.readFileSync('tmp-route/handlers/zodOpenAPIHono.ts', 'utf-8')
    const zodOpenAPIHonoExpected = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getZodOpenapiHonoRoute } from '../test'

export const getZodOpenapiHonoRouteHandler: RouteHandler<typeof getZodOpenapiHonoRoute> = async (
  c,
) => {}
`
    expect(zodOpenAPIHonoResult).toBe(zodOpenAPIHonoExpected)

    expect(fs.existsSync('tmp-route/handlers/hono.test.ts')).toBe(false)
    expect(fs.existsSync('tmp-route/handlers/honoX.test.ts')).toBe(false)
    expect(fs.existsSync('tmp-route/handlers/zodOpenapiHono.test.ts')).toBe(false)
  })

  it('zodOpenAPIHonoHandler test true', async () => {
    const result = await zodOpenAPIHonoHandler(openapi, 'tmp-route/test.ts', true)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).toBe(undefined)
    }
    const indexResult = fs.readFileSync('tmp-route/handlers/index.ts', 'utf-8')
    const indexExpected = `export * from './hono.ts'
export * from './honoX.ts'
export * from './zodOpenapiHono.ts'
`
    expect(indexResult).toBe(indexExpected)

    const honoResult = fs.readFileSync('tmp-route/handlers/hono.ts', 'utf-8')
    const honoExpected = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getHonoRoute } from '../test'

export const getHonoRouteHandler: RouteHandler<typeof getHonoRoute> = async (c) => {}
`
    expect(honoResult).toBe(honoExpected)

    const honoXResult = fs.readFileSync('tmp-route/handlers/honoX.ts', 'utf-8')
    const honoXExpected = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getHonoXRoute } from '../test'

export const getHonoXRouteHandler: RouteHandler<typeof getHonoXRoute> = async (c) => {}
`
    expect(honoXResult).toBe(honoXExpected)

    const zodOpenAPIHonoResult = fs.readFileSync('tmp-route/handlers/zodOpenAPIHono.ts', 'utf-8')
    const zodOpenAPIHonoExpected = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getZodOpenapiHonoRoute } from '../test'

export const getZodOpenapiHonoRouteHandler: RouteHandler<typeof getZodOpenapiHonoRoute> = async (
  c,
) => {}
`
    expect(zodOpenAPIHonoResult).toBe(zodOpenAPIHonoExpected)

    expect(fs.existsSync('tmp-route/handlers/hono.test.ts')).toBe(true)
    expect(fs.existsSync('tmp-route/handlers/honoX.test.ts')).toBe(true)
    expect(fs.existsSync('tmp-route/handlers/zodOpenapiHono.test.ts')).toBe(true)
  })
})
