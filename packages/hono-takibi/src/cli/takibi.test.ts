import fs from 'node:fs'
import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { OpenAPI } from '../openapi/index.js'
import { takibi } from './takibi.js'

// Test run
// pnpm vitest run ./src/cli/takibi.test.ts

const openapi: OpenAPI = {
  openapi: '3.1.0',
  info: {
    title: 'HonoTakibi🔥',
    version: 'v1',
  },
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
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Hono🔥',
                    },
                  },
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
                  properties: {
                    message: {
                      type: 'string',
                      example: 'HonoX🔥',
                    },
                  },
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
                  properties: {
                    message: {
                      type: 'string',
                      example: 'ZodOpenAPIHono🔥',
                    },
                  },
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

describe('takibi generate', () => {
  beforeEach(() => {
    fs.writeFileSync('openapi.json', JSON.stringify(openapi))
  })

  afterEach(() => {
    fs.rmSync('openapi.json', { force: true })
    fs.rmSync('zod-openapi-hono.ts', { force: true })
  })

  afterAll(() => {
    if (fs.existsSync('openapi.json')) {
      fs.rmSync('openapi.json', { force: true })
    }
  })

  it('should generate Hono app with OpenAPI routes', async () => {
    const result = await takibi('openapi.json', 'zod-openapi-hono.ts', true, true, false, false)

    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated code written to zod-openapi-hono.ts',
    })

    const generatedCode = fs.readFileSync('zod-openapi-hono.ts', 'utf-8')
    const expectedCode = `import { createRoute, z } from '@hono/zod-openapi'

export const getHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/hono',
  summary: 'Hono',
  description: 'Hono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ message: z.string().openapi({ example: 'Hono🔥' }) }),
        },
      },
    },
  },
})

export const getHonoXRoute = createRoute({
  tags: ['HonoX'],
  method: 'get',
  path: '/hono-x',
  summary: 'HonoX',
  description: 'HonoX',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ message: z.string().openapi({ example: 'HonoX🔥' }) }),
        },
      },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  tags: ['ZodOpenAPIHono'],
  method: 'get',
  path: '/zod-openapi-hono',
  summary: 'ZodOpenAPIHono',
  description: 'ZodOpenAPIHono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ message: z.string().openapi({ example: 'ZodOpenAPIHono🔥' }) }),
        },
      },
    },
  },
})
`
    expect(generatedCode).toBe(expectedCode)
  })
})

describe('takibi generate', () => {
  afterEach(() => {
    fs.rmSync('openapi.json', { force: true })
    fs.rmSync('zod-openapi-hono.ts', { force: true })
    if (fs.existsSync('tmp')) {
      fs.rmdirSync('tmp', { recursive: true })
    }
  })

  it('should generate Hono app with OpenAPI routes', async () => {
    if (!fs.existsSync('openapi.json')) {
      fs.writeFileSync('openapi.json', JSON.stringify(openapi))
    }
    const result = await takibi('openapi.json', 'zod-openapi-hono.ts', true, true, true, true)

    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated code written to zod-openapi-hono.ts',
    })
  })
})

describe('templateCode', () => {
  beforeEach(() => {
    fs.mkdirSync('tmp-template/src', { recursive: true })
    fs.writeFileSync('openapi.json', JSON.stringify(openapi))
  })
  afterEach(() => {
    fs.rmSync('tmp-template', { recursive: true, force: true })
    fs.rmSync('openapi.json', { force: true })
  })

  const cwd = process.cwd()
  const path = `${cwd}/tmp-template/src/`

  // test true
  it('--template --test', async () => {
    const result = await takibi('openapi.json', 'tmp-template/src/route.ts', true, true, true, true)
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(false)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.test.ts`)).toBe(true)
    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated code and template files written',
    })
  })

  it('test true exists main.ts', async () => {
    // 1st run
    await takibi('openapi.json', 'tmp-template/src/route.ts', true, true, true, true)
    // 2nd run
    // exists main.ts
    const result = await takibi('openapi.json', 'tmp-template/src/route.ts', true, true, true, true)
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.test.ts`)).toBe(true)
    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated code and template files written',
    })
  })

  // test false
  it('--template --test false', async () => {
    const result = await takibi(
      'openapi.json',
      'tmp-template/src/route.ts',
      true,
      true,
      true,
      false,
    )
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(false)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated code and template files written',
    })
  })

  it('templateCode template true exists main.ts', async () => {
    // 1st run
    await takibi('openapi.json', 'tmp-template/src/route.ts', true, true, true, false)
    // 2nd run
    // exists main.ts
    const result = await takibi(
      'openapi.json',
      'tmp-template/src/route.ts',
      true,
      true,
      true,
      false,
    )
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated code and template files written',
    })
  })

  // basePath test
  it('basePath api test true', async () => {
    const result = await takibi(
      'openapi.json',
      'tmp-template/src/route.ts',
      true,
      true,
      true,
      true,
      'api',
    )
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.test.ts`)).toBe(true)
    // contain basePath
    const appCode = fs.readFileSync(`${path}/index.ts`, 'utf-8')
    expect(appCode).toContain("new OpenAPIHono().basePath('api')")
    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated code and template files written',
    })
  })

  it('basePath api test false', async () => {
    const result = await takibi(
      'openapi.json',
      'tmp-template/src/route.ts',
      true,
      true,
      true,
      false,
      'api',
    )
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
    // contain basePath
    const appCode = fs.readFileSync(`${path}/index.ts`, 'utf-8')
    expect(appCode).toContain("new OpenAPIHono().basePath('api')")
    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated code and template files written',
    })
  })

  it('basePath api test true exists main.ts', async () => {
    // 1st run
    await takibi('openapi.json', 'tmp-template/src/route.ts', true, true, true, true, 'api')
    // 2nd run
    // exists main.ts
    const result = await takibi(
      'openapi.json',
      'tmp-template/src/route.ts',
      true,
      true,
      true,
      true,
      'api',
    )
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.test.ts`)).toBe(true)
    // contain basePath
    const appCode = fs.readFileSync(`${path}/index.ts`, 'utf-8')
    expect(appCode).toContain("new OpenAPIHono().basePath('api')")
    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated code and template files written',
    })
  })

  it('basePath api test false exists main.ts', async () => {
    // 1st run
    await takibi('openapi.json', 'tmp-template/src/route.ts', true, true, true, false, 'api')
    // 2nd run
    // exists main.ts
    const result = await takibi(
      'openapi.json',
      'tmp-template/src/route.ts',
      true,
      true,
      true,
      false,
      'api',
    )
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
    // contain basePath
    const appCode = fs.readFileSync(`${path}/index.ts`, 'utf-8')
    expect(appCode).toContain("new OpenAPIHono().basePath('api')")
    expect(result).toStrictEqual({
      ok: true,
      value: 'Generated code and template files written',
    })
  })
})
