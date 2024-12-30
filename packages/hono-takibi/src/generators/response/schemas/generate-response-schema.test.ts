import { describe, expect, it } from 'vitest'
import { generateResponseSchema } from './generate-response-schema'
import type { Responses } from '../../../types'

describe('generateResponseSchema', () => {
  it.concurrent(
    'generateResponseSchema({ "200": { description: "Hono🔥", content: { "application/json": { schema: { type: "object", properties: { message: { type: "string", example: "Hono🔥" } } } } } } })',
    () => {
      const responses: Responses = {
        '200': {
          description: 'Hono🔥',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { message: { type: 'string', example: 'Hono🔥' } },
              },
            },
          },
        },
      }
      const result = generateResponseSchema(responses)
      const expected = `200:{description:'Hono🔥',content:{'application/json':{schema:z.object({message: z.string().optional().openapi({ example: "Hono🔥" }).optional()}),},},},`
      expect(result).toBe(expected)
    },
  )
})
