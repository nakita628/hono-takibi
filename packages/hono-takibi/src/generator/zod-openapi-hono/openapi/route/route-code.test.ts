import { describe, it, expect } from 'vitest'
import { routeCode } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/route-code.test.ts

describe('routeCode', () => {
  it.concurrent('routeCode Test', () => {
    const result = routeCode({
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
      },
    })
    const expected = `export const getHonoRoute=createRoute({tags:["Hono"],method:'get',path:'/hono',summary:'Hono',description:'Hono',responses:{200:{description:'OK',content:{'application/json':{schema:z.object({message:z.string().openapi({example:"Hono🔥"})})}},},}})`
    expect(result).toBe(expected)
  })
})
