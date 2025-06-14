import { describe, it, expect } from 'vitest'
import { fmt } from '.'

// Test run
// pnpm vitest run ./src/format/index.test.ts

describe('fmt', () => {
  it.concurrent('returns formatted code as ok result', async () => {
    const code = "const takibi = 'hono-takibi';"
    const result = await fmt(code)
    const expected = `const takibi = 'hono-takibi'
`
    expect(result).toStrictEqual({ ok: true, value: expected })
  })

  it.concurrent('returns error result for invalid code', async () => {
    const result = await fmt('const = ;')
    expect(result).toMatchObject({ ok: false })
  })
})
