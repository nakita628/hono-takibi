import { afterEach, describe, expect, it } from 'vitest'
import { fmt, setFormatOptions } from './index.js'

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
    expect(result).toStrictEqual({ ok: false, error: 'Unexpected token' })
  })
})

describe('setFormatOptions', () => {
  afterEach(() => {
    setFormatOptions({})
  })

  it('uses default options without setFormatOptions', async () => {
    // default: printWidth: 100, singleQuote: true, semi: false
    const result = await fmt("const x = 'hello';")
    expect(result).toStrictEqual({ ok: true, value: "const x = 'hello'\n" })
  })

  it('semi: true adds semicolons', async () => {
    setFormatOptions({ semi: true, singleQuote: true })
    const result = await fmt("const x = 'hello'")
    expect(result).toStrictEqual({ ok: true, value: "const x = 'hello';\n" })
  })

  it('singleQuote: false uses double quotes', async () => {
    setFormatOptions({ singleQuote: false, semi: false })
    const result = await fmt("const x = 'hello'")
    expect(result).toStrictEqual({ ok: true, value: 'const x = "hello"\n' })
  })

  it('semi: true + singleQuote: false combined', async () => {
    setFormatOptions({ semi: true, singleQuote: false })
    const result = await fmt("const x = 'hello'")
    expect(result).toStrictEqual({ ok: true, value: 'const x = "hello";\n' })
  })

  it('tabWidth: 4 uses 4-space indentation', async () => {
    setFormatOptions({ tabWidth: 4, singleQuote: true, semi: false })
    const input = 'function f() {\nreturn 1\n}'
    const result = await fmt(input)
    expect(result).toStrictEqual({
      ok: true,
      value: 'function f() {\n    return 1\n}\n',
    })
  })

  it('useTabs: true uses tab indentation', async () => {
    setFormatOptions({ useTabs: true, singleQuote: true, semi: false })
    const input = 'function f() {\nreturn 1\n}'
    const result = await fmt(input)
    expect(result).toStrictEqual({
      ok: true,
      value: 'function f() {\n\treturn 1\n}\n',
    })
  })

  it('trailingComma: none removes trailing commas', async () => {
    setFormatOptions({ trailingComma: 'none', singleQuote: true, semi: false })
    const input = 'const obj = {\n  a: 1,\n  b: 2,\n}'
    const result = await fmt(input)
    expect(result).toStrictEqual({ ok: true, value: 'const obj = {\n  a: 1,\n  b: 2\n}\n' })
  })

  it('arrowParens: avoid omits parens on single param', async () => {
    setFormatOptions({ arrowParens: 'avoid', singleQuote: true, semi: false })
    const input = 'const f = (x) => x + 1'
    const result = await fmt(input)
    expect(result).toStrictEqual({ ok: true, value: 'const f = x => x + 1\n' })
  })

  it('arrowParens: always keeps parens on single param', async () => {
    setFormatOptions({ arrowParens: 'always', singleQuote: true, semi: false })
    const input = 'const f = x => x + 1'
    const result = await fmt(input)
    expect(result).toStrictEqual({ ok: true, value: 'const f = (x) => x + 1\n' })
  })

  it('bracketSpacing: false removes spaces in object literals', async () => {
    setFormatOptions({ bracketSpacing: false, singleQuote: true, semi: false })
    const input = 'const obj = { a: 1 }'
    const result = await fmt(input)
    expect(result).toStrictEqual({ ok: true, value: 'const obj = {a: 1}\n' })
  })

  it('printWidth: 40 wraps long lines', async () => {
    setFormatOptions({ printWidth: 40, singleQuote: true, semi: false })
    const input = 'const result = { alpha: 1, beta: 2, gamma: 3 }'
    const result = await fmt(input)
    expect(result.ok).toBe(true)
    if (result.ok) {
      const lines = result.value.trim().split('\n')
      expect(lines.length).toBeGreaterThan(1)
    }
  })

  it('falls back to defaults when called with empty object', async () => {
    setFormatOptions({ semi: true })
    setFormatOptions({})
    // default: singleQuote: true, semi: false
    const result = await fmt("const x = 'hello'")
    expect(result).toStrictEqual({ ok: true, value: "const x = 'hello'\n" })
  })
})
