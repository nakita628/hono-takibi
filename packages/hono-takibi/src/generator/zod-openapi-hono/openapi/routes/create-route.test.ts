import { describe, expect, it } from 'vitest'
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
})
