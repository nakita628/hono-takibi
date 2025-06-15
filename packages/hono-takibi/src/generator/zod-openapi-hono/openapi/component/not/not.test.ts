import { describe, it, expect } from 'vitest'
import type { Schema } from '../../../../../openapi'
import { not } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/not/not.test.ts

const notTestCases: {
  schema: Schema
  expected: string
}[] = [
  {
    schema: { not: { type: 'number' } },
    expected: 'z.unknown()',
  },
]

describe('not', () => {
  it.each(notTestCases)('not($args.schema) -> $args.expected', async ({ schema, expected }) => {
    const result = not(schema)
    expect(result).toBe(expected)
  })
})
