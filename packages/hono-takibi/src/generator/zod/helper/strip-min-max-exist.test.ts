import { describe, it, expect } from 'vitest'
import { stripMinMaxExist } from './strip-min-max-exist'

// Test run
// pnpm vitest run ./src/generator/zod/helper/strip-min-max-exist.test.ts

describe('stripMinMaxExist', () => {
  it.concurrent(`stripMinMaxExist('z.string().min(1).max(1)', 1, 1) -> 'z.string()'`, () => {
    const result = stripMinMaxExist('z.string().min(1).max(1)', 1, 1)
    const expected = 'z.string()'
    expect(result).toBe(expected)
  })
})
