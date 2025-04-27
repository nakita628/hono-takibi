import { describe, expect, test, it } from 'vitest'
import { stripMinMaxExistHelper } from './strip-min-max-exist-helper'

// Test run
// pnpm vitest run ./src/generator/zod/helper/strip-min-max-exist-helper.test.ts

describe('stripMinMaxExistHelper Test', () => {
  test.concurrent(
    `stripMinMaxExistHelper('z.string().min(1).max(1)', 1, 1) -> 'z.string()'`,
    () => {
      const result = stripMinMaxExistHelper('z.string().min(1).max(1)', 1, 1)
      const expected = 'z.string()'
      expect(result).toBe(expected)
    },
  )
})
