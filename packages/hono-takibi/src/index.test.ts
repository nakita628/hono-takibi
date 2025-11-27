import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { OpenAPI } from './openapi/index.js'

// Test run
// pnpm vitest run ./src/index.test.ts

describe('Hono Takibi Normal Test', () => {
  const tmpOpenAPI: OpenAPI = {
    openapi: '3.0.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Test: {
          type: 'object',
          required: ['test'],
          properties: {
            test: {
              type: 'string',
            },
          },
        },
      },
    },
    paths: {
      '/test': {
        post: {
          summary: 'Test endpoint',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Test',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful test',
            },
          },
        },
      },
    },
  }

  beforeEach(() => {
    fs.rmSync('tmp-openapi', { recursive: true, force: true })
    fs.rmSync('tmp-route', { recursive: true, force: true })

    fs.mkdirSync('tmp-openapi', { recursive: true })
    fs.writeFileSync('tmp-openapi/test.json', JSON.stringify(tmpOpenAPI))

    fs.mkdirSync('tmp-route', { recursive: true })
  })

  afterEach(() => {
    fs.rmSync('tmp-openapi', { recursive: true, force: true })
    fs.rmSync('tmp-route', { recursive: true, force: true })
  })

  // #1: exportSchema=true, exportType=true
  it('--export-schema --export-type', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    execSync(
      `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-schema --export-type`,
    )
    const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

export const TestSchema = z.object({ test: z.string() }).openapi('Test')

export type Test = z.infer<typeof TestSchema>

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: TestSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
    expect(result).toBe(expected)
  })

  // #2: exportSchema=true, exportType=false
  it('--export-schema', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    execSync(
      `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-schema`,
    )
    const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

export const TestSchema = z.object({ test: z.string() }).openapi('Test')

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: TestSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
    expect(result).toBe(expected)
  })

  // #3: exportSchema=false, exportType=true
  it('--export-type', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    execSync(
      `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --export-type`,
    )
    const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

const TestSchema = z.object({ test: z.string() }).openapi('Test')

export type Test = z.infer<typeof TestSchema>

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: TestSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
    expect(result).toBe(expected)
  })

  // #4: exportSchema=false, exportType=false
  it('exportSchema=false, exportType=false', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    execSync(`node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts`)
    const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

const TestSchema = z.object({ test: z.string() }).openapi('Test')

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: TestSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
    expect(result).toBe(expected)
  })

  // #5: template
  it('--template', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    execSync(`node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --template`)
    const routeResult = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
    const routeExpected = `import { createRoute, z } from '@hono/zod-openapi'

const TestSchema = z.object({ test: z.string() }).openapi('Test')

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: TestSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
    expect(routeResult).toBe(routeExpected)

    const handlerResult = fs.readFileSync('tmp-route/handlers/test.ts', {
      encoding: 'utf-8',
    })

    const handlerExpected = `import type { RouteHandler } from '@hono/zod-openapi'
import type { postTestRoute } from '../test'

export const postTestRouteHandler: RouteHandler<typeof postTestRoute> = async (c) => {}
`
    expect(handlerResult).toBe(handlerExpected)
  })
})

describe('--template mode test', () => {
  const tmpOpenAPI: OpenAPI = {
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

  beforeEach(() => {
    fs.rmSync('tmp-openapi', { recursive: true, force: true })
    fs.rmSync('tmp-route', { recursive: true, force: true })

    fs.mkdirSync('tmp-openapi', { recursive: true })
    fs.writeFileSync('tmp-openapi/test.json', JSON.stringify(tmpOpenAPI))

    fs.mkdirSync('tmp-route', { recursive: true })
  })

  afterEach(() => {
    fs.rmSync('tmp-openapi', { recursive: true, force: true })
    fs.rmSync('tmp-route', { recursive: true, force: true })
  })

  it('--template --test false', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    execSync(`node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --template`)
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

  it('--template --test true', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    execSync(
      `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --template --test true`,
    )
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

  it('zodOpenAPIHonoHandler test true', async () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    execSync(
      `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --template --test true`,
    )
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

describe('cli test', () => {
  let exitSpy: ReturnType<typeof vi.spyOn>
  let logSpy: ReturnType<typeof vi.spyOn>
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.resetModules()
    exitSpy = vi
      .spyOn(process, 'exit')
      // biome-ignore lint: test
      .mockImplementation(() => undefined as unknown as never) as any
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {}) as unknown as ReturnType<
      typeof vi.spyOn
    >
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {}) as unknown as ReturnType<
      typeof vi.spyOn
    >
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('logs message & exits(0) on success', async () => {
    vi.resetModules()

    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => undefined) as never)
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.doMock('./cli/index.js', async () => {
      const actual = await vi.importActual<typeof import('./cli/index.js')>('./cli/index.js')
      return { ...actual, honoTakibi: vi.fn(async () => ({ ok: true, value: 'OK' }) as const) }
    })

    await import('./index.js')

    const tick = () => new Promise<void>((r) => setImmediate(r))
    await tick()

    expect(logSpy).toHaveBeenCalledWith('OK')
    expect(exitSpy).toHaveBeenCalledWith(0)
    expect(errorSpy).not.toHaveBeenCalled()

    vi.restoreAllMocks()
  })

  it('logs error & exits(1) on failure', async () => {
    vi.resetModules()

    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => undefined) as never)
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.doMock('./cli/index.js', async () => {
      const actual = await vi.importActual<typeof import('./cli/index.js')>('./cli/index.js')
      return { ...actual, honoTakibi: vi.fn(async () => ({ ok: false, error: 'FAIL' }) as const) }
    })

    await import('./index.js')

    const tick = () => new Promise<void>((r) => setImmediate(r))
    await tick()

    expect(errorSpy).toHaveBeenCalledWith('FAIL')
    expect(exitSpy).toHaveBeenCalledWith(1)
    expect(logSpy).not.toHaveBeenCalled()

    vi.restoreAllMocks()
  })
})
