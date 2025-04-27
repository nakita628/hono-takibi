import { describe, test, expect } from 'vitest'
import { isAllOptional } from './is-all-optional'

// Test run
// pnpm vitest run ./src/core/validator/is-all-optional.test.ts

describe('isAllOptional Test', () => {
  test.concurrent(`isAllOptional(['id:z.string().optional()']) -> true`, () => {
    const result = isAllOptional(['id:z.string().optional()'])
    const expected = true
    expect(result).toBe(expected)
  })
  test.concurrent(`isAllOptional(['id:z.string()']) -> false`, () => {
    const result = isAllOptional(['id:z.string()'])
    const expected = false
    expect(result).toBe(expected)
  })
})
