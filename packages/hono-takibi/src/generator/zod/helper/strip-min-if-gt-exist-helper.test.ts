import { describe, it, expect } from 'vitest'
import { stripMinIfgTExistHelper } from './strip-min-if-gt-exist-helper'

// Test run
// pnpm vitest run ./src/generator/zod/helper/strip-min-if-gt-exist-helper.test.ts

describe('stripMinIfgTExistHelper', () => {
  it.concurrent(
    `stripMinIfgTExistHelper('z.number().min(1).gt(1)', 1) -> 'z.number().gt(1)'`,
    () => {
      const result = stripMinIfgTExistHelper('z.number().min(1).gt(1)', 1)
      const expected = 'z.number().gt(1)'
      expect(result).toBe(expected)
    },
  )
})
