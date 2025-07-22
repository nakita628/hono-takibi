import { describe, expect, it } from 'vitest'
import { not } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/not/index.test.ts

describe('not', () => {
  it.concurrent(`not({ not: { type: 'number' } }) -> 'z.unknown()'`, () => {
    const result = not({ not: { type: 'number' } })
    const expected = 'z.unknown()'
    expect(result).toBe(expected)
  })
})
