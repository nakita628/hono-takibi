import { describe, expect, it } from 'vitest'
import { pickTypes } from './pick-types.js'

// Test run
// pnpm vitest run ./src/helper/pick-types.test.ts
describe('pickTypes', () => {
  it('returns empty array for undefined', () => {
    // biome-ignore lint: test
    expect(pickTypes(undefined as any)).toStrictEqual([])
  })

  it('wraps single value into array', () => {
    expect(pickTypes('string')).toStrictEqual(['string'])
  })

  it('passes through non-empty array', () => {
    expect(pickTypes(['integer', 'null'])).toStrictEqual(['integer', 'null'])
  })
})
