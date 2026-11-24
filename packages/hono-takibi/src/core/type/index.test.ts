import fs from 'node:fs'
import os from 'node:os'
import nodePath from 'node:path'

import * as NodeFileSystem from '@effect/platform-node/NodeFileSystem'
import { Effect } from 'effect'
import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { type } from './index.js'

describe('type', () => {
  it('should generate declaration file for basic schema', { timeout: 10_000 }, async () => {
    const openapi = {
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
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      expect(fs.existsSync(out)).toBe(true)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(
        "type TestInput = { test: string }\ndeclare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/test': {\n      $post: { input: { json: TestInput }; output: {}; outputFormat: string; status: 200 }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('names a referenced component schema once, itself included', { timeout: 10_000 }, async () => {
    // `Node` is referred to from two operations and from its own `children`, and is written
    // once; `File` would shadow the global `File` its binary string is, so it takes another name.
    const openapi = {
      openapi: '3.0.0',
      info: { title: 'Refs', version: '1.0.0' },
      components: {
        schemas: {
          Node: {
            type: 'object',
            required: ['value'],
            properties: {
              value: { type: 'string' },
              children: { type: 'array', items: { $ref: '#/components/schemas/Node' } },
            },
          },
          File: {
            type: 'object',
            required: ['data'],
            properties: { data: { type: 'string', format: 'binary' } },
          },
        },
      },
      paths: {
        '/tree': {
          get: {
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/Node' } },
                },
              },
            },
          },
        },
        '/upload': {
          post: {
            requestBody: {
              content: { 'multipart/form-data': { schema: { $ref: '#/components/schemas/File' } } },
            },
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/Node' } },
                },
              },
            },
          },
        },
      },
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      expect(fs.readFileSync(out, 'utf8')).toBe(
        "type Node = { value: string; children?: Node[] | undefined }\ntype FileInput = { data: File }\ndeclare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  { '/tree': { $get: { input: {}; output: Node; outputFormat: 'json'; status: 200 } } } & {\n    '/upload': {\n      $post: { input: { form: FileInput }; output: Node; outputFormat: 'json'; status: 200 }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should expose an OpenAPI 3.2 QUERY operation as $query', { timeout: 10_000 }, async () => {
    const openapi = {
      openapi: '3.2.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            summary: 'List users',
            responses: { '200': { description: 'OK' } },
          },
          query: {
            summary: 'Search users',
            description: 'A safe read whose parameters travel in the body.',
            'x-pagination': true,
            requestBody: {
              required: true,
              content: { 'application/json': { schema: { type: 'object' } } },
            },
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      expect(fs.readFileSync(out, 'utf8'))
        .toBe(`declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/users': {
      $get: { input: {}; output: {}; outputFormat: string; status: 200 }
      $query: {
        input: { json: { [key: string]: unknown } }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  },
  '/'
>
export default routes
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate declaration file for path parameters', { timeout: 10_000 }, async () => {
    const openapi = {
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
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/users/:id': {\n      $get: { input: { param: { id: string } }; output: {}; outputFormat: string; status: 200 }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate declaration file for query parameters', { timeout: 10_000 }, async () => {
    const openapi = {
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
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/search': {\n      $get: {\n        input: { query: { q: string; limit?: unknown } }\n        output: {}\n        outputFormat: string\n        status: 200\n      }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate declaration file for cookie parameters', { timeout: 10_000 }, async () => {
    const openapi = {
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
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/test': {\n      $get: {\n        input: { cookie: { session_id?: string; user_id: string } }\n        output: {}\n        outputFormat: string\n        status: 200\n      }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate declaration file for header parameters', { timeout: 10_000 }, async () => {
    const openapi = {
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
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/test': {\n      $get: {\n        input: { header: { 'X-Request-Id': string } }\n        output: {}\n        outputFormat: string\n        status: 200\n      }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate declaration file for response types', { timeout: 10_000 }, async () => {
    const openapi = {
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
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/users': {\n      $get: {\n        input: {}\n        output: { id?: string | undefined; name?: string | undefined }[]\n        outputFormat: 'json'\n        status: 200\n      }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate DeepReadonly types when readonly is true', { timeout: 10_000 }, async () => {
    const openapi = {
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
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out, true), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(
        "type DeepReadonly<T> = T extends (infer R)[]\n  ? readonly DeepReadonly<R>[]\n  : T extends object\n    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }\n    : T\ndeclare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  DeepReadonly<{\n    '/users': {\n      $get: {\n        input: {}\n        output: { id?: string | undefined; name?: string | undefined }\n        outputFormat: 'json'\n        status: 200\n      }\n    }\n  }>,\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should not include DeepReadonly when readonly is false', { timeout: 10_000 }, async () => {
    const openapi = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/test': {
          get: {
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out, false), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  { '/test': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should escape single quotes in enum values', { timeout: 10_000 }, async () => {
    const openapi = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/test': {
          get: {
            responses: {
              '422': {
                description: 'Validation Error',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        message: {
                          type: 'string',
                          enum: [
                            "Should have one of the required properties 'contours_minutes' or 'contours_meters'",
                            'contours_minutes must be an integer between 1 and 60',
                          ],
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
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/test': {\n      $get: {\n        input: {}\n        output: {\n          message?:\n            | \"Should have one of the required properties 'contours_minutes' or 'contours_meters'\"\n            | 'contours_minutes must be an integer between 1 and 60'\n            | undefined\n        }\n        outputFormat: 'json'\n        status: 422\n      }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it(
    'should generate types with query, header, cookie, and path parameters',
    { timeout: 10_000 },
    async () => {
      const openapi = {
        openapi: '3.0.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {
          '/users/{userId}': {
            get: {
              operationId: 'getUser',
              parameters: [
                { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
                { name: 'page', in: 'query', required: false, schema: { type: 'integer' } },
                { name: 'X-Request-ID', in: 'header', required: true, schema: { type: 'string' } },
                { name: 'session', in: 'cookie', schema: { type: 'string' } },
              ],
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        required: ['id', 'name'],
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
      } as OpenAPI
      const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
      try {
        const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
        await expect(
          Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
        ).resolves.toBe(`Generated type code written to ${out}`)
        const content = fs.readFileSync(out, 'utf8')
        expect(content).toBe(
          "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/users/:userId': {\n      $get: {\n        input: { param: { userId: string } } & { query: { page?: unknown } } & {\n          header: { 'X-Request-ID': string }\n        } & { cookie: { session?: string } }\n        output: { id: string; name: string }\n        outputFormat: 'json'\n        status: 200\n      }\n    }\n  },\n  '/'\n>\nexport default routes\n",
        )
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    },
  )

  it('should generate type with readonly flag', { timeout: 10_000 }, async () => {
    const openapi = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/items': {
          get: {
            operationId: 'getItems',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out, true), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(
        "type DeepReadonly<T> = T extends (infer R)[]\n  ? readonly DeepReadonly<R>[]\n  : T extends object\n    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }\n    : T\ndeclare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  DeepReadonly<{\n    '/items': { $get: { input: {}; output: string[]; outputFormat: 'json'; status: 200 } }\n  }>,\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate type with $ref parameter resolution', { timeout: 10_000 }, async () => {
    const openapi = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      components: {
        parameters: {
          LimitParam: {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer' },
          },
        },
      },
      paths: {
        '/items': {
          get: {
            operationId: 'getItems',
            parameters: [{ $ref: '#/components/parameters/LimitParam' }] as any,
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/items': {\n      $get: { input: { query: { limit?: unknown } }; output: {}; outputFormat: string; status: 200 }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate type with form request body', { timeout: 10_000 }, async () => {
    const openapi = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/upload': {
          post: {
            operationId: 'upload',
            requestBody: {
              required: true,
              content: {
                'multipart/form-data': {
                  schema: {
                    type: 'object',
                    properties: {
                      file: { type: 'string', format: 'binary' },
                      name: { type: 'string' },
                    },
                  },
                },
              },
            },
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/upload': {\n      $post: {\n        input: { form: { file?: File; name?: string } }\n        output: {}\n        outputFormat: string\n        status: 200\n      }\n    }\n  },\n  '/'\n>\nexport default routes\n",
      )
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('handles circular allOf references without stack overflow', { timeout: 10_000 }, async () => {
    const openapi = {
      openapi: '3.0.0',
      info: { title: 'Circular', version: '1.0.0' },
      components: {
        schemas: {
          A: {
            type: 'object',
            allOf: [{ $ref: '#/components/schemas/B' }],
            properties: { a: { type: 'string' } },
          },
          B: {
            type: 'object',
            allOf: [{ $ref: '#/components/schemas/A' }],
            properties: { b: { type: 'number' } },
          },
        },
      },
      paths: {
        '/x': {
          get: {
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/A' } },
                },
              },
            },
          },
        },
      },
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('handles self-referencing allOf without stack overflow', { timeout: 10_000 }, async () => {
    const openapi = {
      openapi: '3.0.0',
      info: { title: 'Self-ref', version: '1.0.0' },
      components: {
        schemas: {
          Node: {
            type: 'object',
            allOf: [{ $ref: '#/components/schemas/Node' }],
            properties: { value: { type: 'string' } },
          },
        },
      },
      paths: {
        '/x': {
          get: {
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/Node' } },
                },
              },
            },
          },
        },
      },
    } as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('handles default/XX status codes, $ref body and response, text and no-content', async () => {
    const spec = {
      openapi: '3.1.0',
      info: { title: 'StatusAll', version: '1.0.0' },
      paths: {
        '/x': {
          post: {
            operationId: 'pX',
            requestBody: { $ref: '#/components/requestBodies/UserBody' },
            responses: {
              default: {
                description: 'Default',
                content: {
                  'application/json': {
                    schema: { type: 'object', properties: { ok: { type: 'boolean' } } },
                  },
                },
              },
              '4XX': {
                description: 'Client error',
                content: {
                  'application/json': {
                    schema: { type: 'object', properties: { code: { type: 'integer' } } },
                  },
                },
              },
              '200': {
                description: 'OK',
                content: { 'text/plain': { schema: { type: 'string' } } },
              },
              '204': { description: 'No Content' },
              '500': { $ref: '#/components/responses/ServerError' },
            },
            parameters: [{ $ref: '#/components/parameters/QId' }],
          },
        },
      },
      components: {
        requestBodies: {
          UserBody: {
            content: {
              'application/json': {
                schema: { type: 'object', properties: { name: { type: 'string' } } },
              },
            },
          },
        },
        responses: {
          ServerError: {
            description: '500',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { err: { type: 'string' } } },
              },
            },
          },
        },
        parameters: { QId: { name: 'id', in: 'query', schema: { type: 'integer' } } },
      },
    } as unknown as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-statusall-'))
    try {
      const out = nodePath.join(dir, 'types.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(spec, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(`declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/x': {
      $post:
        | {
            input: { query: { id?: unknown } } & { json: { name?: string } }
            output: string
            outputFormat: 'text'
            status: 200
          }
        | {
            input: { query: { id?: unknown } } & { json: { name?: string } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { query: { id?: unknown } } & { json: { name?: string } }
            output: { err?: string | undefined }
            outputFormat: 'json'
            status: 500
          }
        | {
            input: { query: { id?: unknown } } & { json: { name?: string } }
            output: { ok?: boolean | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { id?: unknown } } & { json: { name?: string } }
            output: { code?: number | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  },
  '/'
>
export default routes
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('renders oneOf/anyOf/const/nullable/multi-type/mixed-enum in one fixture', async () => {
    const openapi = {
      openapi: '3.1.0',
      info: { title: 'TypesAll', version: '1.0.0' },
      paths: {
        '/x': {
          get: {
            operationId: 'getX',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        oneOfField: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
                        anyOfField: { anyOf: [{ type: 'boolean' }, { type: 'number' }] },
                        constString: { const: 'fixed' },
                        constNumber: { const: 42 },
                        constBool: { const: true },
                        constObject: { const: { a: 1 } },
                        nullableStr: { type: 'string', nullable: true },
                        multiType: { type: ['string', 'null'] },
                        enumMixed: { enum: ['a', 1, true] },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    } as unknown as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-mixed-'))
    try {
      const out = nodePath.join(dir, 'types.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(`declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/x': {
      $get: {
        input: {}
        output: {
          oneOfField?: (string | number) | undefined
          anyOfField?: (boolean | number) | undefined
          constString?: 'fixed' | undefined
          constNumber?: 42 | undefined
          constBool?: true | undefined
          constObject?: { a: 1 } | undefined
          nullableStr?: (string | null) | undefined
          multiType?: (string | null) | undefined
          enumMixed?: 'a' | 1 | true | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('renders array items as tuple, single-element array, and boolean items', async () => {
    const openapi = {
      openapi: '3.1.0',
      info: { title: 'TupleTypes', version: '1.0.0' },
      paths: {
        '/x': {
          get: {
            operationId: 'getX',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        tuple: { type: 'array', items: [{ type: 'string' }, { type: 'number' }] },
                        single: { type: 'array', items: [{ type: 'boolean' }] },
                        emptyItems: { type: 'array', items: [] },
                        anyItems: { type: 'array', items: true },
                        noItems: { type: 'array', items: false },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    } as unknown as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-tuple-'))
    try {
      const out = nodePath.join(dir, 'types.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(`declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/x': {
      $get: {
        input: {}
        output: {
          tuple?: [string, number] | undefined
          single?: boolean[] | undefined
          emptyItems?: any[] | undefined
          anyItems?: any[] | undefined
          noItems?: any[] | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('renders additionalProperties for property-less objects', async () => {
    const openapi = {
      openapi: '3.1.0',
      info: { title: 'AdditionalProps', version: '1.0.0' },
      paths: {
        '/x': {
          get: {
            operationId: 'getX',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        closed: { type: 'object', additionalProperties: false },
                        record: { type: 'object', additionalProperties: { type: 'string' } },
                        open: { type: 'object' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    } as unknown as OpenAPI
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-addprops-'))
    try {
      const out = nodePath.join(dir, 'types.d.ts') as `${string}.ts`
      await expect(
        Effect.runPromise(Effect.provide(type(openapi, out), NodeFileSystem.layer)),
      ).resolves.toBe(`Generated type code written to ${out}`)
      const content = fs.readFileSync(out, 'utf8')
      expect(content).toBe(`declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/x': {
      $get: {
        input: {}
        output: {
          closed?: {} | undefined
          record?: { [key: string]: string } | undefined
          open?: { [key: string]: unknown } | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

async function generateTypes(openapi: object) {
  const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
  try {
    const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
    await Effect.runPromise(Effect.provide(type(openapi as OpenAPI, out), NodeFileSystem.layer))
    return fs.readFileSync(out, 'utf8')
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

function documentOf(paths: object) {
  return { openapi: '3.1.0', info: { title: 'Test', version: '1.0.0' }, paths }
}

function schemaRef(name: string) {
  return { $ref: `#/components/schemas/${name}` }
}

function jsonResponse(schema: object) {
  return { description: 'ok', content: { 'application/json': { schema } } }
}

describe('type: what a route map can be written with', () => {
  it('writes an array value of an enum as its JSON (#504)', { timeout: 10_000 }, async () => {
    const content = await generateTypes(
      documentOf({
        '/a': {
          get: {
            responses: {
              '200': jsonResponse({
                type: 'object',
                required: ['errors'],
                properties: {
                  errors: { type: 'array', items: { type: 'string' }, enum: [[]] },
                  warnings: { type: 'array', items: { type: 'string' }, enum: [[], ['a']] },
                },
              }),
            },
          },
        },
      }),
    )
    expect(content).toBe(
      "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    '/a': {\n      $get: {\n        input: {}\n        output: { errors: []; warnings?: [] | ['a'] | undefined }\n        outputFormat: 'json'\n        status: 200\n      }\n    }\n  },\n  '/'\n>\nexport default routes\n",
    )
  })

  it("escapes a ' in a path (#505)", { timeout: 10_000 }, async () => {
    const content = await generateTypes(
      documentOf({
        "/messages/getDetails(address='{address}')": {
          get: {
            parameters: [
              { name: 'address', in: 'path', required: true, schema: { type: 'string' } },
            ],
            responses: { '200': jsonResponse({ type: 'string' }) },
          },
        },
      }),
    )
    expect(content).toBe(
      "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  {\n    \"/messages/getDetails(address='{address}')\": {\n      $get: {\n        input: { param: { address: string } }\n        output: string\n        outputFormat: 'json'\n        status: 200\n      }\n    }\n  },\n  '/'\n>\nexport default routes\n",
    )
  })

  it(
    'leaves out a status code that is no StatusCode of Hono (#517)',
    { timeout: 10_000 },
    async () => {
      const content = await generateTypes(
        documentOf({
          '/payments': {
            post: {
              responses: {
                '200': jsonResponse({ type: 'string' }),
                '299': jsonResponse({ type: 'number' }),
                '480': { description: 'error' },
              },
            },
          },
        }),
      )
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  { '/payments': { $post: { input: {}; output: string; outputFormat: 'json'; status: 200 } } },\n  '/'\n>\nexport default routes\n",
      )
    },
  )

  it(
    'types a response whose media types have no schema like one without content (#507)',
    { timeout: 10_000 },
    async () => {
      const content = await generateTypes(
        documentOf({
          '/tags': {
            delete: {
              responses: {
                '204': { description: 'No Content', content: { 'application/json': {} } },
              },
            },
          },
        }),
      )
      expect(content).toBe(
        "declare const routes: import('@hono/zod-openapi').OpenAPIHono<\n  import('hono/types').Env,\n  { '/tags': { $delete: { input: {}; output: {}; outputFormat: string; status: 204 } } },\n  '/'\n>\nexport default routes\n",
      )
    },
  )
})

describe('type: the route map agrees with the routes it types (#608)', () => {
  it('types a form body as form only, and schemas as the Zod output does', async () => {
    const content = await generateTypes({
      openapi: '3.0.3',
      info: { title: 't', version: '1' },
      paths: {
        '/a': {
          post: {
            requestBody: {
              content: {
                'application/x-www-form-urlencoded': {
                  schema: { type: 'object', properties: { n: { type: 'string' } } },
                },
              },
            },
            responses: {
              '200': jsonResponse({
                type: 'object',
                properties: {
                  e: { type: 'string', enum: ['x', 'y'], nullable: true },
                  s: { allOf: [{ type: 'string' }, { minLength: 1 }] },
                  u: {},
                },
              }),
            },
          },
        },
      },
    })
    expect(content).toBe(`declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/a': {
      $post: {
        input: { form: { n?: string } }
        output: { e?: ('x' | 'y' | null) | undefined; s?: string | undefined; u?: any | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
`)
  })

  it('writes an enum value and a const with a newline as one line', async () => {
    const content = await generateTypes(
      documentOf({
        '/a': {
          get: {
            responses: {
              '200': jsonResponse({
                type: 'object',
                required: ['e', 'c'],
                properties: {
                  e: { type: 'string', enum: ['a\nb', "c'd", 'e\\f'] },
                  c: { const: 'a\nb' },
                },
              }),
            },
          },
        },
      }),
    )
    expect(content).toBe(`declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/a': {
      $get: {
        input: {}
        output: { e: 'a\\nb' | "c'd" | 'e\\\\f'; c: 'a\\nb' }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
`)
  })

  it('adds null to a nullable $ref, oneOf, anyOf and allOf, and to a null default', async () => {
    const content = await generateTypes({
      openapi: '3.0.3',
      info: { title: 't', version: '1' },
      components: {
        schemas: {
          P: { type: 'object', required: ['p'], properties: { p: { type: 'string' } } },
        },
      },
      paths: {
        '/a': {
          get: {
            responses: {
              '200': jsonResponse({
                type: 'object',
                required: ['r', 'o', 'an', 'al', 'd'],
                properties: {
                  r: { $ref: '#/components/schemas/P', nullable: true },
                  o: { oneOf: [{ type: 'string' }, { type: 'number' }], nullable: true },
                  an: { anyOf: [{ type: 'string' }, { type: 'number' }], nullable: true },
                  al: {
                    allOf: [
                      { $ref: '#/components/schemas/P' },
                      { type: 'object', properties: { z: { type: 'string' } } },
                    ],
                    nullable: true,
                  },
                  d: { type: 'string', default: null },
                },
              }),
            },
          },
        },
      },
    })
    expect(content).toBe(`type P = { p: string }
declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/a': {
      $get: {
        input: {}
        output: {
          r: P | null
          o: (string | number) | null
          an: (string | number) | null
          al: (P & { z?: string | undefined }) | null
          d: string | null
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
`)
  })

  it('leaves a body that is neither JSON nor a form out of the input', async () => {
    const content = await generateTypes(
      documentOf({
        '/text': {
          post: {
            requestBody: { content: { 'text/plain': { schema: { type: 'string' } } } },
            responses: { '204': { description: 'none' } },
          },
        },
        '/xml': {
          post: {
            requestBody: {
              content: {
                'application/xml': {
                  schema: { type: 'object', properties: { n: { type: 'string' } } },
                },
              },
            },
            responses: { '204': { description: 'none' } },
          },
        },
        '/json': {
          post: {
            requestBody: {
              content: {
                'application/vnd.api+json; charset=utf-8': { schema: { type: 'string' } },
              },
            },
            responses: { '204': { description: 'none' } },
          },
        },
        '/form': {
          post: {
            requestBody: {
              content: {
                'multipart/form-data; boundary=x': {
                  schema: {
                    type: 'object',
                    required: ['f'],
                    properties: { f: { type: 'string', format: 'binary' } },
                  },
                },
              },
            },
            responses: { '204': { description: 'none' } },
          },
        },
      }),
    )
    expect(content).toBe(`declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  { '/text': { $post: { input: {}; output: {}; outputFormat: string; status: 204 } } } & {
    '/xml': { $post: { input: {}; output: {}; outputFormat: string; status: 204 } }
  } & {
    '/json': { $post: { input: { json: string }; output: {}; outputFormat: string; status: 204 } }
  } & {
    '/form': {
      $post: { input: { form: { f: File } }; output: {}; outputFormat: string; status: 204 }
    }
  },
  '/'
>
export default routes
`)
  })

  it('keeps a path-level parameter whose name an operation uses in another location', async () => {
    const content = await generateTypes(
      documentOf({
        '/a/{id}': {
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'id', in: 'query', schema: { type: 'integer' } },
            { name: 'q', in: 'query', schema: { type: 'string' } },
          ],
          get: {
            parameters: [
              { name: 'id', in: 'header', required: true, schema: { type: 'string' } },
              { name: 'q', in: 'query', required: true, schema: { type: 'number' } },
            ],
            responses: { '204': { description: 'none' } },
          },
        },
      }),
    )
    expect(content).toBe(`declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/a/:id': {
      $get: {
        input: { param: { id: string } } & { query: { q: unknown; id?: unknown } } & {
          header: { id: string }
        }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  },
  '/'
>
export default routes
`)
  })
})

describe('type: a reference that nothing defers (#635)', () => {
  it('does not write a cycle made only of allOf as aliases of each other', async () => {
    const content = await generateTypes({
      openapi: '3.0.3',
      info: { title: 't', version: '1' },
      components: {
        schemas: {
          A: { type: 'object', allOf: [schemaRef('B')], properties: { a: { type: 'string' } } },
          B: { type: 'object', allOf: [schemaRef('A')], properties: { b: { type: 'number' } } },
          Node: {
            type: 'object',
            allOf: [schemaRef('Node')],
            properties: { value: { type: 'string' } },
          },
        },
      },
      paths: {
        '/a': {
          get: {
            responses: {
              '200': jsonResponse({
                type: 'object',
                properties: { a: schemaRef('A'), b: schemaRef('B'), node: schemaRef('Node') },
              }),
            },
          },
        },
      },
    })
    expect(content).toBe(`type A = { a?: string | undefined }
type B = { b?: number | undefined }
type Node = { value?: string | undefined }
declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/a': {
      $get: {
        input: {}
        output: { a?: A | undefined; b?: B | undefined; node?: Node | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
`)
  })

  it('cuts a direct reference back to a schema that reaches it through a property', async () => {
    const content = await generateTypes({
      openapi: '3.0.3',
      info: { title: 't', version: '1' },
      components: {
        schemas: {
          X: { type: 'object', allOf: [schemaRef('Y')], properties: { p: schemaRef('Y') } },
          Y: { allOf: [schemaRef('X')] },
        },
      },
      paths: { '/a': { get: { responses: { '200': jsonResponse(schemaRef('X')) } } } },
    })
    expect(content).toBe(`type Y = unknown
type X = { p?: Y | undefined }
declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  { '/a': { $get: { input: {}; output: X; outputFormat: 'json'; status: 200 } } },
  '/'
>
export default routes
`)
  })

  it('keeps the name where a property, an element or an index signature defers it', async () => {
    const content = await generateTypes({
      openapi: '3.0.3',
      info: { title: 't', version: '1' },
      components: {
        schemas: {
          P: { type: 'object', required: ['p'], properties: { p: { type: 'string' } } },
          Tree: {
            allOf: [schemaRef('P')],
            properties: {
              kids: { type: 'array', items: schemaRef('Tree') },
              byName: { type: 'object', additionalProperties: schemaRef('Tree') },
            },
          },
        },
      },
      paths: { '/a': { get: { responses: { '200': jsonResponse(schemaRef('Tree')) } } } },
    })
    expect(content).toBe(`type P = { p: string }
type Tree = P & { kids?: Tree[] | undefined; byName?: { [key: string]: Tree } | undefined }
declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  { '/a': { $get: { input: {}; output: Tree; outputFormat: 'json'; status: 200 } } },
  '/'
>
export default routes
`)
  })
})

describe('type: which references count as direct (#635)', () => {
  it('does not count the allOf beside a oneOf, which the type is not written from', async () => {
    const content = await generateTypes({
      openapi: '3.0.3',
      info: { title: 't', version: '1' },
      components: {
        schemas: {
          A: { oneOf: [{ type: 'string' }], allOf: [schemaRef('B')] },
          B: { type: 'object', allOf: [schemaRef('A')], properties: { b: { type: 'number' } } },
        },
      },
      paths: {
        '/a': {
          get: {
            responses: {
              '200': jsonResponse({
                type: 'object',
                properties: { a: schemaRef('A'), b: schemaRef('B') },
              }),
            },
          },
        },
      },
    })
    expect(content).toBe(`type A = string
type B = A & { b?: number | undefined }
declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/a': {
      $get: {
        input: {}
        output: { a?: A | undefined; b?: B | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
`)
  })

  // Every level is reached along two paths: walking each path again would take 2^30 steps.
  it('walks a schema once, however many paths lead to it', { timeout: 10_000 }, async () => {
    const depth = 30
    const levels = Array.from({ length: depth }, (_, index) => index)
    const content = await generateTypes({
      openapi: '3.0.3',
      info: { title: 't', version: '1' },
      components: {
        schemas: {
          ...Object.fromEntries(
            levels.flatMap((n) => [
              [`S${n}`, { allOf: [schemaRef(`A${n}`), schemaRef(`B${n}`)] }],
              [`A${n}`, { allOf: [schemaRef(`S${n + 1}`)] }],
              [`B${n}`, { allOf: [schemaRef(`S${n + 1}`)] }],
            ]),
          ),
          [`S${depth}`]: {
            type: 'object',
            required: ['v'],
            properties: { v: { type: 'string' } },
          },
        },
      },
      paths: { '/a': { get: { responses: { '200': jsonResponse(schemaRef('S0')) } } } },
    })
    const aliases = levels
      .toReversed()
      .map((n) => `type A${n} = S${n + 1}\ntype B${n} = S${n + 1}\ntype S${n} = A${n} & B${n}\n`)
      .join('')
    expect(content).toBe(`type S30 = { v: string }
${aliases}declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  { '/a': { $get: { input: {}; output: S0; outputFormat: 'json'; status: 200 } } },
  '/'
>
export default routes
`)
  })
})

describe('type: properties beside allOf (#634)', () => {
  it('writes them as one more member, where the Zod schema does', async () => {
    const content = await generateTypes({
      openapi: '3.0.3',
      info: { title: 't', version: '1' },
      components: {
        schemas: {
          P: { type: 'object', required: ['p'], properties: { p: { type: 'string' } } },
          A: { type: 'object', allOf: [schemaRef('P')], properties: { a: { type: 'string' } } },
          // No `type`: the member that only accepts objects makes the shape a member.
          Untyped: {
            allOf: [schemaRef('P')],
            required: ['b'],
            properties: { b: { type: 'number' } },
          },
          // `required` alone is checked on the member, and adds no property.
          Req: { allOf: [schemaRef('P')], required: ['p'] },
          // No member requires an object: the shape is a check, not part of the output.
          Loose: { allOf: [{ minLength: 1 }], properties: { c: { type: 'string' } } },
        },
      },
      paths: {
        '/a': {
          get: {
            responses: {
              '200': jsonResponse({
                type: 'object',
                properties: {
                  a: schemaRef('A'),
                  untyped: schemaRef('Untyped'),
                  req: schemaRef('Req'),
                  loose: schemaRef('Loose'),
                },
              }),
            },
          },
        },
      },
    })
    expect(content).toBe(`type P = { p: string }
type A = P & { a?: string | undefined }
type Untyped = P & { b: number }
type Req = P
type Loose = unknown
declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/a': {
      $get: {
        input: {}
        output: {
          a?: A | undefined
          untyped?: Untyped | undefined
          req?: Req | undefined
          loose?: Loose | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
`)
  })
})

describe('type: a response that is neither JSON nor text/plain (#633)', () => {
  it('is typed like a response without content, as its body is a bare Response', async () => {
    const text = { schema: { type: 'string' } }
    const content = await generateTypes(
      documentOf({
        '/a': {
          get: {
            responses: {
              '200': { description: 'text', content: { 'text/plain; charset=utf-8': text } },
              '201': { description: 'xml', content: { 'application/xml': text } },
              '202': {
                description: 'several',
                content: {
                  'application/xml': text,
                  'text/csv': text,
                  'application/json': { schema: { type: 'number' } },
                },
              },
              '203': { description: 'html', content: { 'text/html': text } },
            },
          },
        },
      }),
    )
    expect(content).toBe(`declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/a': {
      $get:
        | { input: {}; output: string; outputFormat: 'text'; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: number; outputFormat: 'json'; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
    }
  },
  '/'
>
export default routes
`)
  })
})

describe('type: a schema that allows anything (#632)', () => {
  it('is any where the routes write z.any(), and unknown where they write z.unknown()', async () => {
    const content = await generateTypes({
      openapi: '3.0.3',
      info: { title: 't', version: '1' },
      paths: {
        '/a': {
          get: {
            responses: {
              '200': jsonResponse({
                type: 'object',
                properties: {
                  u: {},
                  d: { description: 'd' },
                  n: { nullable: true },
                  rec: { type: 'object', additionalProperties: {} },
                  arr: { type: 'array' },
                  items: { type: 'array', items: {} },
                  // Checked on `z.unknown()`.
                  m: { minLength: 1 },
                  r: { required: ['x'] },
                  // `z.looseObject({})`.
                  o: { type: 'object' },
                  ap: { type: 'object', additionalProperties: true },
                },
              }),
            },
          },
        },
      },
    })
    expect(content).toBe(`declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/a': {
      $get: {
        input: {}
        output: {
          u?: any | undefined
          d?: any | undefined
          n?: (any | null) | undefined
          rec?: { [key: string]: any } | undefined
          arr?: any[] | undefined
          items?: any[] | undefined
          m?: unknown | undefined
          r?: unknown | undefined
          o?: { [key: string]: unknown } | undefined
          ap?: { [key: string]: unknown } | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
`)
  })
})

describe('type: patternProperties beside additionalProperties (#629)', () => {
  it('does not say every value is what additionalProperties says', async () => {
    const content = await generateTypes({
      openapi: '3.0.3',
      info: { title: 't', version: '1' },
      components: {
        schemas: {
          Callback: {
            type: 'object',
            patternProperties: { '^x-': {} },
            additionalProperties: schemaRef('PathItem'),
          },
          PathItem: {
            type: 'object',
            properties: {
              summary: { type: 'string' },
              callbacks: { type: 'object', additionalProperties: schemaRef('Callback') },
            },
          },
        },
      },
      paths: {
        '/a': {
          get: {
            responses: {
              '200': jsonResponse({
                type: 'object',
                properties: {
                  item: schemaRef('PathItem'),
                  closed: {
                    type: 'object',
                    patternProperties: { '^x-': { type: 'string' } },
                    additionalProperties: false,
                  },
                },
              }),
            },
          },
        },
      },
    })
    expect(content).toBe(`type Callback = { [key: string]: unknown }
type PathItem = {
  summary?: string | undefined
  callbacks?: { [key: string]: Callback } | undefined
}
declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/a': {
      $get: {
        input: {}
        output: { item?: PathItem | undefined; closed?: { [key: string]: unknown } | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
`)
  })
})

describe('type: what a route takes in is what its schemas read (#631)', () => {
  it('types a parameter read from text as its schema takes it, and leaves | undefined off an optional input', async () => {
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    const output = nodePath.join(dir, 'type.ts')
    const openapi = {
      openapi: '3.0.3',
      info: { title: 't', version: '1' },
      paths: {
        '/a/{pid}': {
          post: {
            parameters: [
              { name: 'pid', in: 'path', required: true, schema: { type: 'integer' } },
              { name: 'q', in: 'query', required: true, schema: { type: 'number' } },
              { name: 'id', in: 'query', schema: { type: 'integer' } },
              { name: 'flag', in: 'query', schema: { type: 'boolean' } },
              { name: 'tags', in: 'query', schema: { type: 'array', items: { type: 'string' } } },
              { name: 'name', in: 'query', schema: { $ref: '#/components/schemas/Name' } },
              { name: 'x-n', in: 'header', schema: { type: 'integer' } },
              { name: 'sid', in: 'cookie', schema: { type: 'string' } },
            ],
            requestBody: {
              content: {
                'application/x-www-form-urlencoded': {
                  schema: { type: 'object', properties: { n: { type: 'string' } } },
                },
                'application/json': { schema: { $ref: '#/components/schemas/Patch' } },
              },
            },
            responses: {
              '200': {
                description: 'OK',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Patch' } } },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Name: { type: 'string' },
          Patch: {
            type: 'object',
            required: ['id'],
            properties: { id: { type: 'string' }, note: { type: 'string' } },
          },
        },
      },
    } as const
    try {
      await Effect.runPromise(
        Effect.provide(type(openapi as OpenAPI, `${dir}/type.ts`), NodeFileSystem.layer),
      )
      expect(fs.readFileSync(output, 'utf8')).toBe(`type NameInput = string
type PatchInput = { id: string; note?: string }
type Patch = { id: string; note?: string | undefined }
declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/a/:pid': {
      $post: {
        input: { param: { pid: unknown } } & {
          query: { q: unknown; id?: unknown; flag?: string; tags?: unknown; name?: NameInput }
        } & { header: { 'x-n'?: unknown } } & { cookie: { sid?: string } } & {
          json: PatchInput
        } & { form: { n?: string } }
        output: Patch
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
`)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
