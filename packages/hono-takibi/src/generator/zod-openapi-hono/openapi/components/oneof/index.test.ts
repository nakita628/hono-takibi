import { describe, expect, it } from 'vitest'
import { oneOf } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/components/oneof/index.test.ts
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
