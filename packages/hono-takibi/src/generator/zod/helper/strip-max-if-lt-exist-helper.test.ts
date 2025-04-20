import { describe, expect, test } from 'vitest'
import { stripMaxIfLtExistHelper } from './strip-max-if-lt-exist-helper'

// Test run
// pnpm vitest run ./src/generator/zod/helper/strip-max-if-lt-exist-helper.test.ts

describe('stripMaxIfLtExistHelper Test', () => {
  test.concurrent(
    `stripMaxIfLtExistHelper('z.number().max(1).lt(1)', 1) -> 'z.number().lt(1)'`,
    () => {
      const result = stripMaxIfLtExistHelper('z.number().max(1).lt(1)', 1)
      const expected = 'z.number().lt(1)'
      expect(result).toBe(expected)
    },
  )
})
