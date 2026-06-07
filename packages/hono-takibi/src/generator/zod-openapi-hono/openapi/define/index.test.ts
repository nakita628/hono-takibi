import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../../../openapi/index.js'
import { defineEntries } from './index.js'

describe('defineEntries', () => {
  it.concurrent('wraps createRoute and a stub handler in defineOpenAPIRoute', () => {
    const openapi: OpenAPI = {
      openapi: '3.0.0',
      info: { title: 'test', version: '1.0.0' },
      paths: {
        '/health': {
          get: {
            operationId: 'getHealth',
            responses: { 200: { description: 'ok' } },
          },
        },
      },
    }
    expect(defineEntries(openapi)).toStrictEqual([
      {
        name: 'getHealth',
        path: '/health',
        code: `export const getHealthRoute=defineOpenAPIRoute({route:createRoute({method:"get",path:"/health",operationId:"getHealth",responses:{200:{description:"ok"}}}),handler:async(c)=>{},addRoute:true})`,
      },
    ])
  })

  it.concurrent('references component schemas by identifier and resolves path params', () => {
    const openapi: OpenAPI = {
      openapi: '3.0.0',
      info: { title: 'test', version: '1.0.0' },
      paths: {
        '/users/{id}': {
          get: {
            operationId: 'getUser',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: {
              200: {
                description: 'ok',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
              },
            },
          },
        },
      },
    }
    expect(defineEntries(openapi)).toStrictEqual([
      {
        name: 'getUsersId',
        path: '/users/{id}',
        code: `export const getUsersIdRoute=defineOpenAPIRoute({route:createRoute({method:"get",path:"/users/{id}",operationId:"getUser",request:{params:z.object({id:z.string().openapi({param:{"name":"id","in":"path","required":true,"schema":{"type":"string"}}})})},responses:{200:{description:"ok",content:{'application/json':{schema:UserSchema}}}}}),handler:async(c)=>{},addRoute:true})`,
      },
    ])
  })
})
