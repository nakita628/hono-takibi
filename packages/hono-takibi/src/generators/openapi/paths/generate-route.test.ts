import { describe, expect, it } from 'vitest'
import { generateRoute } from './generate-route'
import { Operation } from '../../../types'

const generateRouteTestCases: {
  path: string
  method: string
  operation: Operation
  expected: string
}[] = [
  {
    path: '/',
    method: 'get',
    operation: {
      operationId: 'getRoot',
      tags: ['Hono'],
      description: undefined,
      parameters: undefined,
      requestBody: undefined,
      responses: {
        '200': {
          description: 'Hono🔥',
          content: {
            'application/json': {
              schema: {
                name: 'root',
                type: 'object',
                properties: {
                  message: {
                    name: 'message',
                    type: 'string',
                    example: 'Hono🔥',
                  },
                },
                required: ['message'],
              },
            },
          },
        },
      },
    },
    expected: `export const getRoute=createRoute({tags:["Hono"],method:'get',path:'/',responses:{200:{description:'Hono🔥',content:{'application/json':{schema:z.object({message: z.string()}),},},},}})`,
  },
  {
    path: '/posts',
    method: 'post',
    operation: {
      operationId: 'createPost',
      tags: ['Post'],
      description: 'create a new post',
      parameters: undefined,
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              name: 'post',
              type: 'object',
              properties: {
                post: {
                  name: 'post',
                  type: 'string',
                  minLength: 1,
                  maxLength: 140,
                },
              },
              required: ['post'],
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Created',
          content: {
            // contentを追加
            'application/json': {
              schema: {
                name: 'response',
                type: 'object',
                properties: {},
                required: [],
              },
            },
          },
        },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': {
              schema: {
                name: 'error',
                type: 'object',
                properties: {
                  message: {
                    name: 'message',
                    type: 'string',
                    example: 'Bad Request',
                  },
                },
                required: ['message'],
              },
            },
          },
        },
        '500': {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: {
                name: 'error',
                type: 'object',
                properties: {
                  message: {
                    name: 'message',
                    type: 'string',
                    example: 'Internal Server Error',
                  },
                },
                required: ['message'],
              },
            },
          },
        },
      },
    },
    expected: `export const postPostsRoute=createRoute({tags:["Post"],method:'post',path:'/posts',description:'create a new post',request:{body:{required:true,content:{'application/json':{schema:z.object({post: z.string().min(1).max(140)}),},},},},responses:{201:{description:'Created',content:{'application/json':{schema:z.object({}),},},},400:{description:'Bad Request',content:{'application/json':{schema:z.object({message: z.string()}),},},},500:{description:'Internal Server Error',content:{'application/json':{schema:z.object({message: z.string()}),},},},}})`,
  },
]

describe('generateRoute', () => {
  it.concurrent.each(generateRouteTestCases)(
    'generateRoute($path, $method, $operation) -> $expected',
    async ({ path, method, operation, expected }) => {
      const result = generateRoute(path, method, operation)
      expect(result).toBe(expected)
    },
  )
})
