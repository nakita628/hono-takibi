import { format } from 'oxfmt'

export async function fmt(
  input: string,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const { code, errors } = await format('<stdin>.ts', input, {
    // parser: 'typescript',
    printWidth: 100,
    singleQuote: true,
    semi: false,
  })
  if (errors.length > 0) {
    return {
      ok: false,
      error: errors.map((e) => e.message).join('\n'),
    }
  }
  return { ok: true, value: code }
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/format/index.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
  describe('fmt', () => {
    it.concurrent('returns formatted code as ok result', async () => {
      const input = "const takibi = 'hono-takibi';"
      const result = await fmt(input)
      const expected = `const takibi = 'hono-takibi'
`
      expect(result).toStrictEqual({ ok: true, value: expected })
    })

    it.concurrent('returns error result for invalid code', async () => {
      const result = await fmt('const = ;')
      expect(result).toMatchObject({ ok: false })
    })
  })
}
