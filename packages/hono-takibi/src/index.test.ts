import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import type { OpenAPISpec } from './openapi/index.js'
import { execSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

// Test run
// pnpm vitest run ./src/index.test.ts

// Normal
describe.concurrent('Hono Takibi Normal Test', () => {
  const tmpOpenAPI: OpenAPISpec = {
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
  it.concurrent('schema name PascalCase export true type not output export false', () => {
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
  })

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

// Help
// describe.concurrent('Hono Takibi Help Test', () => {
//   it.concurrent('Hono Takibi --help', async () => {
//     try {
//       execSync(`node ${path.resolve('dist/index.js')} --help`, { stdio: 'pipe' })
//     } catch (e) {
//       if (e instanceof Error) {
//         expect(e.message).toMatch(
//           new RegExp(
//             [
//               'Usage: hono-takibi <input-file> \\[-o output-file\\]',
//               '',
//               'Options:',
//               '  -o, --output <file>   Output file path',
//               '  --naming-case-schema <case>  Naming case for schema (camelCase, PascalCase)',
//               '  --export-schema       Export schema type',
//               '  --naming-case-type <case>    Naming case for type (camelCase, PascalCase)',
//               '  --export-type         Export type',
//               '  --template            Use template',
//               '  --test                Run tests',
//             ].join('\\n'),
//           ),
//         )
//       }
//     }
//   })

//   it.concurrent('Hono Takibi -h', async () => {
//     try {
//       execSync(`node ${path.resolve('dist/index.js')} -h`, { stdio: 'pipe' })
//     } catch (e) {
//       if (e instanceof Error) {
//         expect(e.message).toMatch(
//           new RegExp(
//             [
//               'Usage: hono-takibi <input-file> \\[-o output-file\\]',
//               '',
//               'Options:',
//               '  -o, --output <file>   Output file path',
//               '  --naming-case-schema <case>  Naming case for schema (camelCase, PascalCase)',
//               '  --export-schema       Export schema type',
//               '  --naming-case-type <case>    Naming case for type (camelCase, PascalCase)',
//               '  --export-type         Export type',
//               '  --template            Use template',
//               '  --test                Run tests',
//             ].join('\\n'),
//           ),
//         )
//       }
//     }
//   })
// })

// // Failed
// describe.concurrent('Hono Takibi Failed Test', () => {
//   const tmpOpenAPI = {
//     openapi: '3.0.0',
//   }
//   beforeAll(() => {
//     if (!fs.existsSync('tmp-openapi-fail')) {
//       fs.mkdirSync('tmp-openapi-fail', { recursive: true })
//       fs.writeFileSync('tmp-openapi-fail/test.json', JSON.stringify(tmpOpenAPI))
//     }
//   })

//   afterAll(() => {
//     if (fs.existsSync('tmp-openapi-fail/test.json')) {
//       fs.unlinkSync('tmp-openapi-fail/test.json')
//     }
//     if (fs.existsSync('tmp-openapi-fail') && fs.readdirSync('tmp-openapi-fail').length === 0) {
//       fs.rmdirSync('tmp-openapi-fail')
//     }
//     if (fs.existsSync('tmp-route-fail/test.ts')) {
//       fs.unlinkSync('tmp-route-fail/test.ts')
//     }
//     if (fs.existsSync('tmp-route-fail') && fs.readdirSync('tmp-route-fail').length === 0) {
//       fs.rmdirSync('tmp-route-fail')
//     }
//   })

//   it.concurrent('Hono Takibi CLI Failed', async () => {
//     const openapiPath = path.join('tmp-openapi-fail/test.json')
//     try {
//       execSync(`node ${path.resolve('dist/index.js')} ${openapiPath} -o tmp-route/test.ts`, {
//         stdio: 'pipe',
//       })
//     } catch (e) {
//       if (e instanceof Error) {
//         expect(e.message).toMatch(
//           new RegExp(
//             [
//               'Command failed: node .*dist/index\\.js tmp-openapi-fail/test\\.json -o tmp-route/test\\.ts',
//               'Usage: hono-takibi <input-file> \\[-o output-file\\]',
//               'Error processing OpenAPI document: tmp-openapi-fail/test\\.json is not a valid Openapi API definition',
//             ].join('\\n'),
//           ),
//         )
//       }
//     }
//   })
// })
