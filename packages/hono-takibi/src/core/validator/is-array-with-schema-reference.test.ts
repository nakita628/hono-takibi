import { describe, test, expect } from 'vitest'
import { isArrayWithSchemaReference } from './is-array-with-schema-reference'

// Test run
// pnpm vitest run ./src/core/validator/is-array-with-schema-reference.test.ts

describe('isArrayWithSchemaReference Test', () => {
  test.concurrent('isArrayWithSchemaReference -> true', () => {
    const result = isArrayWithSchemaReference({
      type: 'array',
      items: { $ref: '#/components/schemas/Test' },
    })
    const expected = true
    expect(result).toBe(expected)
  })
  test.concurrent('isArrayWithSchemaReference -> false', () => {
    const result = isArrayWithSchemaReference({ type: 'string', format: 'binary' })
    const expected = false
    expect(result).toBe(expected)
  })
  test.concurrent('isArrayWithSchemaReference -> false', () => {
    const result = isArrayWithSchemaReference({
      type: 'array',
      items: undefined,
    })
    const expected = false
    expect(result).toBe(expected)
  })
})
