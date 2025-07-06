import { describe, expect, it } from 'vitest'
import { exclusive } from './exclusive'

// Test run
// pnpm vitest run ./src/core/utils/exclusive.test.ts

describe('exclusive', () => {
  it('adds gt when exclusiveMinimum is numeric', () => {
    const result = exclusive('z.number()', { type: 'number', exclusiveMinimum: 1 })
    expect(result).toBe('z.number().gt(1)')
  })

  it('adds lt when exclusiveMaximum is numeric', () => {
    const result = exclusive('z.number()', { type: 'number', exclusiveMaximum: 5 })
    expect(result).toBe('z.number().lt(5)')
  })

  it('adds both gt and lt when both bounds are numeric', () => {
    const result = exclusive('z.number()', {
      type: 'number',
      exclusiveMinimum: 1,
      exclusiveMaximum: 5,
    })
    expect(result).toBe('z.number().gt(1).lt(5)')
  })

  it('no change when exclusive* are non-numeric (3.0 boolean style)', () => {
    const result = exclusive('z.number()', {
      type: 'number',
      exclusiveMinimum: true,
      exclusiveMaximum: false,
    })
    expect(result).toBe('z.number()')
  })

  it('ignores undefined exclusive values', () => {
    const result = exclusive('z.number()', { type: 'number' })
    expect(result).toBe('z.number()')
  })
})
