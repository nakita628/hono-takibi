import { describe, expect, it } from 'vitest'
import { _const } from './const.js'

// Test run
// pnpm vitest run ./src/helper/const.test.ts

describe('_const', () => {
  it.concurrent('z.literal("test")', () => {
    expect(_const({ const: 'fixed' })).toBe('z.literal("fixed")')
  })
  it.concurrent('z.literal("test").nullable()', () => {
    expect(_const({ const: 'fixed', nullable: true })).toBe('z.literal("fixed").nullable()')
  })
  it.concurrent('z.literal("test").nullable()', () => {
    expect(_const({ type: ['null'], const: 'fixed' })).toBe('z.literal("fixed").nullable()')
  })
})
