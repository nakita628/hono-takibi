import { describe, it, expect } from 'vitest'
import { maybeApplyNullability } from './maybe-apply-nullability.js'

// Test run
// pnpm vitest run ./src/core/helper/maybe-apply-nullability.test.ts

describe('maybeApplyNullability', () => {
  it('adds .nullable() when nullable flag is true', () => {
    expect(maybeApplyNullability('z.string()', { type: 'string', nullable: true })).toBe(
      'z.string().nullable()',
    )
  })

  it('adds .nullable() when "null" appears in type array', () => {
    expect(maybeApplyNullability('z.int()', { type: ['integer', 'null'] })).toBe(
      'z.int().nullable()',
    )
  })

  it('does not modify when not nullable', () => {
    expect(maybeApplyNullability('z.number()', { type: 'number' })).toBe('z.number()')
  })
})
