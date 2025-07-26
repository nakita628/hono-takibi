import { describe, expect, it } from 'vitest'
import { isArrayWithSchemaReference } from '.'

// Test run
// pnpm vitest run ./src/validator/is-array-with-schema-reference.test.ts

describe('isArrayWithSchemaReference Test', () => {
  it.concurrent('isArrayWithSchemaReference -> true', () => {
    const result = isArrayWithSchemaReference({
      type: 'array',
      items: { $ref: '#/components/schemas/Test' },
    })
    const expected = true
    expect(result).toBe(expected)
  })
  it.concurrent('isArrayWithSchemaReference -> false', () => {
    const result = isArrayWithSchemaReference({ type: 'string', format: 'binary' })
    const expected = false
    expect(result).toBe(expected)
  })
  it.concurrent('isArrayWithSchemaReference -> false', () => {
    const result = isArrayWithSchemaReference({
      type: 'array',
      items: undefined,
    })
    const expected = false
    expect(result).toBe(expected)
  })
})
