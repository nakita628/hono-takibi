import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { webhooks } from './index.js'

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
      const result = await webhooks(mockOpenAPI, { output: '/tmp/test-webhooks-single.ts' })
      expect(result).toStrictEqual({
        ok: true,
        value: 'Generated webhooks code written to /tmp/test-webhooks-single.ts',
      })

      const content = readFileSync('/tmp/test-webhooks-single.ts', 'utf-8')
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
      const result = await webhooks(mockOpenAPI, {
        output: '/tmp/test-webhooks-split',
        split: true,
      })
      expect(result).toStrictEqual({
        ok: true,
        value:
          'Generated webhooks code written to /tmp/test-webhooks-split/*.ts (index.ts included)',
      })

      const newOrderContent = readFileSync('/tmp/test-webhooks-split/newOrderPost.ts', 'utf-8')
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

      const indexContent = readFileSync('/tmp/test-webhooks-split/index.ts', 'utf-8')
      const expectedIndex = `export * from './newOrderPost'
export * from './userCreatedPost'
`
      expect(indexContent).toBe(expectedIndex)
    })
  })

  describe('webhook without schema references', () => {
    it('generates webhook without import statement', async () => {
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
      const result = await webhooks(simpleWebhook, { output: '/tmp/test-webhooks-no-schema.ts' })
      expect(result).toStrictEqual({
        ok: true,
        value: 'Generated webhooks code written to /tmp/test-webhooks-no-schema.ts',
      })

      const content = readFileSync('/tmp/test-webhooks-no-schema.ts', 'utf-8')
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
})
