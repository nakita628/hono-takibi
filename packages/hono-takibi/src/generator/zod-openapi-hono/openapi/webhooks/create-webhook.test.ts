import { describe, expect, it } from 'vite-plus/test'

import { createWebhook, webhookName } from './create-webhook.js'

describe('webhookName', () => {
  it.concurrent.each([
    ['orderStatus', 'post', 'orderStatusPostWebhook'],
    ['payment-completed', 'post', 'paymentCompletedPostWebhook'],
    ['new_user', 'post', 'newUserPostWebhook'],
    ['OrderStatus', 'get', 'orderStatusGetWebhook'],
    ['order', 'put', 'orderPutWebhook'],
  ])('webhookName(%s, %s) → %s', (name, method, expected) => {
    expect(webhookName(name, method)).toBe(expected)
  })
})

describe('createWebhook', () => {
  it.concurrent('creates webhook definition', () => {
    const result = createWebhook('orderStatus', 'post', {
      operationId: 'orderStatusUpdate',
      tags: ['Orders'],
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                name: 'root',
                type: 'object',
                properties: {
                  message: {
                    name: 'message',
                    type: 'string',
                    example: 'Order updated',
                  },
                },
                required: ['message'],
              },
            },
          },
        },
      },
    })
    const expected = `export const orderStatusPostWebhook={method:'post',path:'/orderStatus',tags:["Orders"],operationId:'orderStatusUpdate',responses:{200:{description:"OK",content:{'application/json':{schema:z.object({message:z.string().openapi({"name":"message","example":"Order updated"})}).openapi({"name":"root","required":["message"]})}}}}}`
    expect(result).toBe(expected)
  })

  it.concurrent('creates webhook with as const', () => {
    const result = createWebhook(
      'orderStatus',
      'post',
      {
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
      true,
    )
    const expected = `export const orderStatusPostWebhook={method:'post',path:'/orderStatus',responses:{200:{description:"OK"}}} as const`
    expect(result).toBe(expected)
  })

  it.concurrent('creates webhook with request body', () => {
    const result = createWebhook('newOrder', 'post', {
      operationId: 'handleNewOrder',
      summary: 'New order webhook',
      description: 'Called when a new order is created',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                orderId: {
                  type: 'string',
                },
                amount: {
                  type: 'number',
                },
              },
              required: ['orderId', 'amount'],
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Webhook received successfully',
        },
      },
    })
    const expected = `export const newOrderPostWebhook={method:'post',path:'/newOrder',summary:"New order webhook",description:"Called when a new order is created",operationId:'handleNewOrder',request:{body:{content:{'application/json':{schema:z.object({orderId:z.string(),amount:z.number()}).openapi({"required":["orderId","amount"]})}},required:true}},responses:{200:{description:"Webhook received successfully"}}}`
    expect(result).toBe(expected)
  })

  it.concurrent('creates webhook with readonly and as const', () => {
    const result = createWebhook(
      'orderUpdate',
      'post',
      {
        operationId: 'handleOrderUpdate',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { orderId: { type: 'string' } },
                required: ['orderId'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
        },
      },
      true,
    )
    expect(result).toBe(
      `export const orderUpdatePostWebhook={method:'post',path:'/orderUpdate',operationId:'handleOrderUpdate',request:{body:{content:{'application/json':{schema:z.object({orderId:z.string()}).readonly().openapi({"required":["orderId"]})}},required:true}},responses:{200:{description:"OK",content:{'application/json':{schema:z.object({ok:z.boolean()}).readonly().openapi({"required":["ok"]})}}}}} as const`,
    )
  })

  it.concurrent('creates webhook with deprecated and security', () => {
    const result = createWebhook('legacyHook', 'post', {
      operationId: 'legacyWebhook',
      deprecated: true,
      security: [{ apiKey: [] }] as any,
      responses: { '200': { description: 'OK' } },
    })
    expect(result).toBe(
      `export const legacyHookPostWebhook={method:'post',path:'/legacyHook',operationId:'legacyWebhook',responses:{200:{description:"OK"}},deprecated:true,security:[{"apiKey":[]}]}`,
    )
  })

  it.concurrent('creates webhook with externalDocs', () => {
    const result = createWebhook('event', 'post', {
      operationId: 'handleEvent',
      externalDocs: { url: 'https://docs.example.com' },
      responses: { '200': { description: 'OK' } },
    })
    expect(result).toBe(
      `export const eventPostWebhook={method:'post',path:'/event',externalDocs:{"url":"https://docs.example.com"},operationId:'handleEvent',responses:{200:{description:"OK"}}}`,
    )
  })

  it.concurrent('creates minimal webhook without optional fields', () => {
    const result = createWebhook('simple', 'post', {
      responses: { '200': { description: 'OK' } },
    })
    expect(result).toBe(
      `export const simplePostWebhook={method:'post',path:'/simple',responses:{200:{description:"OK"}}}`,
    )
  })

  it.concurrent('creates webhook with callbacks', () => {
    const result = createWebhook('order', 'post', {
      operationId: 'handleOrder',
      callbacks: {
        statusUpdate: {
          '{$request.body#/callbackUrl}': {
            post: {
              operationId: 'onStatusUpdate',
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      } as any,
      responses: { '200': { description: 'OK' } },
    })
    // makeCallbacks returns inline entries (not wrapped with callbacks:{})
    expect(result.includes('"statusUpdate"')).toBe(true)
    expect(result.includes('onStatusUpdate')).toBe(true)
  })

  it.concurrent('creates webhook with servers', () => {
    const result = createWebhook('event', 'post', {
      operationId: 'handleEvent',
      servers: [{ url: 'https://webhook.example.com' }],
      responses: { '200': { description: 'OK' } },
    })
    expect(result).toBe(
      `export const eventPostWebhook={method:'post',path:'/event',operationId:'handleEvent',responses:{200:{description:"OK"}},servers:[{"url":"https://webhook.example.com"}]}`,
    )
  })
})
