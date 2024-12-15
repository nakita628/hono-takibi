import { describe, expect, it } from 'vitest'
import { generateResponseSchema } from './generate-response-schema'
import { Responses } from '../../../types'

const generateResponseSchemaTestCases: {
  responses: Responses
  expected: string
}[] = [
  {
    responses: {
      '200': {
        description: 'Hono🔥',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Hono🔥' },
              },
              required: ['message'],
            },
          },
        },
      },
    },
    expected: `200:{description:'Hono🔥',content:{'application/json':{schema:z.object({message: z.string()}),},},},`,
  },
]

describe('generateResponseSchemas', () => {
  it.concurrent.each(generateResponseSchemaTestCases)(
    'generateResponseSchemas($responses) -> $expected',
    async ({ responses, expected }) => {
      const result = generateResponseSchema(responses)
      expect(result).toBe(expected)
    },
  )
})
