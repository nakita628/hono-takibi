import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../../../openapi/index.js'
import { routeCode } from './index.js'

describe('routeCode', () => {
  it.concurrent('routeCode Test', () => {
    const result = routeCode({
      openapi: '3.0.0',
      info: { title: 'Test', version: '1.0.0' },
      tags: [{ name: 'Hono' }],
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
      },
    })
    const expected = `export const getHonoRoute=createRoute({method:"get",path:"/hono",tags:["Hono"],summary:"Hono",description:"Hono",responses:{200:{description:"OK",content:{'application/json':{schema:z.object({message:z.string().openapi({"example":"Hono"})}).openapi({"required":["message"]})}}}}})`
    expect(result).toBe(expected)
  })

  it.concurrent('resolves $ref to components/pathItems', () => {
    const result = routeCode({
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users/{id}': {
          $ref: '#/components/pathItems/UserOperations',
        },
      },
      components: {
        pathItems: {
          UserOperations: {
            get: {
              operationId: 'getUser',
              responses: {
                '200': { description: 'OK' },
              },
            },
            put: {
              operationId: 'updateUser',
              responses: {
                '200': { description: 'OK' },
              },
            },
          },
        },
      },
    })
    const expected = `export const getUsersIdRoute=createRoute({method:"get",path:"/users/{id}",operationId:"getUser",responses:{200:{description:"OK"}}})

export const putUsersIdRoute=createRoute({method:"put",path:"/users/{id}",operationId:"updateUser",responses:{200:{description:"OK"}}})`
    expect(result).toBe(expected)
  })

  it.concurrent('merges $ref with sibling properties (OpenAPI 3.1)', () => {
    const result = routeCode({
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users/{id}': {
          $ref: '#/components/pathItems/UserOperations',
          summary: 'User operations',
          description: 'Operations for a specific user',
        },
      },
      components: {
        pathItems: {
          UserOperations: {
            get: {
              operationId: 'getUser',
              responses: {
                '200': { description: 'OK' },
              },
            },
          },
        },
      },
    })
    const expected = `export const getUsersIdRoute=createRoute({method:"get",path:"/users/{id}",operationId:"getUser",responses:{200:{description:"OK"}}})`
    expect(result).toBe(expected)
  })

  it.concurrent('drops x-* vendor extensions from the emitted route object', () => {
    const result = routeCode({
      openapi: '3.1.0',
      info: { title: 'T', version: '1.0.0' },
      paths: {
        '/x': {
          get: {
            operationId: 'gx',
            'x-codeSamples': [{ lang: 'curl', source: 'curl example.com' }],
            'x-internal': true,
            'x-rate-limit': '100/min',
            responses: { '200': { description: 'OK' } },
          } as OpenAPI['paths'][string]['get'],
        },
      },
    } as OpenAPI)
    expect(result).toBe(
      `export const getXRoute=createRoute({method:"get",path:"/x",operationId:"gx",responses:{200:{description:"OK"}}})`,
    )
  })

  it.concurrent('returns empty string for empty paths object', () => {
    expect(
      routeCode({
        openapi: '3.0.0',
        info: { title: 'T', version: '0.0.0' },
        paths: {},
      }),
    ).toBe('')
  })

  it.concurrent('skips nullish path items', () => {
    const result = routeCode({
      openapi: '3.0.0',
      info: { title: 'T', version: '0.0.0' },
      paths: {
        '/skipped': null,
        '/kept': {
          get: { operationId: 'k', responses: { '200': { description: 'OK' } } },
        },
      },
    } as unknown as OpenAPI)
    expect(result).toBe(
      `export const getKeptRoute=createRoute({method:"get",path:"/kept",operationId:"k",responses:{200:{description:"OK"}}})`,
    )
  })

  it.concurrent('skips operations without responses', () => {
    const result = routeCode({
      openapi: '3.0.0',
      info: { title: 'T', version: '0.0.0' },
      paths: {
        '/p': {
          get: { operationId: 'g', responses: { '200': { description: 'OK' } } },
          post: { operationId: 'p' },
        },
      },
    } as unknown as OpenAPI)
    expect(result).toBe(
      `export const getPRoute=createRoute({method:"get",path:"/p",operationId:"g",responses:{200:{description:"OK"}}})`,
    )
  })

  it.concurrent('emits routes for multiple HTTP methods on the same path in declared method order', () => {
    const result = routeCode({
      openapi: '3.0.0',
      info: { title: 'T', version: '0.0.0' },
      paths: {
        '/r': {
          post: { operationId: 'cp', responses: { '201': { description: 'Created' } } },
          get: { operationId: 'cg', responses: { '200': { description: 'OK' } } },
          delete: { operationId: 'cd', responses: { '204': { description: 'No Content' } } },
        },
      },
    })
    expect(result).toBe(
      [
        `export const getRRoute=createRoute({method:"get",path:"/r",operationId:"cg",responses:{200:{description:"OK"}}})`,
        `export const postRRoute=createRoute({method:"post",path:"/r",operationId:"cp",responses:{201:{description:"Created"}}})`,
        `export const deleteRRoute=createRoute({method:"delete",path:"/r",operationId:"cd",responses:{204:{description:"No Content"}}})`,
      ].join('\n\n'),
    )
  })
})
