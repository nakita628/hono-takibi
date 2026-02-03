import { describe, expect, it } from 'vitest'
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
    const expected = `export const getHonoRoute=createRoute({method:'get',path:'/hono',tags:["Hono"],summary:"Hono",description:"Hono",responses:{200:{description:"OK",content:{'application/json':{schema:z.object({message:z.string().openapi({"example":"Hono"})}).openapi({"required":["message"]})}}}}})`
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
    const expected = `export const getUsersIdRoute=createRoute({method:'get',path:'/users/{id}',operationId:'getUser',responses:{200:{description:"OK"}}})

export const putUsersIdRoute=createRoute({method:'put',path:'/users/{id}',operationId:'updateUser',responses:{200:{description:"OK"}}})`
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
    const expected = `export const getUsersIdRoute=createRoute({method:'get',path:'/users/{id}',operationId:'getUser',responses:{200:{description:"OK"}}})`
    expect(result).toBe(expected)
  })
})
