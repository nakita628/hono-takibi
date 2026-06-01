import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import { webhookCode } from '../../generator/zod-openapi-hono/openapi/webhooks/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { webhooks } from './index.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('webhooks', () => {
  const mockOpenAPI: OpenAPI = {
    openapi: '3.1.0',
    info: { title: 'Test API', version: '1.0.0' },
    paths: {},
    components: {
      schemas: {
        OrderEvent: {
          type: 'object',
          properties: {
            orderId: { type: 'string' },
            amount: { type: 'number' },
          },
          required: ['orderId', 'amount'],
        },
        UserEvent: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
          required: ['userId', 'email'],
        },
      },
    },
    webhooks: {
      newOrder: {
        post: {
          operationId: 'newOrderWebhook',
          summary: 'New order webhook',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OrderEvent' },
              },
            },
          },
          responses: {
            '200': { description: 'OK' },
          },
        },
      },
      userCreated: {
        post: {
          operationId: 'userCreatedWebhook',
          summary: 'User created webhook',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserEvent' },
              },
            },
          },
          responses: {
            '200': { description: 'OK' },
          },
        },
      },
    },
  }

  it('returns error when output is missing', async () => {
    const result = await webhooks(mockOpenAPI, undefined)
    expect(result).toStrictEqual({ ok: false, error: 'webhooks.output is required' })
  })

  it('returns error when no webhooks in spec', async () => {
    const noWebhooks: OpenAPI = { ...mockOpenAPI, webhooks: undefined }
    const result = await webhooks(noWebhooks, { output: 'output.ts' })
    expect(result).toStrictEqual({ ok: false, error: 'No webhooks found' })
  })

  describe('single file mode', () => {
    it('generates webhooks file with correct content', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-webhooks-'))
      const out = path.join(tmpDir, 'webhooks.ts')
      const result = await webhooks(mockOpenAPI, { output: out })
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated webhooks code written to ${out}`,
      })

      const content = fs.readFileSync(out, 'utf-8')
      const expected = `import { OrderEventSchema, UserEventSchema } from './schemas'

export const newOrderPostWebhook = {
  method: 'post',
  path: '/newOrder',
  summary: 'New order webhook',
  operationId: 'newOrderWebhook',
  request: {
    body: { content: { 'application/json': { schema: OrderEventSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
}

export const userCreatedPostWebhook = {
  method: 'post',
  path: '/userCreated',
  summary: 'User created webhook',
  operationId: 'userCreatedWebhook',
  request: {
    body: { content: { 'application/json': { schema: UserEventSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
}
`
      expect(content).toBe(expected)
    })
  })

  describe('split mode', () => {
    it('generates separate files for each webhook', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-webhooks-'))
      const out = path.join(tmpDir, 'webhooks')
      const result = await webhooks(mockOpenAPI, {
        output: out,
        split: true,
      })
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated webhooks code written to ${out}/*.ts (index.ts included)`,
      })

      const newOrderContent = fs.readFileSync(path.join(out, 'newOrderPost.ts'), 'utf-8')
      const expectedNewOrder = `import { OrderEventSchema } from './schemas'

export const newOrderPostWebhook = {
  method: 'post',
  path: '/newOrder',
  summary: 'New order webhook',
  operationId: 'newOrderWebhook',
  request: {
    body: { content: { 'application/json': { schema: OrderEventSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
}
`
      expect(newOrderContent).toBe(expectedNewOrder)

      const userCreatedContent = fs.readFileSync(path.join(out, 'userCreatedPost.ts'), 'utf-8')
      const expectedUserCreated = `import { UserEventSchema } from './schemas'

export const userCreatedPostWebhook = {
  method: 'post',
  path: '/userCreated',
  summary: 'User created webhook',
  operationId: 'userCreatedWebhook',
  request: {
    body: { content: { 'application/json': { schema: UserEventSchema } }, required: true },
  },
  responses: { 200: { description: 'OK' } },
}
`
      expect(userCreatedContent).toBe(expectedUserCreated)

      const indexContent = fs.readFileSync(path.join(out, 'index.ts'), 'utf-8')
      const expectedIndex = `export * from './newOrderPost'
export * from './userCreatedPost'
`
      expect(indexContent).toBe(expectedIndex)
    })
  })

  describe('webhook without schema references', () => {
    it('generates webhook without import statement', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-webhooks-'))
      const out = path.join(tmpDir, 'webhooks.ts')
      const simpleWebhook: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'Test', version: '1.0.0' },
        paths: {},
        webhooks: {
          simple: {
            post: {
              operationId: 'simpleWebhook',
              responses: {
                '200': { description: 'OK' },
              },
            },
          },
        },
      }
      const result = await webhooks(simpleWebhook, { output: out })
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated webhooks code written to ${out}`,
      })

      const content = fs.readFileSync(out, 'utf-8')
      const expected = `export const simplePostWebhook = {
  method: 'post',
  path: '/simple',
  operationId: 'simpleWebhook',
  responses: { 200: { description: 'OK' } },
}
`
      expect(content).toBe(expected)
    })
  })

  describe('caller ≡ generator contract', () => {
    it('non-split: caller emit contains same const names as generator output', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-webhooks-contract-'))
      const out = path.join(tmpDir, 'webhooks.ts')
      const result = await webhooks(mockOpenAPI, { output: out })
      expect(result.ok).toBe(true)
      const emitted = fs.readFileSync(out, 'utf-8')
      const generated = webhookCode(mockOpenAPI)
      const emittedNames = new Set(
        [...emitted.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)Webhook\s*=/g)].map(
          (m) => m[1],
        ),
      )
      const generatedNames = new Set(
        [...generated.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)Webhook\s*=/g)].map(
          (m) => m[1],
        ),
      )
      expect(emittedNames).toStrictEqual(generatedNames)
    })

    it('split: union of per-file const names equals generator output const names', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-webhooks-contract-'))
      const outDir = path.join(tmpDir, 'webhooks')
      const result = await webhooks(mockOpenAPI, { output: outDir, split: true })
      expect(result.ok).toBe(true)
      const files = fs.readdirSync(outDir).filter((f) => f !== 'index.ts')
      const emittedNames = new Set<string>()
      for (const f of files) {
        const src = fs.readFileSync(path.join(outDir, f), 'utf-8')
        for (const m of src.matchAll(
          /(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)Webhook\s*=/g,
        )) {
          if (m[1] !== undefined) emittedNames.add(m[1])
        }
      }
      const generated = webhookCode(mockOpenAPI)
      const generatedNames = new Set(
        [...generated.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)Webhook\s*=/g)].map(
          (m) => m[1],
        ),
      )
      expect(emittedNames).toStrictEqual(generatedNames)
    })

    it('split: barrel index lists every per-file module sorted alphabetically', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-webhooks-contract-'))
      const outDir = path.join(tmpDir, 'webhooks')
      await webhooks(mockOpenAPI, { output: outDir, split: true })
      const indexContent = fs.readFileSync(path.join(outDir, 'index.ts'), 'utf-8')
      expect(indexContent).toBe(
        "export * from './newOrderPost'\nexport * from './userCreatedPost'\n",
      )
    })
  })

  describe('multi-method per webhook', () => {
    const multiMethodOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'T', version: '1.0.0' },
      paths: {},
      webhooks: {
        events: {
          post: { operationId: 'evPost', responses: { '200': { description: 'OK' } } },
          get: { operationId: 'evGet', responses: { '200': { description: 'OK' } } },
        },
      },
    }

    it('split: each method becomes its own file, barrel lists them sorted', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-webhooks-multimethod-'))
      const outDir = path.join(tmpDir, 'webhooks')
      const result = await webhooks(multiMethodOpenAPI, { output: outDir, split: true })
      expect(result.ok).toBe(true)
      const files = fs
        .readdirSync(outDir)
        .filter((f) => f !== 'index.ts')
        .sort()
      expect(files).toStrictEqual(['eventsGet.ts', 'eventsPost.ts'])
      const indexContent = fs.readFileSync(path.join(outDir, 'index.ts'), 'utf-8')
      expect(indexContent).toBe("export * from './eventsGet'\nexport * from './eventsPost'\n")
    })
  })

  describe('$ref resolution', () => {
    it('resolves a webhook path-level parameter $ref to an existing component parameter', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-webhooks-ref-'))
      const out = path.join(tmpDir, 'webhooks.ts')
      const refOpenapi: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {},
        webhooks: {
          ping: {
            parameters: [{ $ref: '#/components/parameters/TraceId' }],
            post: {
              operationId: 'pingHook',
              responses: { '200': { description: 'OK' } },
            },
          },
        },
        components: {
          parameters: {
            TraceId: {
              name: 'x-trace-id',
              in: 'header',
              required: true,
              schema: { type: 'string' },
            },
          },
        },
      }
      const result = await webhooks(refOpenapi, { output: out })
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated webhooks code written to ${out}`,
      })
      expect(fs.readFileSync(out, 'utf-8')).toBe(`import { z } from '@hono/zod-openapi'
import { TraceIdParamsSchema } from './parameters'

export const pingPostWebhook = {
  method: 'post',
  path: '/ping',
  operationId: 'pingHook',
  request: { headers: z.object({ 'x-trace-id': TraceIdParamsSchema }) },
  responses: { 200: { description: 'OK' } },
}
`)
    })
  })

  describe('empty webhooks edge cases', () => {
    it('returns success "No webhooks found" for empty webhooks object', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-webhooks-empty-'))
      const out = path.join(tmpDir, 'webhooks.ts')
      const result = await webhooks(
        {
          openapi: '3.1.0',
          info: { title: 'T', version: '1.0.0' },
          paths: {},
          webhooks: {},
        } as OpenAPI,
        { output: out },
      )
      expect(result).toStrictEqual({ ok: true, value: 'No webhooks found' })
    })

    it('returns success "No webhooks found" when every method lacks responses', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-webhooks-empty-'))
      const out = path.join(tmpDir, 'webhooks.ts')
      const result = await webhooks(
        {
          openapi: '3.1.0',
          info: { title: 'T', version: '1.0.0' },
          paths: {},
          webhooks: {
            ev: { post: { operationId: 'p' }, get: { operationId: 'g' } },
          },
        } as unknown as OpenAPI,
        { output: out },
      )
      expect(result).toStrictEqual({ ok: true, value: 'No webhooks found' })
    })
  })
})
