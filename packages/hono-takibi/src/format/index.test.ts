import { Effect } from 'effect'
import type { FormatConfig } from 'oxfmt'
import { describe, expect, it } from 'vite-plus/test'

import { runGenerator } from '../testing/index.js'
import { fmt, FormatOptions } from './index.js'

describe('fmt', () => {
  it.concurrent('returns formatted code as ok result', async () => {
    const input = "const takibi = 'hono-takibi';"
    const result = await runGenerator(fmt(input))
    const expected = `const takibi = 'hono-takibi'
`
    expect(result).toStrictEqual({ ok: true, value: expected })
  })

  it.concurrent('returns error result for invalid code', async () => {
    const result = await runGenerator(fmt('const = ;'))
    expect(result).toStrictEqual({ ok: false, error: 'Unexpected token' })
  })
})

/** Formats with an explicit option set, the way a config file's `format` block does. */
const fmtWith = (options: FormatConfig, input: string) =>
  runGenerator(fmt(input).pipe(Effect.provideService(FormatOptions, options)))

describe('FormatOptions', () => {
  it('uses default options without setFormatOptions', async () => {
    // default: printWidth: 100, singleQuote: true, semi: false
    const result = await runGenerator(fmt("const x = 'hello';"))
    expect(result).toStrictEqual({ ok: true, value: "const x = 'hello'\n" })
  })

  it('semi: true adds semicolons', async () => {
    const result = await fmtWith({ semi: true, singleQuote: true }, "const x = 'hello'")
    expect(result).toStrictEqual({ ok: true, value: "const x = 'hello';\n" })
  })

  it('singleQuote: false uses double quotes', async () => {
    const result = await fmtWith({ singleQuote: false, semi: false }, "const x = 'hello'")
    expect(result).toStrictEqual({ ok: true, value: 'const x = "hello"\n' })
  })

  it('semi: true + singleQuote: false combined', async () => {
    const result = await fmtWith({ semi: true, singleQuote: false }, "const x = 'hello'")
    expect(result).toStrictEqual({ ok: true, value: 'const x = "hello";\n' })
  })

  it('tabWidth: 4 uses 4-space indentation', async () => {
    const input = 'function f() {\nreturn 1\n}'
    const result = await fmtWith({ tabWidth: 4, singleQuote: true, semi: false }, input)
    expect(result).toStrictEqual({
      ok: true,
      value: 'function f() {\n    return 1\n}\n',
    })
  })

  it('useTabs: true uses tab indentation', async () => {
    const input = 'function f() {\nreturn 1\n}'
    const result = await fmtWith({ useTabs: true, singleQuote: true, semi: false }, input)
    expect(result).toStrictEqual({
      ok: true,
      value: 'function f() {\n\treturn 1\n}\n',
    })
  })

  it('trailingComma: none removes trailing commas', async () => {
    const input = 'const obj = {\n  a: 1,\n  b: 2,\n}'
    const result = await fmtWith({ trailingComma: 'none', singleQuote: true, semi: false }, input)
    expect(result).toStrictEqual({ ok: true, value: 'const obj = {\n  a: 1,\n  b: 2\n}\n' })
  })

  it('arrowParens: avoid omits parens on single param', async () => {
    const input = 'const f = (x) => x + 1'
    const result = await fmtWith({ arrowParens: 'avoid', singleQuote: true, semi: false }, input)
    expect(result).toStrictEqual({ ok: true, value: 'const f = x => x + 1\n' })
  })

  it('arrowParens: always keeps parens on single param', async () => {
    const input = 'const f = x => x + 1'
    const result = await fmtWith({ arrowParens: 'always', singleQuote: true, semi: false }, input)
    expect(result).toStrictEqual({ ok: true, value: 'const f = (x) => x + 1\n' })
  })

  it('bracketSpacing: false removes spaces in object literals', async () => {
    const input = 'const obj = { a: 1 }'
    const result = await fmtWith({ bracketSpacing: false, singleQuote: true, semi: false }, input)
    expect(result).toStrictEqual({ ok: true, value: 'const obj = {a: 1}\n' })
  })

  it('printWidth: 40 wraps long lines', async () => {
    const input = 'const result = { alpha: 1, beta: 2, gamma: 3 }'
    const result = await fmtWith({ printWidth: 40, singleQuote: true, semi: false }, input)
    expect(result).toStrictEqual({
      ok: true,
      value: 'const result = {\n  alpha: 1,\n  beta: 2,\n  gamma: 3,\n}\n',
    })
  })

  it('falls back to defaults when called with empty object', async () => {
    // default: singleQuote: true, semi: false
    const result = await fmtWith({}, "const x = 'hello'")
    expect(result).toStrictEqual({ ok: true, value: "const x = 'hello'\n" })
  })
})
