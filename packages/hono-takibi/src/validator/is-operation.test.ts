import { describe, expect, it } from 'vitest'
import { isOperation } from '.'

// Test run
// pnpm vitest run ./src/validator/is-operation.test.ts

describe('isOperation Test', () => {
  it.concurrent('isOperation -> true', () => {
    const result = isOperation({
      responses: {},
    })
    const expected = true
    expect(result).toBe(expected)
  })
  it.concurrent('isOperation -> false', () => {
    // biome-ignore lint: test
    const result = isOperation('test' as any)
    const expected = false
    expect(result).toBe(expected)
  })
})
