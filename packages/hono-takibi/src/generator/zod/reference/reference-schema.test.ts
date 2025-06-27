import { describe, it, expect } from 'vitest'
import { referenceSchema } from './reference-schema'

// Test run
// pnpm vitest run ./src/generator/zod/reference/reference-schema.test.ts

describe('referenceSchema Test', () => {
  it.concurrent('referenceSchema -> TestSchema', () => {
    const result = referenceSchema({
      $ref: '#/components/schemas/Test',
    })

    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })

  it.concurrent('referenceSchema -> z.any()', () => {
    const result = referenceSchema({
      $ref: '',
    })

    const expected = 'z.any()'
    expect(result).toBe(expected)
  })
})
