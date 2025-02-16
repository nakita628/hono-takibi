import { describe, expect, it } from 'vitest'
import { generateRequestParams } from './generate-request-params'

const generateRequestParamsTestCases = [
  {
    requestBodyCode: "key:'value',",
    expected: "request:{key:'value',},",
  },
  {
    requestBodyCode: '',
    expected: 'request:{},',
  },
  {
    requestBodyCode: "key1:'value1',key2:'value2',",
    expected: "request:{key1:'value1',key2:'value2',},",
  },
  {
    requestBodyCode: "key:'value', // comment",
    expected: "request:{key:'value', // comment},",
  },
  {
    requestBodyCode: "specialChars:'!@#$%^&*()',",
    expected: "request:{specialChars:'!@#$%^&*()',},",
  },
]

describe('createRequestParams', () => {
  it.concurrent.each(generateRequestParamsTestCases)(
    'createRequestParams($requestBodyCode) -> $expected',
    async ({ requestBodyCode, expected }) => {
      const result = generateRequestParams(requestBodyCode)
      expect(result).toEqual(expected)
    },
  )
})
