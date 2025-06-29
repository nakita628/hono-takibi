import { describe, it, expect } from 'vitest'
import { insertRequestBody } from './insert-request-body'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/request/body/insert-request-body.test.ts

describe('insertRequestBody', () => {
  it.concurrent('insertRequestBody Test', () => {
    const result = insertRequestBody(
      'request:{params:z.object({id:z.string().uuid()})},',
      "body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)}),},},},",
    )
    const expected =
      "request:{body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)}),},},},params:z.object({id:z.string().uuid()})},"
    expect(result).toBe(expected)
  })

  it.concurrent('should throw an error when requestParams is undefined', () => {
    // biome-ignore lint:
    const requestParams = undefined as any
    const requestBodyCode = 'edge case'

    expect(() => insertRequestBody(requestParams, requestBodyCode)).toThrow(
      `Cannot read properties of undefined (reading 'replace')`,
    )
  })
})
