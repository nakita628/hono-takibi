import { describe, expect, it } from 'vitest'
import { isUniqueContentSchema } from './is-unique-content-schema'
import { ResponseDefinition } from '../../types'

const isUniqueContentSchemaTestCases: {
  contentTypes: string[]
  response: ResponseDefinition
  expected: boolean
}[] = [
  // true
  {
    contentTypes: ['application/json', 'application/xml', 'application/x-www-form-urlencoded'],
    response: {
      description: 'Update an existent pet in the store',
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/Pet' } },
        'application/xml': { schema: { $ref: '#/components/schemas/Pet' } },
        'application/x-www-form-urlencoded': { schema: { $ref: '#/components/schemas/Pet' } },
      },
    },
    expected: true,
  },

  // false
  {
    contentTypes: ['application/json', 'application/xml'],
    response: {
      description: 'Different references',
      content: {
        'application/json': { schema: { $ref: '#/components/schemas/User' } },
        'application/xml': { schema: { $ref: '#/components/schemas/Admin' } },
      },
    },
    expected: false,
  },
]

describe('isUniqueContentSchema', () => {
  it.concurrent.each(isUniqueContentSchemaTestCases)(
    'isUniqueContentSchema($contentTypes, $response) -> $expected',
    async ({ contentTypes, response, expected }) => {
      const result = isUniqueContentSchema(contentTypes, response)
      expect(result).toBe(expected)
    },
  )
})
