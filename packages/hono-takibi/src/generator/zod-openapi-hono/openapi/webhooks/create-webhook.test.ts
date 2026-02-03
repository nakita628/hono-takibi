import { describe, expect, it } from 'vitest'
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
})
