import { describe, expect, test } from 'vitest'
import { isUniqueContentSchema } from './is-unique-content-schema'

// Test run
// pnpm vitest run ./src/core/validator/is-unique-content-schema.test.ts

describe('isUniqueContentSchema Test', () => {
  test.concurrent('isUniqueContentSchema -> true', () => {
    const result = isUniqueContentSchema(['application/json'], {
      'application/json': { schema: { $ref: '#/components/schemas/Test' } },
    })
    const expected = true
    expect(result).toBe(expected)
  })
  test.concurrent('isUniqueContentSchema -> false', () => {
    const result = isUniqueContentSchema(['application/json', 'application/xml'], {
      'application/json': { schema: { $ref: '#/components/schemas/Test' } },
      'application/xml': { schema: { $ref: '#/components/schemas/Example' } },
    })
    const expected = false
    expect(result).toBe(expected)
  })
})
