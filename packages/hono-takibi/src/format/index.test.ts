import { describe, it, expect } from 'vitest'
import { formatCode } from '.'

// Test run
// pnpm vitest run ./src/format/index.test.ts

describe('formatCode', () => {
  it('returns formatted code as ok result', async () => {
    const code = "const takibi = 'hono-takibi';"
    const result = await formatCode(code)
    const expected = `const takibi = 'hono-takibi'
`
    expect(result).toStrictEqual({ ok: true, value: expected })
  })

  it('returns error result for invalid code', async () => {
    const result = await formatCode('const = ;')
    expect(result).toStrictEqual({
      ok: false,
      error: 'Variable declaration expected. (1:7)\n> 1 | const = ;\n    |       ^',
    })
  })
})
