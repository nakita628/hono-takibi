import { describe, expect, it } from 'vitest'
import { arrayReferenceSchema } from './array-reference-schema'

// Test run
// pnpm vitest run ./src/generator/zod/reference/array-reference-schema.test.ts

describe('arrayReferenceSchema', () => {
  it.concurrent('arrayReferenceSchema -> z.array(TestSchema)', () => {
    const result = arrayReferenceSchema({
      type: 'array',
      items: { $ref: '#/components/schemas/Test' },
    })

    const expected = 'z.array(TestSchema)'
    expect(result).toBe(expected)
  })

  it.concurrent('arrayReferenceSchema -> z.array(z.any())', () => {
    const result = arrayReferenceSchema({
      type: 'array',
    })

    const expected = 'z.array(z.any())'
    expect(result).toBe(expected)
  })
})
