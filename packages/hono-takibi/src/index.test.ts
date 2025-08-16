import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { OpenAPI } from './openapi/index.js'

// Test run
// pnpm vitest run ./src/index.test.ts

// Normal
describe.concurrent('Hono Takibi Normal Test', () => {
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
})

describe('cli test', () => {
  const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => undefined) as never)
  const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

  const flushMicrotasks = () => new Promise<void>((r) => setImmediate(r))

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    flushMicrotasks()
  })
  it('logs message & exits(0) on success', async () => {
    vi.doMock('./cli/index.js', async () => {
      const actual = await vi.importActual<typeof import('./cli/index.js')>('./cli/index.js')
      return {
        ...actual,
        honoTakibi: vi.fn(() => Promise.resolve({ ok: true, value: 'OK' } as const)),
      }
    })

    await import('./index.js')

    expect(logSpy).toHaveBeenCalledWith('OK')
    expect(exitSpy).toHaveBeenCalledWith(0)
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('logs error & exits(1) on failure', async () => {
    vi.doMock('./cli/index.js', async () => {
      const actual = await vi.importActual<typeof import('./cli/index.js')>('./cli/index.js')
      return {
        ...actual,
        honoTakibi: vi.fn(() => Promise.resolve({ ok: false, error: 'FAIL' } as const)),
      }
    })

    await import('./index.js')

    expect(errorSpy).toHaveBeenCalledWith('FAIL')
    expect(exitSpy).toHaveBeenCalledWith(1)
    expect(logSpy).not.toHaveBeenCalled()
  })
})
