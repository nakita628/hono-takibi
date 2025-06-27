import { describe, it, expect } from 'vitest'
import { oneOf } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/oneof/one-of.test.ts

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
