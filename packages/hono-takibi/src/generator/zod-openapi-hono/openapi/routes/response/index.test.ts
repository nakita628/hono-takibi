import { describe, expect, it } from 'vitest'
import { response } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/routes/response/index.test.ts

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

    const expected = `200:{description:'Successful response with a welcome message.',content:{'application/json':{schema:z.object({message:z.string().openapi({example:"Hono🔥"})})}}},`

    expect(result).toBe(expected)
  })

  it.concurrent('generateResponseSchema Hono with examples', () => {
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
                },
              },
              required: ['message'],
            },
            examples: {
              example1: {
                summary: 'Example 1',
                value: 'Hono🔥',
              },
              example2: {
                summary: 'Example 2',
                value: 'HonoX🔥',
              },
              example3: {
                summary: 'Example 3',
                value: 'ZodOpenAPIHono🔥',
              },
            },
          },
        },
      },
    })
    const expected = `200:{description:'Successful response with a welcome message.',content:{'application/json':{schema:z.object({message:z.string()}),examples:{"example1":{summary:"Example 1",value:"Hono🔥"},"example2":{summary:"Example 2",value:"HonoX🔥"},"example3":{summary:"Example 3",value:"ZodOpenAPIHono🔥"}}}}},`
    expect(result).toBe(expected)
  })
})
