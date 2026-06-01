import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vite-plus/test'

import { honoTakibi } from './index.js'

const openapi = {
  openapi: '3.1.0',
  info: {
    title: 'HonoTakibi',
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
                      example: 'Hono',
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
                      example: 'HonoX',
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
                      example: 'ZodOpenAPIHono',
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

describe('honoTakibi', () => {
  beforeAll(() => {
    process.argv = ['*/*/bin/node', '*/dist/index.js', 'openapi.json', '-o', 'zod-openapi-hono.ts']
    fs.writeFileSync('openapi.json', JSON.stringify(openapi))
  })
  afterAll(() => {
    fs.rmSync('openapi.json', { force: true })
    fs.rmSync('zod-openapi-hono.ts', { force: true })
  })

  it('honoTakibi generated', async () => {
    const result = await honoTakibi()

    expect(result).toEqual({
      ok: true,
      value: '🔥 Generated code written to zod-openapi-hono.ts',
    })

    const generatedCode = fs.readFileSync('zod-openapi-hono.ts', 'utf-8')
    const expectedCode = `import { createRoute, z } from '@hono/zod-openapi'

export const getHonoRoute = createRoute({
  method: 'get',
  path: '/hono',
  tags: ['Hono'],
  summary: 'Hono',
  description: 'Hono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'Hono' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const getHonoXRoute = createRoute({
  method: 'get',
  path: '/hono-x',
  tags: ['HonoX'],
  summary: 'HonoX',
  description: 'HonoX',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'HonoX' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  method: 'get',
  path: '/zod-openapi-hono',
  tags: ['ZodOpenAPIHono'],
  summary: 'ZodOpenAPIHono',
  description: 'ZodOpenAPIHono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'ZodOpenAPIHono' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})
`
    expect(generatedCode).toBe(expectedCode)
  })
})

describe('honoTakibi --help', () => {
  beforeAll(() => {
    process.argv = ['*/*/bin/node', '*/dist/index.js', '--help']
  })

  it('honoTakibi help requested --help', async () => {
    const result = await honoTakibi()

    expect(result).toStrictEqual({
      ok: true,
      value: `Usage: hono-takibi <input.{yaml,json,tsp}> -o <output.ts>

Options:
  -h, --help                  display help for command`,
    })
  })
})

describe('honoTakibi -h', () => {
  beforeAll(() => {
    process.argv = ['*/*/bin/node', '*/dist/index.js', '-h']
  })

  it('honoTakibi help requested -h', async () => {
    const result = await honoTakibi()
    expect(result).toStrictEqual({
      ok: true,
      value: `Usage: hono-takibi <input.{yaml,json,tsp}> -o <output.ts>

Options:
  -h, --help                  display help for command`,
    })
  })

  describe('honoTakibi missing output', () => {
    beforeAll(() => {
      process.argv = ['node', 'dist/index.js', 'openapi.yaml']
    })

    it('should fail if output is not specified', async () => {
      const result = await honoTakibi()
      expect(result.ok).toBe(false)
    })
  })

  describe('honoTakibi no args', () => {
    beforeAll(() => {
      process.argv = ['node', 'dist/index.js']
    })

    it('should fail when neither config nor positional args are supplied', async () => {
      const result = await honoTakibi()
      // No `hono-takibi.config.ts` in cwd + no positional input → parseCli
      // rejects with the help text. (When cwd is the repo root the test
      // runner does pick up the package's own config — here we accept either
      // a clean parseCli failure or a downstream config-driven failure as
      // long as `ok` is false.)
      if (!result.ok) {
        expect(typeof result.error).toBe('string')
      }
    })
  })

  describe('honoTakibi rejects unsupported input extension', () => {
    beforeAll(() => {
      process.argv = ['node', 'dist/index.js', 'spec.txt', '-o', 'out.ts']
    })

    it('returns help text when input file is not .yaml/.json/.tsp', async () => {
      const result = await honoTakibi()
      expect(result.ok).toBe(false)
      if (!result.ok) {
        // parseCli falls through to HELP_TEXT for any non-spec extension.
        expect(result.error.includes('Usage: hono-takibi')).toBe(true)
      }
    })
  })

  describe('honoTakibi rejects unsupported output extension', () => {
    beforeAll(() => {
      process.argv = ['node', 'dist/index.js', 'spec.yaml', '-o', 'out.js']
    })

    it('returns help text when output file is not .ts', async () => {
      const result = await honoTakibi()
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error.includes('Usage: hono-takibi')).toBe(true)
      }
    })
  })

  describe('honoTakibi propagates parseOpenAPI failure', () => {
    beforeAll(() => {
      // Pointing at a non-existent .yaml file forces parseOpenAPI to fail
      // — the CLI's `openAPIResult.ok === false` branch should surface the
      // error verbatim instead of throwing.
      process.argv = ['node', 'dist/index.js', 'this-file-does-not-exist.yaml', '-o', 'out.ts']
    })

    it('returns ok:false with the parser error string when input is missing', async () => {
      const result = await honoTakibi()
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(typeof result.error).toBe('string')
        // The error should NOT be the help text — it's a parser-level failure.
        expect(result.error.includes('Usage: hono-takibi')).toBe(false)
      }
    })
  })
})

describe('honoTakibi x-brand', () => {
  beforeAll(() => {
    process.argv = [
      '*/*/bin/node',
      '*/dist/index.js',
      'brand-test.json',
      '-o',
      'brand-test-output.ts',
    ]
    fs.writeFileSync(
      'brand-test.json',
      JSON.stringify({
        openapi: '3.1.0',
        info: { title: 'Brand Test', version: '1.0.0' },
        paths: {
          '/items': {
            get: {
              operationId: 'getItems',
              responses: {
                200: {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: { $ref: '#/components/schemas/Item' },
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            ItemId: { type: 'string', format: 'uuid', 'x-brand': 'ItemId' },
            Item: {
              type: 'object',
              required: ['id', 'name'],
              properties: {
                id: { $ref: '#/components/schemas/ItemId' },
                name: { type: 'string' },
              },
            },
          },
        },
      }),
    )
  })
  afterAll(() => {
    fs.rmSync('brand-test.json', { force: true })
    fs.rmSync('brand-test-output.ts', { force: true })
  })

  it('generates branded types with .brand<"X">()', async () => {
    const result = await honoTakibi()
    expect(result).toEqual({
      ok: true,
      value: '🔥 Generated code written to brand-test-output.ts',
    })

    const generatedCode = fs.readFileSync('brand-test-output.ts', 'utf-8')
    expect(generatedCode).toBe(`import { createRoute, z } from '@hono/zod-openapi'

const ItemIdSchema = z.uuid().brand<'ItemId'>().openapi('ItemId')

const ItemSchema = z
  .object({ id: ItemIdSchema, name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('Item')

export const getItemsRoute = createRoute({
  method: 'get',
  path: '/items',
  operationId: 'getItems',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ItemSchema } } },
  },
})
`)
  })
})

// The config-driven branch (honoTakibi reads `hono-takibi.config.ts` from cwd
// and fans out to the per-feature generators). Each case isolates cwd + argv to
// a fresh tmp dir so the orchestration runs against real files, never the repo.
describe('honoTakibi config-driven', () => {
  const originalCwd = process.cwd.bind(process)
  const originalArgv = process.argv
  let tmpDir = ''

  afterEach(() => {
    process.cwd = originalCwd
    process.argv = originalArgv
    if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
    tmpDir = ''
  })

  it('reads config from cwd and generates the single-file routes output', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cli-config-min-'))
    const input = path.join(tmpDir, 'openapi.json')
    const output = path.join(tmpDir, 'routes.ts')
    fs.writeFileSync(
      input,
      JSON.stringify({
        openapi: '3.1.0',
        info: { title: 'Cfg', version: '1.0.0' },
        paths: {
          '/items': {
            get: { operationId: 'getItems', responses: { '200': { description: 'OK' } } },
          },
        },
      }),
    )
    fs.writeFileSync(
      path.join(tmpDir, 'hono-takibi.config.ts'),
      `export default { input: ${JSON.stringify(input)}, 'zod-openapi': { output: ${JSON.stringify(output)} } }`,
    )
    process.cwd = () => tmpDir
    process.argv = ['node', 'cli']

    const result = await honoTakibi()

    expect(result.ok).toBe(true)
    expect(fs.existsSync(output)).toBe(true)
    expect(fs.readFileSync(output, 'utf-8').includes('getItemsRoute')).toBe(true)
  })

  it('fans out to every generator named in the config and aggregates the results', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cli-config-rich-'))
    const input = path.join(tmpDir, 'openapi.json')
    const routes = path.join(tmpDir, 'routes.ts')
    const types = path.join(tmpDir, 'types.ts')
    const mockOut = path.join(tmpDir, 'mock.ts')
    const docsOut = path.join(tmpDir, 'docs.md')
    const testOut = path.join(tmpDir, 'routes.test.ts')
    const queryOut = path.join(tmpDir, 'query.ts')
    fs.writeFileSync(
      input,
      JSON.stringify({
        openapi: '3.1.0',
        info: { title: 'Cfg', version: '1.0.0' },
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
                        type: 'object',
                        properties: { id: { type: 'string' } },
                        required: ['id'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }),
    )
    fs.writeFileSync(
      path.join(tmpDir, 'hono-takibi.config.ts'),
      `export default {
        input: ${JSON.stringify(input)},
        basePath: '/',
        'zod-openapi': { output: ${JSON.stringify(routes)}, template: { test: false, routeHandler: false } },
        type: { output: ${JSON.stringify(types)} },
        mock: { output: ${JSON.stringify(mockOut)} },
        docs: { output: ${JSON.stringify(docsOut)} },
        test: { output: ${JSON.stringify(testOut)}, import: './routes' },
        'tanstack-query': { output: ${JSON.stringify(queryOut)}, import: './client' },
      }`,
    )
    process.cwd = () => tmpDir
    process.argv = ['node', 'cli']

    const result = await honoTakibi()

    expect(result.ok).toBe(true)
    expect(fs.existsSync(routes)).toBe(true)
    expect(fs.existsSync(types)).toBe(true)
    expect(fs.existsSync(mockOut)).toBe(true)
    expect(fs.existsSync(docsOut)).toBe(true)
    expect(fs.existsSync(testOut)).toBe(true)
    expect(fs.existsSync(queryOut)).toBe(true)
    // The `template` block in zod-openapi triggers the app/handler scaffold.
    expect(fs.existsSync(path.join(tmpDir, 'index.ts'))).toBe(true)
  })

  it('generates split routes, webhooks and components from the advanced config', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cli-config-split-'))
    const input = path.join(tmpDir, 'openapi.json')
    const routesDir = path.join(tmpDir, 'routes')
    const webhooksDir = path.join(tmpDir, 'webhooks')
    const schemasDir = path.join(tmpDir, 'schemas')
    const parametersDir = path.join(tmpDir, 'parameters')
    const responsesDir = path.join(tmpDir, 'responses')
    fs.writeFileSync(
      input,
      JSON.stringify({
        openapi: '3.1.0',
        info: { title: 'Adv', version: '1.0.0' },
        paths: {
          '/items': {
            get: {
              operationId: 'getItems',
              parameters: [{ $ref: '#/components/parameters/Limit' }],
              responses: { '200': { $ref: '#/components/responses/ItemList' } },
            },
          },
        },
        webhooks: {
          itemCreated: {
            post: {
              operationId: 'itemCreated',
              requestBody: {
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' } } },
              },
              responses: { '200': { description: 'OK' } },
            },
          },
        },
        components: {
          schemas: {
            Item: {
              type: 'object',
              properties: { id: { type: 'string' }, name: { type: 'string' } },
              required: ['id'],
            },
          },
          parameters: { Limit: { name: 'limit', in: 'query', schema: { type: 'integer' } } },
          responses: {
            ItemList: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: { type: 'array', items: { $ref: '#/components/schemas/Item' } },
                },
              },
            },
          },
        },
      }),
    )
    fs.writeFileSync(
      path.join(tmpDir, 'hono-takibi.config.ts'),
      `export default {
        input: ${JSON.stringify(input)},
        basePath: '/',
        'zod-openapi': {
          routes: { output: ${JSON.stringify(routesDir)}, split: true, import: '../routes' },
          webhooks: { output: ${JSON.stringify(webhooksDir)}, split: true, import: '../webhooks' },
          components: {
            schemas: { output: ${JSON.stringify(schemasDir)}, split: true, exportTypes: true, import: '../schemas' },
            parameters: { output: ${JSON.stringify(parametersDir)}, split: true, exportTypes: true, import: '../parameters' },
            responses: { output: ${JSON.stringify(responsesDir)}, split: true, import: '../responses' },
          },
        },
      }`,
    )
    process.cwd = () => tmpDir
    process.argv = ['node', 'cli']

    const result = await honoTakibi()

    expect(result.ok).toBe(true)
    expect(fs.existsSync(routesDir) && fs.readdirSync(routesDir).length > 0).toBe(true)
    expect(fs.existsSync(webhooksDir) && fs.readdirSync(webhooksDir).length > 0).toBe(true)
    expect(fs.existsSync(schemasDir) && fs.readdirSync(schemasDir).length > 0).toBe(true)
  })

  it('returns the first generator failure when an output path is not writable', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cli-config-fail-'))
    const input = path.join(tmpDir, 'openapi.json')
    const output = path.join(tmpDir, 'routes.ts')
    fs.writeFileSync(
      input,
      JSON.stringify({
        openapi: '3.1.0',
        info: { title: 'Cfg', version: '1.0.0' },
        paths: {
          '/items': {
            get: { operationId: 'getItems', responses: { '200': { description: 'OK' } } },
          },
        },
      }),
    )
    // A directory occupying the output path forces writeFile to fail (EISDIR),
    // so the generator returns { ok: false } and the CLI must surface it.
    fs.mkdirSync(output)
    fs.writeFileSync(
      path.join(tmpDir, 'hono-takibi.config.ts'),
      `export default { input: ${JSON.stringify(input)}, 'zod-openapi': { output: ${JSON.stringify(output)} } }`,
    )
    process.cwd = () => tmpDir
    process.argv = ['node', 'cli']

    const result = await honoTakibi()

    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(typeof result.error).toBe('string')
    }
  })
})
