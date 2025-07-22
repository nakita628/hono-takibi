import { describe, expect, it } from 'vitest'
import { formatRequestObject } from './format-request-object'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/request/object/format-request-object.test.ts

describe('formatRequestObject', () => {
  it.concurrent('formatRequestObject Test', () => {
    const result = formatRequestObject(['params:z.object({id:z.string().uuid()})'])
    const expected = 'request:{params:z.object({id:z.string().uuid()})},'
    expect(result).toBe(expected)
  })
})
