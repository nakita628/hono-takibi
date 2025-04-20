import { describe, test, expect } from 'vitest'
import { isOperation } from './is-operation'

// Test run
// pnpm vitest run ./src/core/validator/is-operation.test.ts

describe('isOperation Test', () => {
  test.concurrent('isOperation -> true', () => {
    const result = isOperation({
      responses: {},
    })
    const expected = true
    expect(result).toBe(expected)
  })
  test.concurrent('isOperation -> false', () => {
    // biome-ignore lint:
    const result = isOperation('test' as any)
    const expected = false
    expect(result).toBe(expected)
  })
})
