import { describe, it, expect } from 'vitest'
import { stripMinIfgTExist } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/helper/strip-min-if-gt-exist-helper.test.ts

describe('stripMinIfgTExist', () => {
  it.concurrent(`stripMinIfgTExist('z.number().min(1).gt(1)', 1) -> 'z.number().gt(1)'`, () => {
    const result = stripMinIfgTExist('z.number().min(1).gt(1)', 1)
    const expected = 'z.number().gt(1)'
    expect(result).toBe(expected)
  })
})
