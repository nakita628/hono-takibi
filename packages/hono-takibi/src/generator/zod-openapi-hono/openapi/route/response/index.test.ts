import { describe, it, expect } from 'vitest'
import { response } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/response/response.test.ts

describe('generateResponseSchema', () => {
  it.concurrent('generateResponseSchema Hono', () => {
    const result = response({
      '200': {
        description: 'Successful response with a welcome message.',
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
    })

    const expected = `200:{description:'Successful response with a welcome message.',content:{'application/json':{schema:z.object({message:z.string().openapi({example:"Hono🔥"})})}},},`

    expect(result).toBe(expected)
  })
})
