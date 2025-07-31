import { describe, expect, it } from 'vitest'
import { boolean } from './boolean'

// Test run
// pnpm vitest run ./src/generator/zod/z/boolean.test.ts

describe('boolean', () => {
  it.concurrent('z.boolean()', () => {
    expect(boolean({})).toBe('z.boolean()')
  })
  it.concurrent('z.boolean().nullable()', () => {
    expect(boolean({ nullable: true })).toBe('z.boolean().nullable()')
  })
  it.concurrent('z.boolean().nullable()', () => {
    expect(boolean({ type: ['null'] })).toBe('z.boolean().nullable()')
  })
})
