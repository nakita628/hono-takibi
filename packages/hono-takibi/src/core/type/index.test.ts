import fs from 'node:fs'
import os from 'node:os'
import nodePath from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { type } from './index.js'

describe('type', () => {
  it('should generate declaration file for basic schema', { timeout: 10000 }, async () => {
    const openapi: OpenAPI = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      components: {
        schemas: {
          Test: {
            type: 'object',
            required: ['test'],
            properties: { test: { type: 'string' } },
          },
        },
      },
      paths: {
        '/test': {
          post: {
            summary: 'Test endpoint',
            requestBody: {
              required: true,
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Test' } } },
            },
            responses: { '200': { description: 'Successful test' } },
          },
        },
      },
    }
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      const result = await type(openapi, out)
      expect(result.ok).toBe(true)
      expect(fs.existsSync(out)).toBe(true)
      const content = fs.readFileSync(out, 'utf-8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/test': {\n      $post: { input: { json: { test: string } }; output: {}; outputFormat: string; status: 200 }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate declaration file for path parameters', { timeout: 10000 }, async () => {
    const openapi: OpenAPI = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users/{id}': {
          get: {
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      const result = await type(openapi, out)
      expect(result.ok).toBe(true)
      const content = fs.readFileSync(out, 'utf-8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/users/:id': {\n      $get: { input: { param: { id: string } }; output: {}; outputFormat: string; status: 200 }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate declaration file for query parameters', { timeout: 10000 }, async () => {
    const openapi: OpenAPI = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/search': {
          get: {
            parameters: [
              { name: 'q', in: 'query', required: true, schema: { type: 'string' } },
              { name: 'limit', in: 'query', required: false, schema: { type: 'number' } },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      const result = await type(openapi, out)
      expect(result.ok).toBe(true)
      const content = fs.readFileSync(out, 'utf-8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/search': {\n      $get: {\n        input: { query: { q: string; limit?: number | undefined } }\n        output: {}\n        outputFormat: string\n        status: 200\n      }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate declaration file for cookie parameters', { timeout: 10000 }, async () => {
    const openapi: OpenAPI = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/test': {
          get: {
            parameters: [
              { name: 'session_id', in: 'cookie', required: false, schema: { type: 'string' } },
              { name: 'user_id', in: 'cookie', required: true, schema: { type: 'string' } },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      const result = await type(openapi, out)
      expect(result.ok).toBe(true)
      const content = fs.readFileSync(out, 'utf-8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/test': {\n      $get: {\n        input: { cookie: { session_id?: string | undefined; user_id: string } }\n        output: {}\n        outputFormat: string\n        status: 200\n      }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate declaration file for header parameters', { timeout: 10000 }, async () => {
    const openapi: OpenAPI = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/test': {
          get: {
            parameters: [
              { name: 'X-Request-Id', in: 'header', required: true, schema: { type: 'string' } },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      const result = await type(openapi, out)
      expect(result.ok).toBe(true)
      const content = fs.readFileSync(out, 'utf-8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/test': {\n      $get: {\n        input: { header: { 'X-Request-Id': string } }\n        output: {}\n        outputFormat: string\n        status: 200\n      }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate declaration file for response types', { timeout: 10000 }, async () => {
    const openapi: OpenAPI = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          name: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      const result = await type(openapi, out)
      expect(result.ok).toBe(true)
      const content = fs.readFileSync(out, 'utf-8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/users': {\n      $get: {\n        input: {}\n        output: { id?: string | undefined; name?: string | undefined }[]\n        outputFormat: 'json'\n        status: 200\n      }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate DeepReadonly types when readonly is true', { timeout: 10000 }, async () => {
    const openapi: OpenAPI = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      const result = await type(openapi, out, true)
      expect(result.ok).toBe(true)
      const content = fs.readFileSync(out, 'utf-8')
      expect(content).toBe(
        "type DeepReadonly<T> = T extends (infer R)[]\n  ? readonly DeepReadonly<R>[]\n  : T extends object\n    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }\n    : T\ndeclare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  DeepReadonly<{\n    '/users': {\n      $get: {\n        input: {}\n        output: { id?: string | undefined; name?: string | undefined }\n        outputFormat: 'json'\n        status: 200\n      }\n    }\n  }>,\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should not include DeepReadonly when readonly is false', { timeout: 10000 }, async () => {
    const openapi: OpenAPI = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/test': {
          get: {
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      const result = await type(openapi, out, false)
      expect(result.ok).toBe(true)
      const content = fs.readFileSync(out, 'utf-8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  { '/test': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
