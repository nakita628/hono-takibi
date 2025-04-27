import { describe, it, expect } from 'vitest'
import type { Schema } from '../../../../../types'
import { generateNotCode } from './generate-not-code'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/not/generate-not-code.test.ts

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
