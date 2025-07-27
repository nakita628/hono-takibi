import { describe, expect, it } from 'vitest'
import { route } from './route'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/route.test.ts

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
    const expected = `export const postPostsRoute=createRoute({tags:["Hono"],method:'post',path:'/posts',operationId:'updatePost',responses:{200:{description:'Hono🔥',content:{'application/json':{schema:z.object({message:z.string().openapi({example:"Hono🔥"})})}},},}})`
    expect(result).toBe(expected)
  })
})
