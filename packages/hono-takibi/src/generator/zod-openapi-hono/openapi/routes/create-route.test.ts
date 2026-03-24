import { describe, expect, it } from 'vite-plus/test'
import { createRoute } from './create-route.js'

describe('createRoute', () => {
  it.concurrent('createRoute Test', () => {
    const result = createRoute('/posts', 'post', {
      operationId: 'updatePost',
      tags: ['Hono'],
      responses: {
        '200': {
          description: 'Hono',
          content: {
            'application/json': {
              schema: {
                name: 'root',
                type: 'object',
                properties: {
                  message: {
                    name: 'message',
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
    })
    const expected = `export const postPostsRoute=createRoute({method:'post',path:'/posts',tags:["Hono"],operationId:'updatePost',responses:{200:{description:"Hono",content:{'application/json':{schema:z.object({message:z.string().openapi({"name":"message","example":"Hono"})}).openapi({"name":"root","required":["message"]})}}}}})`
    expect(result).toBe(expected)
  })

  it.concurrent('creates route with as const when readonly is true', () => {
    const result = createRoute(
      '/health',
      'get',
      {
        operationId: 'getHealth',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { status: { type: 'string' } }, required: ['status'] },
              },
            },
          },
        },
      },
      true,
    )
    expect(result).toBe(
      `export const getHealthRoute=createRoute({method:'get',path:'/health',operationId:'getHealth',responses:{200:{description:"OK",content:{'application/json':{schema:z.object({status:z.string()}).readonly().openapi({"required":["status"]})}}}}} as const)`,
    )
  })

  it.concurrent('creates route without as const when readonly is false', () => {
    const result = createRoute(
      '/health',
      'get',
      {
        operationId: 'getHealth',
        responses: { '200': { description: 'OK' } },
      },
      false,
    )
    expect(result).toBe(
      `export const getHealthRoute=createRoute({method:'get',path:'/health',operationId:'getHealth',responses:{200:{description:"OK"}}})`,
    )
  })

  it.concurrent('creates route with summary and description', () => {
    const result = createRoute('/users', 'get', {
      operationId: 'getUsers',
      summary: 'List users',
      description: 'Returns all users',
      responses: { '200': { description: 'OK' } },
    })
    expect(result).toBe(
      `export const getUsersRoute=createRoute({method:'get',path:'/users',summary:"List users",description:"Returns all users",operationId:'getUsers',responses:{200:{description:"OK"}}})`,
    )
  })

  it.concurrent('creates route with deprecated and security', () => {
    const result = createRoute('/old', 'get', {
      operationId: 'getOld',
      deprecated: true,
      security: [{ bearerAuth: [] }] as any,
      responses: { '200': { description: 'OK' } },
    })
    expect(result).toBe(
      `export const getOldRoute=createRoute({method:'get',path:'/old',operationId:'getOld',responses:{200:{description:"OK"}},deprecated:true,security:[{"bearerAuth":[]}]})`,
    )
  })

  it.concurrent('creates route with request parameters', () => {
    const result = createRoute('/users/{id}', 'get', {
      operationId: 'getUser',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
      responses: { '200': { description: 'OK' } },
    })
    expect(result).toBe(
      `export const getUsersIdRoute=createRoute({method:'get',path:'/users/{id}',operationId:'getUser',request:{params:z.object({id:z.int().openapi({param:{"name":"id","in":"path","required":true,"schema":{"type":"integer"}}})})},responses:{200:{description:"OK"}}})`,
    )
  })

  it.concurrent('creates route with request body', () => {
    const result = createRoute('/users', 'post', {
      operationId: 'createUser',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
          },
        },
      },
      responses: { '201': { description: 'Created' } },
    })
    expect(result).toBe(
      `export const postUsersRoute=createRoute({method:'post',path:'/users',operationId:'createUser',request:{body:{content:{'application/json':{schema:z.object({name:z.string()}).openapi({"required":["name"]})}},required:true}},responses:{201:{description:"Created"}}})`,
    )
  })

  it.concurrent('creates route with readonly propagating to inline schemas', () => {
    const result = createRoute(
      '/users',
      'post',
      {
        operationId: 'createUser',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { id: { type: 'integer' } }, required: ['id'] },
              },
            },
          },
        },
      },
      true,
    )
    expect(result).toBe(
      `export const postUsersRoute=createRoute({method:'post',path:'/users',operationId:'createUser',request:{body:{content:{'application/json':{schema:z.object({name:z.string()}).readonly().openapi({"required":["name"]})}},required:true}},responses:{201:{description:"Created",content:{'application/json':{schema:z.object({id:z.int()}).readonly().openapi({"required":["id"]})}}}}} as const)`,
    )
  })

  it.concurrent('creates route with externalDocs', () => {
    const result = createRoute('/docs', 'get', {
      operationId: 'getDocs',
      externalDocs: { url: 'https://example.com' },
      responses: { '200': { description: 'OK' } },
    })
    expect(result).toBe(
      `export const getDocsRoute=createRoute({method:'get',path:'/docs',externalDocs:{"url":"https://example.com"},operationId:'getDocs',responses:{200:{description:"OK"}}})`,
    )
  })

  it.concurrent('creates route with servers', () => {
    const result = createRoute('/api', 'get', {
      operationId: 'getApi',
      servers: [{ url: 'https://api.example.com' }],
      responses: { '200': { description: 'OK' } },
    })
    expect(result).toBe(
      `export const getApiRoute=createRoute({method:'get',path:'/api',operationId:'getApi',responses:{200:{description:"OK"}},servers:[{"url":"https://api.example.com"}]})`,
    )
  })

  it.concurrent('creates minimal route without operationId', () => {
    const result = createRoute('/ping', 'get', {
      responses: { '200': { description: 'Pong' } },
    })
    expect(result).toBe(
      `export const getPingRoute=createRoute({method:'get',path:'/ping',responses:{200:{description:"Pong"}}})`,
    )
  })

  it.concurrent('creates route without responses', () => {
    const result = createRoute('/events', 'post', {
      operationId: 'sendEvent',
    })
    expect(result).toBe(
      `export const postEventsRoute=createRoute({method:'post',path:'/events',operationId:'sendEvent'})`,
    )
  })
})
