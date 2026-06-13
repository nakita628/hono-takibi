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

  it.concurrent('resolves a parameter $ref against components.parameters', () => {
    const openapi: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'test', version: '1.0.0' },
      components: {
        parameters: {
          PageParam: { name: 'page', in: 'query', required: false, schema: { type: 'integer' } },
        },
      },
      paths: {
        '/posts': {
          get: {
            operationId: 'getPosts',
            parameters: [{ $ref: '#/components/parameters/PageParam' }],
            responses: { 200: { description: 'ok' } },
          },
        },
      },
    }
    expect(defineEntries(openapi)).toStrictEqual([
      {
        name: 'getPosts',
        path: '/posts',
        code: `export const getPostsRoute=defineOpenAPIRoute({route:createRoute({method:"get",path:"/posts",operationId:"getPosts",request:{query:z.object({page:PageParamParamsSchema})},responses:{200:{description:"ok"}}}),handler:async(c)=>{},addRoute:true})`,
      },
    ])
  })

  it.concurrent('drops a parameter $ref that has no matching component', () => {
    const openapi: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'test', version: '1.0.0' },
      paths: {
        '/posts': {
          get: {
            operationId: 'getPosts',
            parameters: [{ $ref: '#/components/parameters/Missing' }],
            responses: { 200: { description: 'ok' } },
          },
        },
      },
    }
    expect(defineEntries(openapi)).toStrictEqual([
      {
        name: 'getPosts',
        path: '/posts',
        code: `export const getPostsRoute=defineOpenAPIRoute({route:createRoute({method:"get",path:"/posts",operationId:"getPosts",responses:{200:{description:"ok"}}}),handler:async(c)=>{},addRoute:true})`,
      },
    ])
  })

  it.concurrent('merges path-level parameters with operation parameters', () => {
    const openapi: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'test', version: '1.0.0' },
      paths: {
        '/users/{id}': {
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          get: {
            operationId: 'getUser',
            parameters: [
              { name: 'verbose', in: 'query', required: false, schema: { type: 'boolean' } },
            ],
            responses: { 200: { description: 'ok' } },
          },
        },
      },
    }
    expect(defineEntries(openapi)).toStrictEqual([
      {
        name: 'getUsersId',
        path: '/users/{id}',
        code: `export const getUsersIdRoute=defineOpenAPIRoute({route:createRoute({method:"get",path:"/users/{id}",operationId:"getUser",request:{params:z.object({id:z.string().openapi({param:{"name":"id","in":"path","required":true,"schema":{"type":"string"}}})}),query:z.object({verbose:z.stringbool().exactOptional().openapi({param:{"name":"verbose","in":"query","required":false,"schema":{"type":"boolean"}}})})},responses:{200:{description:"ok"}}}),handler:async(c)=>{},addRoute:true})`,
      },
    ])
  })

  it.concurrent('resolves a pathItem $ref and merges sibling properties over it', () => {
    const openapi: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'test', version: '1.0.0' },
      components: {
        pathItems: {
          Health: {
            get: { operationId: 'getHealth', responses: { 200: { description: 'ok' } } },
          },
        },
      },
      paths: {
        '/health': {
          $ref: '#/components/pathItems/Health',
          parameters: [{ name: 'trace', in: 'query', required: false, schema: { type: 'string' } }],
        },
      },
    }
    expect(defineEntries(openapi)).toStrictEqual([
      {
        name: 'getHealth',
        path: '/health',
        code: `export const getHealthRoute=defineOpenAPIRoute({route:createRoute({method:"get",path:"/health",operationId:"getHealth",request:{query:z.object({trace:z.string().exactOptional().openapi({param:{"name":"trace","in":"query","required":false,"schema":{"type":"string"}}})})},responses:{200:{description:"ok"}}}),handler:async(c)=>{},addRoute:true})`,
      },
    ])
  })

  it.concurrent('keeps the inline pathItem when its $ref has no matching component', () => {
    const openapi: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'test', version: '1.0.0' },
      paths: {
        '/health': {
          $ref: '#/components/pathItems/Missing',
          get: { operationId: 'getHealth', responses: { 200: { description: 'ok' } } },
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

  it.concurrent('keeps the inline pathItem when its $ref does not point at components.pathItems', () => {
    const openapi: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'test', version: '1.0.0' },
      paths: {
        '/health': {
          $ref: '#/components/parameters/Health',
          get: { operationId: 'getHealth', responses: { 200: { description: 'ok' } } },
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

  it.concurrent('drops a parameter $ref that does not point at components.parameters', () => {
    const openapi: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'test', version: '1.0.0' },
      paths: {
        '/posts': {
          get: {
            operationId: 'getPosts',
            parameters: [{ $ref: '#/components/schemas/Sort' }],
            responses: { 200: { description: 'ok' } },
          },
        },
      },
    }
    expect(defineEntries(openapi)).toStrictEqual([
      {
        name: 'getPosts',
        path: '/posts',
        code: `export const getPostsRoute=defineOpenAPIRoute({route:createRoute({method:"get",path:"/posts",operationId:"getPosts",responses:{200:{description:"ok"}}}),handler:async(c)=>{},addRoute:true})`,
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
