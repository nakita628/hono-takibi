import { describe, it, expect } from 'vitest'
import { stripMaxIfLtExist } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/helper/strip-max-if-lt-exist.test.ts

describe('stripMaxIfLtExist', () => {
  it.concurrent(`stripMaxIfLtExist('z.number().max(1).lt(1)', 1) -> 'z.number().lt(1)'`, () => {
    const result = stripMaxIfLtExist('z.number().max(1).lt(1)', 1)
    const expected = 'z.number().lt(1)'
    expect(result).toBe(expected)
  })
})
