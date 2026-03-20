import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../../../openapi/index.js'
import { webhookCode } from './index.js'

describe('webhookCode', () => {
  it.concurrent('returns empty string when no webhooks', () => {
    const openapi = {
      paths: {},
    } as unknown as OpenAPI
    expect(webhookCode(openapi)).toBe('')
  })

  it.concurrent('generates webhook code from OpenAPI webhooks', () => {
    const openapi = {
      paths: {},
      webhooks: {
        orderStatus: {
          post: {
            operationId: 'orderStatusUpdate',
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      },
    } as unknown as OpenAPI
    const result = webhookCode(openapi)
    const expected = `export const orderStatusPostWebhook={method:'post',path:'/orderStatus',operationId:'orderStatusUpdate',responses:{200:{description:"OK"}}}`
    expect(result).toBe(expected)
  })

  it.concurrent('generates multiple webhooks', () => {
    const openapi = {
      paths: {},
      webhooks: {
        orderStatus: {
          post: {
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
        paymentReceived: {
          post: {
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
      },
    } as unknown as OpenAPI
    const result = webhookCode(openapi)
    const expected = `export const orderStatusPostWebhook={method:'post',path:'/orderStatus',responses:{200:{description:"OK"}}}

export const paymentReceivedPostWebhook={method:'post',path:'/paymentReceived',responses:{200:{description:"OK"}}}`
    expect(result).toBe(expected)
  })

  it.concurrent('handles webhook with multiple methods', () => {
    const openapi = {
      paths: {},
      webhooks: {
        events: {
          post: {
            responses: {
              '200': { description: 'OK' },
            },
          },
          get: {
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
      },
    } as unknown as OpenAPI
    const result = webhookCode(openapi)
    const expected = `export const eventsGetWebhook={method:'get',path:'/events',responses:{200:{description:"OK"}}}

export const eventsPostWebhook={method:'post',path:'/events',responses:{200:{description:"OK"}}}`
    expect(result).toBe(expected)
  })

  it.concurrent('applies readonly when specified', () => {
    const openapi = {
      paths: {},
      webhooks: {
        test: {
          post: {
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
      },
    } as unknown as OpenAPI
    const result = webhookCode(openapi, true)
    const expected = `export const testPostWebhook={method:'post',path:'/test',responses:{200:{description:"OK"}}} as const`
    expect(result).toBe(expected)
  })
})
