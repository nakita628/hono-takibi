import { describe, it, expect } from 'vitest'
import type { Schema } from '../../../../../type'
import { generateNotCode } from './generate-not-code'

const generateNotCodeTestCases: {
  schema: Schema
  expected: string
}[] = [
  {
    schema: { not: { type: 'number' } },
    expected: 'z.unknown()',
  },
]

describe('generateNotCode', () => {
  it.each(generateNotCodeTestCases)(
    'generateNotCode($args.schema) -> $args.expected',
    async ({ schema, expected }) => {
      const result = generateNotCode(schema)
      expect(result).toBe(expected)
    },
  )
})
