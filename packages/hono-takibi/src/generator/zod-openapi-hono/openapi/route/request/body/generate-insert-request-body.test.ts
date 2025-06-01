import { describe, it, expect } from 'vitest'
import { generateInsertRequestBody } from './generate-insert-request-body'

const generateInsertRequestBodyTestCases = [
  {
    requestParams: 'request:{params:z.object({id:z.string().uuid()})},',
    requestBodyCode:
      "body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)}),},},},",
    expected:
      "request:{body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)}),},},},params:z.object({id:z.string().uuid()})},",
  },
]

describe('insertRequestBody valid cases', () => {
  it.concurrent.each(generateInsertRequestBodyTestCases)(
    'insertRequestBody($requestParams, $requestBodyCode) -> $expected',
    async ({ requestParams, requestBodyCode, expected }) => {
      const result = generateInsertRequestBody(requestParams, requestBodyCode)
      expect(result).toBe(expected)
    },
  )
})

describe('insertRequestBody edge cases', () => {
  it.concurrent('should throw an error when requestParams is undefined', () => {
    // biome-ignore lint:
    const requestParams = undefined as any
    const requestBodyCode = 'edge case'

    expect(() => generateInsertRequestBody(requestParams, requestBodyCode)).toThrow(
      `Cannot read properties of undefined (reading 'replace')`,
    )
  })
})
