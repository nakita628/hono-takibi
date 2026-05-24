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
    const expected = `export const orderStatusPostWebhook={method:"post",path:"/orderStatus",operationId:"orderStatusUpdate",responses:{200:{description:"OK"}}}`
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
    const expected = `export const orderStatusPostWebhook={method:"post",path:"/orderStatus",responses:{200:{description:"OK"}}}

export const paymentReceivedPostWebhook={method:"post",path:"/paymentReceived",responses:{200:{description:"OK"}}}`
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
    const expected = `export const eventsGetWebhook={method:"get",path:"/events",responses:{200:{description:"OK"}}}

export const eventsPostWebhook={method:"post",path:"/events",responses:{200:{description:"OK"}}}`
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
    const expected = `export const testPostWebhook={method:"post",path:"/test",responses:{200:{description:"OK"}}} as const`
    expect(result).toBe(expected)
  })

  it.concurrent('filters out methods without responses on the same pathItem', () => {
    const openapi = {
      paths: {},
      webhooks: {
        ev: {
          post: { responses: { '200': { description: 'OK' } } },
          // `get` lacks `responses` → filtered out
          get: {},
        },
      },
    } as unknown as OpenAPI
    expect(webhookCode(openapi)).toBe(
      `export const evPostWebhook={method:"post",path:"/ev",responses:{200:{description:"OK"}}}`,
    )
  })

  it.concurrent('serializes all optional operation fields', () => {
    const openapi = {
      paths: {},
      webhooks: {
        ev: {
          post: {
            tags: ['Notify'],
            summary: 'Sum',
            description: 'Desc',
            externalDocs: { url: 'https://example.com' },
            operationId: 'evPost',
            deprecated: true,
            security: [{ apiKey: [] }],
            servers: [{ url: 'https://hooks.example.com' }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    } as unknown as OpenAPI
    expect(webhookCode(openapi)).toBe(
      `export const evPostWebhook={method:"post",path:"/ev",tags:["Notify"],summary:"Sum",description:"Desc",externalDocs:{"url":"https://example.com"},operationId:"evPost",responses:{200:{description:"OK"}},deprecated:true,security:[{"apiKey":[]}],servers:[{"url":"https://hooks.example.com"}]}`,
    )
  })

  it.concurrent('resolves parameter $ref; unresolved and wrong-path refs are filtered out', () => {
    const openapi = {
      paths: {},
      webhooks: {
        ev: {
          post: {
            // Valid → resolved; Missing → `if (!resolved) return undefined`; WrongPath
            // (#/components/schemas/X) → `if (!(ref && isParameterRef(ref))) return undefined`
            parameters: [
              { $ref: '#/components/parameters/Valid' },
              { $ref: '#/components/parameters/Missing' },
              { $ref: '#/components/schemas/WrongPath' },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        parameters: { Valid: { name: 'v', in: 'query', schema: { type: 'string' } } },
      },
    } as unknown as OpenAPI
    expect(webhookCode(openapi)).toBe(
      `export const evPostWebhook={method:"post",path:"/ev",request:{query:z.object({v:ValidParamsSchema})},responses:{200:{description:"OK"}}}`,
    )
  })

  it.concurrent('merges pathItem-level parameters with operation-level parameters', () => {
    const openapi = {
      paths: {},
      webhooks: {
        ev: {
          parameters: [{ name: 'p', in: 'query', schema: { type: 'string' } }],
          post: {
            parameters: [{ name: 'q', in: 'query', schema: { type: 'integer' } }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    } as unknown as OpenAPI
    expect(webhookCode(openapi)).toBe(
      `export const evPostWebhook={method:"post",path:"/ev",request:{query:z.object({p:z.string().exactOptional().openapi({param:{"name":"p","in":"query","schema":{"type":"string"}}}),q:z.coerce.number().pipe(z.int()).exactOptional().openapi({param:{"name":"q","in":"query","schema":{"type":"integer"}}})})},responses:{200:{description:"OK"}}}`,
    )
  })

  it.concurrent('skips nullish pathItems while keeping valid ones', () => {
    const openapi = {
      paths: {},
      webhooks: {
        good: { post: { responses: { '200': { description: 'OK' } } } },
        bad: null,
      },
    } as unknown as OpenAPI
    expect(webhookCode(openapi)).toBe(
      `export const goodPostWebhook={method:"post",path:"/good",responses:{200:{description:"OK"}}}`,
    )
  })

  it.concurrent('wraps operation.callbacks in `callbacks:{...}` (regression: previously omitted)', () => {
    const openapi = {
      paths: {},
      webhooks: {
        ev: {
          post: {
            callbacks: {
              cb: {
                '{$request.body#/url}': {
                  post: { responses: { '200': { description: 'OK' } } },
                },
              },
            },
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    } as unknown as OpenAPI
    expect(webhookCode(openapi)).toBe(
      `export const evPostWebhook={method:"post",path:"/ev",responses:{200:{description:"OK"}},callbacks:{"cb":{"{$request.body#/url}":{post:{responses:{200:{description:"OK"}}}}}}}`,
    )
  })

  it.concurrent('emits no `request:` when every parameter $ref fails to resolve (regression: previously emitted `{undefined:z.object({undefined:...})}`)', () => {
    const openapi = {
      paths: {},
      webhooks: {
        ev: {
          post: {
            parameters: [
              { $ref: '#/components/parameters/Missing' },
              { $ref: '#/components/schemas/WrongPath' },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    } as unknown as OpenAPI
    expect(webhookCode(openapi)).toBe(
      `export const evPostWebhook={method:"post",path:"/ev",responses:{200:{description:"OK"}}}`,
    )
  })

  it.concurrent('drops x-* vendor extensions from the emitted webhook object', () => {
    const openapi = {
      paths: {},
      webhooks: {
        ev: {
          post: {
            operationId: 'evPost',
            'x-deprecated-reason': 'use v2',
            'x-custom-meta': 42,
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    } as unknown as OpenAPI
    expect(webhookCode(openapi)).toBe(
      `export const evPostWebhook={method:"post",path:"/ev",operationId:"evPost",responses:{200:{description:"OK"}}}`,
    )
  })

  it.concurrent('returns empty string when webhooks is an empty object', () => {
    const openapi = { paths: {}, webhooks: {} } as unknown as OpenAPI
    expect(webhookCode(openapi)).toBe('')
  })

  it.concurrent('returns empty string when every method lacks responses', () => {
    const openapi = {
      paths: {},
      webhooks: {
        ev: {
          post: { operationId: 'evPost' },
          get: { operationId: 'evGet' },
        },
      },
    } as unknown as OpenAPI
    expect(webhookCode(openapi)).toBe('')
  })

  it.concurrent('skips operations without responses while keeping siblings', () => {
    const openapi = {
      paths: {},
      webhooks: {
        ev: {
          post: { operationId: 'evPost', responses: { '200': { description: 'OK' } } },
          get: { operationId: 'evGet' },
        },
      },
    } as unknown as OpenAPI
    expect(webhookCode(openapi)).toBe(
      `export const evPostWebhook={method:"post",path:"/ev",operationId:"evPost",responses:{200:{description:"OK"}}}`,
    )
  })
})
