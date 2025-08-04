import { describe, expect, it } from 'vitest'
import { _const } from './const.js'

// Test run
// pnpm vitest run ./src/helper/const.test.ts

describe('_const', () => {
  it.concurrent('z.literal("test")', () => {
    expect(_const({ const: 'fixed' })).toBe('z.literal("fixed")')
  })
})
