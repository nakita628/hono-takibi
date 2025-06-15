import { vi, beforeEach, beforeAll, afterAll, describe, it, expect } from 'vitest'
import type { OpenAPI } from './openapi/index.js'
import { execSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

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

  beforeAll(() => {
    if (!fs.existsSync('tmp-openapi')) {
      fs.mkdirSync('tmp-openapi', { recursive: true })
      fs.writeFileSync('tmp-openapi/test.json', JSON.stringify(tmpOpenAPI))
    }
    if (!fs.existsSync('tmp-route')) {
      fs.mkdirSync('tmp-route', { recursive: true })
    }
  })

  afterAll(() => {
    if (fs.existsSync('tmp-openapi/test.json')) {
      fs.unlinkSync('tmp-openapi/test.json')
    }
    if (fs.existsSync('tmp-openapi') && fs.readdirSync('tmp-openapi').length === 0) {
      fs.rmdirSync('tmp-openapi')
    }
    if (fs.existsSync('tmp-route/test.ts')) {
      fs.unlinkSync('tmp-route/test.ts')
    }
    if (fs.existsSync('tmp-route') && fs.readdirSync('tmp-route').length === 0) {
      fs.rmdirSync('tmp-route')
    }
  })

  it.concurrent('Hono Takibi CLI Normal', async () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    // CLI
    execSync(`node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts`, {
      stdio: 'pipe',
    })
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

  // 1
  // {
  //   schema: { name: 'PascalCase', export: true },
  //   type: { name: 'PascalCase', export: true }
  // },
  it('--naming-case-schema PascalCase --export-schema --naming-case-type PascalCase --export-type', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    // CLI
    // --naming-case-schema PascalCase --export-schema --naming-case-type PascalCase --export-type
    execSync(
      `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema PascalCase --export-schema --naming-case-type PascalCase --export-type`,
      {
        stdio: 'pipe',
      },
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

  // 2
  // {
  //   schema: { name: 'PascalCase', export: true },
  //   type: { name: 'PascalCase', export: false }
  // },
  it.concurrent(
    '--naming-case-schema PascalCase --naming-case-type PascalCase --export-type',
    () => {
      const openapiPath = path.join('tmp-openapi/test.json')
      // CLI
      // --naming-case-schema PascalCase --naming-case-type PascalCase --export-type
      execSync(
        `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema PascalCase --naming-case-type PascalCase --export-type`,
        {
          stdio: 'pipe',
        },
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
    },
  )

  // 3
  // {
  //   schema: { name: 'PascalCase', export: true },
  //   type: { name: 'camelCase', export: true }
  // },
  it.concurrent(
    '--naming-case-schema PascalCase --export-schema --naming-case-type camelCase --export-type',
    () => {
      const openapiPath = path.join('tmp-openapi/test.json')
      // CLI
      // --naming-case-schema PascalCase --export-schema --naming-case-type camelCase --export-type
      execSync(
        `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema PascalCase --export-schema --naming-case-type camelCase --export-type`,
        {
          stdio: 'pipe',
        },
      )
      const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
      const expected = `import { createRoute, z } from '@hono/zod-openapi'

export const TestSchema = z.object({ test: z.string() }).openapi('Test')

export type test = z.infer<typeof TestSchema>

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: TestSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
      expect(result).toBe(expected)
    },
  )

  // 4
  // {
  //   schema: { name: 'PascalCase', export: true },
  //   type: { name: 'camelCase', export: false }
  // },
  it.concurrent(
    '--naming-case-schema PascalCase --export-schema --naming-case-type camelCase',
    () => {
      const openapiPath = path.join('tmp-openapi/test.json')
      // CLI
      // --naming-case-schema PascalCase --export-schema --naming-case-type camelCase
      execSync(
        `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema PascalCase --export-schema --naming-case-type camelCase`,
        {
          stdio: 'pipe',
        },
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
    },
  )

  // 5
  // {
  //   schema: { name: 'PascalCase', export: false },
  //   type: { name: 'PascalCase', export: true }
  // },
  it.concurrent(
    '--naming-case-schema PascalCase --naming-case-type PascalCase --export-type',
    () => {
      const openapiPath = path.join('tmp-openapi/test.json')
      // CLI
      // --naming-case-schema PascalCase --naming-case-type PascalCase --export-type
      execSync(
        `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema PascalCase --naming-case-type PascalCase --export-type`,
        {
          stdio: 'pipe',
        },
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
    },
  )

  // 6
  // {
  //   schema: { name: 'PascalCase', export: false },
  //   type: { name: 'PascalCase', export: false }
  // },
  it.concurrent('--naming-case-schema PascalCase --naming-case-type PascalCase', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    // CLI
    // --naming-case-schema PascalCase --naming-case-type PascalCase
    execSync(
      `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema PascalCase --naming-case-type PascalCase`,
      {
        stdio: 'pipe',
      },
    )
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

  // 7
  // {
  //   schema: { name: 'PascalCase', export: false },
  //   type: { name: 'camelCase', export: true }
  // },
  it.concurrent(
    '--naming-case-schema PascalCase --naming-case-type camelCase --export-type',
    () => {
      const openapiPath = path.join('tmp-openapi/test.json')
      // CLI
      // --naming-case-schema PascalCase --naming-case-type camelCase --export-type
      execSync(
        `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema PascalCase --naming-case-type camelCase --export-type`,
        {
          stdio: 'pipe',
        },
      )
      const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
      const expected = `import { createRoute, z } from '@hono/zod-openapi'

const TestSchema = z.object({ test: z.string() }).openapi('Test')

export type test = z.infer<typeof TestSchema>

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: TestSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
      expect(result).toBe(expected)
    },
  )

  // 8
  // {
  //   schema: { name: 'PascalCase', export: false },
  //   type: { name: 'camelCase', export: false }
  // },
  it.concurrent('--naming-case-schema PascalCase --naming-case-type camelCase', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    // CLI
    // --naming-case-schema PascalCase --naming-case-type camelCase
    execSync(
      `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema PascalCase --naming-case-type camelCase`,
      {
        stdio: 'pipe',
      },
    )
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

  // 9
  // {
  //   schema: { name: 'camelCase', export: true },
  //   type: { name: 'PascalCase', export: true }
  // },
  it.concurrent(
    '--naming-case-schema camelCase --export-schema --naming-case-type PascalCase --export-type',
    () => {
      const openapiPath = path.join('tmp-openapi/test.json')
      // CLI
      // --naming-case-schema camelCase --export-schema --naming-case-type PascalCase --export-type
      execSync(
        `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema camelCase --export-schema --naming-case-type PascalCase --export-type`,
        {
          stdio: 'pipe',
        },
      )
      const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
      const expected = `import { createRoute, z } from '@hono/zod-openapi'

export const testSchema = z.object({ test: z.string() }).openapi('Test')

export type Test = z.infer<typeof testSchema>

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: testSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
      expect(result).toBe(expected)
    },
  )

  // 10
  // {
  //   schema: { name: 'camelCase', export: true },
  //   type: { name: 'PascalCase', export: false }
  // },
  it.concurrent(
    '--naming-case-schema camelCase --export-schema --naming-case-type PascalCase',
    () => {
      const openapiPath = path.join('tmp-openapi/test.json')
      // CLI
      // --naming-case-schema camelCase --export-schema --naming-case-type PascalCase
      execSync(
        `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema camelCase --export-schema --naming-case-type PascalCase`,
        {
          stdio: 'pipe',
        },
      )
      const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
      const expected = `import { createRoute, z } from '@hono/zod-openapi'

export const testSchema = z.object({ test: z.string() }).openapi('Test')

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: testSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
      expect(result).toBe(expected)
    },
  )

  // 11
  // {
  //   schema: { name: 'camelCase', export: true },
  //   type: { name: 'camelCase', export: true }
  // },
  it.concurrent(
    '--naming-case-schema camelCase --export-schema --naming-case-type camelCase --export-type',
    () => {
      const openapiPath = path.join('tmp-openapi/test.json')
      // CLI
      // --naming-case-schema camelCase --export-schema --naming-case-type camelCase --export-type
      execSync(
        `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema camelCase --export-schema --naming-case-type camelCase --export-type`,
        {
          stdio: 'pipe',
        },
      )
      const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
      const expected = `import { createRoute, z } from '@hono/zod-openapi'

export const testSchema = z.object({ test: z.string() }).openapi('Test')

export type test = z.infer<typeof testSchema>

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: testSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
      expect(result).toBe(expected)
    },
  )

  // 12
  // {
  //   schema: { name: 'camelCase', export: true },
  //   type: { name: 'camelCase', export: false }
  // },
  it.concurrent(
    '--naming-case-schema camelCase --export-schema --naming-case-type camelCase',
    () => {
      const openapiPath = path.join('tmp-openapi/test.json')
      // CLI
      // --naming-case-schema camelCase --export-schema --naming-case-type camelCase
      execSync(
        `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema camelCase --export-schema --naming-case-type camelCase`,
        {
          stdio: 'pipe',
        },
      )
      const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
      const expected = `import { createRoute, z } from '@hono/zod-openapi'

export const testSchema = z.object({ test: z.string() }).openapi('Test')

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: testSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
      expect(result).toBe(expected)
    },
  )

  // 13
  // {
  //   schema: { name: 'camelCase', export: false },
  //   type: { name: 'PascalCase', export: true }
  // },
  it.concurrent(
    '--naming-case-schema camelCase --naming-case-type PascalCase --export-type',
    () => {
      const openapiPath = path.join('tmp-openapi/test.json')
      // CLI
      // --naming-case-schema camelCase --naming-case-type PascalCase --export-type
      execSync(
        `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema camelCase --naming-case-type PascalCase --export-type`,
        {
          stdio: 'pipe',
        },
      )
      const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
      const expected = `import { createRoute, z } from '@hono/zod-openapi'

const testSchema = z.object({ test: z.string() }).openapi('Test')

export type Test = z.infer<typeof testSchema>

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: testSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
      expect(result).toBe(expected)
    },
  )

  // 14
  // {
  //   schema: { name: 'camelCase', export: false },
  //   type: { name: 'PascalCase', export: false }
  // },
  it.concurrent('--naming-case-schema camelCase --naming-case-type PascalCase', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    // CLI
    // --naming-case-schema camelCase --naming-case-type PascalCase
    execSync(
      `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema camelCase --naming-case-type PascalCase`,
      {
        stdio: 'pipe',
      },
    )
    const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

const testSchema = z.object({ test: z.string() }).openapi('Test')

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: testSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
    expect(result).toBe(expected)
  })

  // 15
  // {
  //   schema: { name: 'camelCase', export: false },
  //   type: { name: 'camelCase', export: true }
  // },
  it.concurrent('--naming-case-schema camelCase --naming-case-type camelCase --export-type', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    // CLI
    // --naming-case-schema camelCase --naming-case-type camelCase --export-type
    execSync(
      `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema camelCase --naming-case-type camelCase --export-type`,
      {
        stdio: 'pipe',
      },
    )
    const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

const testSchema = z.object({ test: z.string() }).openapi('Test')

export type test = z.infer<typeof testSchema>

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: testSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
    expect(result).toBe(expected)
  })

  // 16
  // {
  //   schema: { name: 'camelCase', export: false },
  //   type: { name: 'camelCase', export: false }
  // }
  it.concurrent('--naming-case-schema camelCase --naming-case-type camelCase', () => {
    const openapiPath = path.join('tmp-openapi/test.json')
    // CLI
    // --naming-case-schema camelCase --naming-case-type camelCase
    execSync(
      `node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts --naming-case-schema camelCase --naming-case-type camelCase`,
      {
        stdio: 'pipe',
      },
    )
    const result = fs.readFileSync('tmp-route/test.ts', { encoding: 'utf-8' })
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

const testSchema = z.object({ test: z.string() }).openapi('Test')

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: testSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
`
    expect(result).toBe(expected)
  })
})

describe('cli test', () => {
  const exitSpy = vi
    .spyOn(process, 'exit')
    .mockImplementation(((code?: number | string | null) => undefined) as never)

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
        honoTakibi: vi.fn(() => Promise.resolve({ ok: true, value: { message: 'OK' } } as const)),
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
