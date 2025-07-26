import { describe, expect, it } from 'vitest'
import { isAllOptional } from '.'

// Test run
// pnpm vitest run ./src/validator/is-all-optional.test.ts

describe('isAllOptional Test', () => {
  it.concurrent(`isAllOptional(['id:z.string().optional()']) -> true`, () => {
    const result = isAllOptional(['id:z.string().optional()'])
    const expected = true
    expect(result).toBe(expected)
  })
  it.concurrent(`isAllOptional(['id:z.string()']) -> false`, () => {
    const result = isAllOptional(['id:z.string()'])
    const expected = false
    expect(result).toBe(expected)
  })
})
