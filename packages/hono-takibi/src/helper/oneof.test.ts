import { describe, expect, it } from 'vitest'
import { oneOf } from './oneof.js'

// Test run
// pnpm vitest run ./src/helper/oneof.test.ts

describe('oneOf', () => {
  it.concurrent('oneOf with oneOf', () => {
    const result = oneOf({
      oneOf: [
        {
          type: 'number',
        },
        {
          type: 'string',
        },
      ],
    })

    const expected = 'z.union([z.number(),z.string()])'
    expect(result).toBe(expected)
  })
})
