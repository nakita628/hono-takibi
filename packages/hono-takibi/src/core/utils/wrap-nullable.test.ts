import { describe, it, expect } from 'vitest'
import { wrapNullable } from './wrap-nullable'

// Test run
// pnpm vitest run ./src/core/utils/wrap-nullable.test.ts

describe('wrapNullable', () => {
  it('adds .nullable() when nullable flag is true', () => {
    expect(wrapNullable('z.string()', { type: 'string', nullable: true })).toBe(
      'z.string().nullable()',
    )
  })

  it('adds .nullable() when "null" appears in type array', () => {
    expect(wrapNullable('z.int()', { type: ['integer', 'null'] })).toBe('z.int().nullable()')
  })

  it('does not modify when not nullable', () => {
    expect(wrapNullable('z.number()', { type: 'number' })).toBe('z.number()')
  })
})
