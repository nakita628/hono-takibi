import { describe, expect, it } from 'vitest'
import { generateZodPassthrough } from './generate-zod-passthrough'

const generateZodPassthroughTestCases: { zodSchema: string; expected: string }[] = [
  {
    zodSchema: 'z.object({})',
    expected: 'z.object({}).passthrough()',
  },
]

describe('generateZodPassthrough', () => {
  it.concurrent.each(generateZodPassthroughTestCases)(
    'generateZodPassthrough($zodSchema) -> $expected',
    ({ zodSchema, expected }) => {
      expect(generateZodPassthrough(zodSchema)).toBe(expected)
    },
  )
})
