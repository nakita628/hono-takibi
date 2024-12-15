import { describe, expect, it } from 'vitest'
import { generateFormatRequestObject } from './generate-format-request-object'

const generateFormatRequestObjectTestCases = [
  {
    input: ['query:z.object({page:z.string(),rows:z.string()})'],
    expected: 'request:{query:z.object({page:z.string(),rows:z.string()})},',
  },
  {
    input: ['params:z.object({id:z.string().uuid()})'],
    expected: 'request:{params:z.object({id:z.string().uuid()})},',
  },
  {
    input: ['query:z.object({page:z.string(),rows:z.string()})'],
    expected: 'request:{query:z.object({page:z.string(),rows:z.string()})},',
  },
]

describe('generateFormatRequestObject', () => {
  it.concurrent.each(generateFormatRequestObjectTestCases)(
    'formatRequestObject($input) -> $expected',
    async ({ input, expected }) => {
      const result = generateFormatRequestObject(input)
      expect(result).toBe(expected)
    },
  )
})
