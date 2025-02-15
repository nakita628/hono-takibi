import { describe, expect, it } from 'vitest'
import { generateFormatRequestObject } from './generate-format-request-object'

const generateFormatRequestObjectTestCases = [
  {
    requestParamsArray: ['query:z.object({page:z.string(),rows:z.string()})'],
    expected: 'request:{query:z.object({page:z.string(),rows:z.string()})},',
  },
  {
    requestParamsArray: ['params:z.object({id:z.string().uuid()})'],
    expected: 'request:{params:z.object({id:z.string().uuid()})},',
  },
  {
    requestParamsArray: ['query:z.object({page:z.string(),rows:z.string()})'],
    expected: 'request:{query:z.object({page:z.string(),rows:z.string()})},',
  },
]

describe('generateFormatRequestObject', () => {
  it.concurrent.each(generateFormatRequestObjectTestCases)(
    'formatRequestObject($requestParamsArray) -> $expected',
    async ({ requestParamsArray, expected }) => {
      const result = generateFormatRequestObject(requestParamsArray)
      expect(result).toBe(expected)
    },
  )
})
