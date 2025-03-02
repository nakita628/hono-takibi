import { describe, expect, it } from 'vitest'
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

describe('insertRequestBody', () => {
  it.concurrent.each(generateInsertRequestBodyTestCases)(
    'insertRequestBody($requestParams, $requestBodyCode) -> $expected',
    async ({ requestParams, requestBodyCode, expected }) => {
      const result = generateInsertRequestBody(requestParams, requestBodyCode)
      expect(result).toBe(expected)
    },
  )
})
