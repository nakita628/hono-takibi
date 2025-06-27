import { describe, it, expect } from 'vitest'
import { isNullableSchema } from '.'

// Test run
// pnpm vitest run ./src/core/validator/is-nullable-schema.test.ts

describe('isNullableSchema Test', () => {
  it.concurrent('isNullableSchema -> true', () => {
    const result = isNullableSchema({
      nullable: true,
    })
    const expected = true
    expect(result).toBe(expected)
  })
  it.concurrent('isNullableSchema -> false', () => {
    const result = isNullableSchema({
      type: 'object',
      properties: {
        test: {
          type: 'string',
        },
      },
    })
    const expected = false
    expect(result).toBe(expected)
  })
})
