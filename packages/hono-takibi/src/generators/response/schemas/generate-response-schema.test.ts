import { describe, expect, it } from 'vitest'
import { generateResponseSchema } from './generate-response-schema'
import type { Content } from '../../../types'

const generateResponseSchemaTestCases: { content: Content; expected: string }[] = [
  {
    content: {
      'application/json': {
        schema: { type: 'object', properties: { message: { type: 'string', example: 'Hono🔥' } } },
      },
    },
    expected: `200:{description:'Hono🔥',content:{'application/json':{schema:z.object({message:z.string().openapi({example:"Hono🔥"}).optional()})}},},`,
  },
]

describe('generateResponseSchema', () => {
  it.concurrent.each(generateResponseSchemaTestCases)(
    'generateResponseSchema(%content) -> %expected',
    ({ content, expected }) => {
      const result = generateResponseSchema({ '200': { description: 'Hono🔥', content } })
      expect(result).toBe(expected)
    },
  )
})
