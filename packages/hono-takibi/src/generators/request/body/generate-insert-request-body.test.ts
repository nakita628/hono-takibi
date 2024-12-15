import { describe, expect, it } from 'vitest'
import { generateInsertRequestBody } from './generate-insert-request-body'

const generateInsertRequestBodyTestCases = [
  {
    requestParams: "request:{foo:'bar'}",
    requestBodyCode: "key:'value',",
    expected: "request:{key:'value',foo:'bar'}",
  },
  {
    requestParams: 'request:{}',
    requestBodyCode: "key:'value',",
    expected: "request:{key:'value',}",
  },
  {
    requestParams: 'no match here',
    requestBodyCode: "key:'value',",
    expected: 'no match here',
  },
  {
    requestParams: "request:{foo:'bar',baz:'qux'}",
    requestBodyCode: "key:'value',",
    expected: "request:{key:'value',foo:'bar',baz:'qux'}",
  },
  {
    requestParams: 'request:{}',
    requestBodyCode: '',
    expected: 'request:{}',
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
