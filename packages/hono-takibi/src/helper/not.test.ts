import { describe, expect, it } from 'vitest'
import { not } from './not.js'

// Test run
// pnpm vitest run ./src/helper/not.test.ts

describe('not', () => {
  it.concurrent("z.any().refine((v) => typeof v !== 'string')", () => {
    expect(not({ not: { type: 'string' } })).toBe("z.any().refine((v) => typeof v !== 'string')")
  })
  it.concurrent("z.any().refine((v) => typeof v !== 'number')", () => {
    expect(not({ not: { type: 'number' } })).toBe("z.any().refine((v) => typeof v !== 'number')")
  })
  it.concurrent("z.any().refine((v) => !['a', 'b'].includes(v))", () => {
    expect(not({ not: { enum: ['a', 'b'] } })).toBe("z.any().refine((v) => !['a','b'].includes(v))")
  })
})
