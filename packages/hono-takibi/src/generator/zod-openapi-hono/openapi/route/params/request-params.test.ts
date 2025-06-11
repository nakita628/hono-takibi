import { describe, it, expect } from 'vitest'
import { requestParams } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/params/request-params.test.ts

describe('createRequestParams', () => {
  it.concurrent('requestParams("") -> "request:{},",', () => {
    const result = requestParams('')
    const expected = 'request:{},'
    expect(result).toBe(expected)
  })

  it.concurrent(`requestParams("key:'value',") -> "request:{key:'value',},"`, () => {
    const result = requestParams("key:'value',")
    const expected = "request:{key:'value',},"
    expect(result).toBe(expected)
  })

  it.concurrent(
    `requestParams("key1:'value1',key2:'value2',") -> "request:{key1:'value1',key2:'value2',},"`,
    () => {
      const result = requestParams("key1:'value1',key2:'value2',")
      const expected = "request:{key1:'value1',key2:'value2',},"
      expect(result).toBe(expected)
    },
  )

  it.concurrent(
    `requestParams("key:'value', // comment") -> "request:{key:'value', // comment},"`,
    () => {
      const result = requestParams("key:'value', // comment")
      const expected = "request:{key:'value', // comment},"
      expect(result).toBe(expected)
    },
  )

  it.concurrent(
    `requestParams("specialChars:'!@#$%^&*()',") -> "request:{specialChars:'!@#$%^&*()',},"`,
    () => {
      const result = requestParams("specialChars:'!@#$%^&*()',")
      const expected = "request:{specialChars:'!@#$%^&*()',},"
      expect(result).toBe(expected)
    },
  )
})
