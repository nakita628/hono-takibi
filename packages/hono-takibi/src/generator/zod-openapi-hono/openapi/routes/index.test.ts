import { describe, expect, it } from 'vitest'
import { routeCode } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/routes/index.test.ts

describe('routeCode', () => {
  it.concurrent('routeCode Test', () => {
    const result = routeCode({
      openapi: '3.0.0',
      info: { title: 'Test', version: '1.0.0' },
      tags: [{ name: 'Hono' }],
      paths: {
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
      },
    })
    const expected = `export const getHonoRoute=createRoute({method:'get',path:'/hono',tags:["Hono"],summary:'"Hono"',description:'"Hono"',responses:{200:{description:'OK',content:{'application/json':{schema:z.object({message:z.string().openapi({"type":"string","example":"Hono🔥"})}).openapi({"type":"object","properties":{"message":{"type":"string","example":"Hono🔥"}},"required":["message"]})}}},},})`
    expect(result).toBe(expected)
  })
})
