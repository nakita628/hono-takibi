import { describe, test, expect, it } from 'vitest'
import { isNullableSchema } from './is-nullable-schema'

// Test run
// pnpm vitest run ./src/core/validator/is-nullable-schema.test.ts

describe('isNullableSchema Test', () => {
  test.concurrent('isNullableSchema -> true', () => {
    const result = isNullableSchema({
      nullable: true,
    })
    const expected = true
    expect(result).toBe(expected)
  })
  test.concurrent('isNullableSchema -> false', () => {
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
