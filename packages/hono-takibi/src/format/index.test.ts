import { describe, expect, it } from 'vitest'
import { formatCode } from './index'

const formatCodeTestCases = [
  {
    input: 'const takibi="hono-takibi";',
    expected: `const takibi = 'hono-takibi'
`,
  },
]

describe('formatCode', () => {
  it.concurrent.each(formatCodeTestCases)(
    'formatCode($input) -> $expected',
    async ({ input, expected }) => {
      const result = await formatCode(input)
      expect(result).toBe(expected)
    },
  )
})
