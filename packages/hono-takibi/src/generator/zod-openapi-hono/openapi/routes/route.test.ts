import { describe, expect, it } from 'vitest'
import { route } from './route'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/routes/route.test.ts

describe('route', () => {
  it.concurrent('route Test', () => {
    const result = route('/posts', 'post', {
      operationId: 'updatePost',
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
    })
    const expected = `export const postPostsRoute=createRoute({method:'post',path:'/posts',tags:["Hono"],operationId:'updatePost',responses:{200:{description:'Hono🔥',content:{'application/json':{schema:z.object({message:z.string().optional().openapi({"name":"message","type":"string","example":"Hono🔥"})}).optional().openapi({"name":"root","type":"object","properties":{"message":{"name":"message","type":"string","example":"Hono🔥"}}})}}},},})`
    expect(result).toBe(expected)
  })
})
