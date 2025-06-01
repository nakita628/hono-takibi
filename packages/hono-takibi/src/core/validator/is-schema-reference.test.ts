import { describe, it, expect } from 'vitest'
import { isSchemaReference } from './is-schema-reference'

// Test run
// pnpm vitest run ./src/core/validator/is-schema-reference.test.ts

describe('isSchemaReference Test', () => {
  it.concurrent('isSchemaReference -> true', () => {
    const result = isSchemaReference({ $ref: '#/components/schemas/Test' })
    const expected = true
    expect(result).toBe(expected)
  })
  it.concurrent('isSchemaReference -> false', () => {
    const result = isSchemaReference({ $ref: undefined })
    const expected = false
    expect(result).toBe(expected)
  })
})
