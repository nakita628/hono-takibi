import { describe, expect, it } from 'vitest'
import { isUniqueContentSchema } from './is-unique-content-schema'
import type { Content } from '../../types'

const isUniqueContentSchemaTestCases: {
  contentTypes: string[]
  content: Content
  expected: boolean
}[] = [
  // true
  {
    contentTypes: ['application/json', 'application/xml', 'application/x-www-form-urlencoded'],
    content: {
      'application/json': { schema: { $ref: '#/components/schemas/Pet' } },
      'application/xml': { schema: { $ref: '#/components/schemas/Pet' } },
      'application/x-www-form-urlencoded': { schema: { $ref: '#/components/schemas/Pet' } },
    },
    expected: true,
  },

  // false
  {
    contentTypes: ['application/json', 'application/xml'],
    content: {
      'application/json': { schema: { $ref: '#/components/schemas/User' } },
      'application/xml': { schema: { $ref: '#/components/schemas/Admin' } },
    },
    expected: false,
  },
]

describe('isUniqueContentSchema', () => {
  it.concurrent.each(isUniqueContentSchemaTestCases)(
    'isUniqueContentSchema($contentTypes, $content) -> $expected',
    async ({ contentTypes, content, expected }) => {
      const result = isUniqueContentSchema(contentTypes, content)
      expect(result).toBe(expected)
    },
  )
})
