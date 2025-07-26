import { describe, expect, it } from 'vitest'
import { not } from './not.js'

// Test run
// pnpm vitest run ./src/helper/not.test.ts

describe('not', () => {
  it.concurrent(`not({ not: { type: 'number' } }) -> 'z.unknown()'`, () => {
    const result = not({ not: { type: 'number' } })
    const expected = 'z.unknown()'
    expect(result).toBe(expected)
  })
})
