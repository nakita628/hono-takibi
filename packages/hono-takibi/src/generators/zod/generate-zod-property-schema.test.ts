import { describe, expect, it } from 'vitest'

import { generatePropertySchema } from './generate-zod-property-schema'
import { Schema } from '../../types'

const generatePropertySchemaTestCases: { schema: Schema; expected: string }[] = [
  {
    schema: {
      $ref: '#/components/schemas/User',
    },
    expected: 'User',
  },
  {
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Post',
      },
    },
    expected: 'z.array(Post)',
  },
  {
    schema: {
      type: 'string',
    },
    expected: 'z.string()',
  },
  {
    schema: {
      type: 'number',
    },
    expected: 'z.number()',
  },
  {
    schema: {
      $ref: '',
    },
    expected: 'z.any()',
  },
  {
    schema: {
      type: 'array',
      items: {
        $ref: '',
      },
    },
    expected: 'z.array(z.any())',
  },
  {
    schema: {},
    expected: 'z.any()',
  },
]

describe('generatePropertySchema', () => {
  it.concurrent.each(generatePropertySchemaTestCases)(
    `generatePropertySchema($schema) -> $expected`,
    ({ schema, expected }) => {
      const result = generatePropertySchema(schema)
      expect(result).toBe(expected)
    },
  )
})
