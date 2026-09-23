import { Effect } from 'effect'
import type { FormatConfig } from 'oxfmt'
import { describe, expect, it } from 'vite-plus/test'

import { runGenerator, runGeneratorError } from '../testing/index.js'
import { fmt, FormatOptions } from './index.js'

describe('fmt', () => {
  it.concurrent('returns formatted code as ok result', async () => {
    const input = "const takibi = 'hono-takibi';"
    const result = await runGenerator(fmt(input))
    const expected = `const takibi = 'hono-takibi'
`
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('returns error result for invalid code', async () => {
    const result = await runGeneratorError(fmt('const = ;'))
    expect(result.message).toBe('Unexpected token')
  })
})

/** Formats with an explicit option set, the way a config file's `format` block does. */
const fmtWith = (options: FormatConfig, input: string) =>
  runGenerator(fmt(input).pipe(Effect.provideService(FormatOptions, options)))

// Every option is forwarded to oxfmt through one service, so one option and the empty
// object are enough to prove the plumbing; the options themselves are oxfmt's to test.
describe('FormatOptions', () => {
  it('uses default options without setFormatOptions', async () => {
    // default: printWidth: 100, singleQuote: true, semi: false
    const result = await runGenerator(fmt("const x = 'hello';"))
    expect(result).toStrictEqual("const x = 'hello'\n")
  })

  it('semi: true adds semicolons', async () => {
    const result = await fmtWith({ semi: true, singleQuote: true }, "const x = 'hello'")
    expect(result).toStrictEqual("const x = 'hello';\n")
  })

  // A config file's `format` block usually sets one option. Losing the merge with the
  // defaults would silently flip every generated file to double quotes and semicolons.
  it('keeps the other defaults when one option is overridden', async () => {
    const result = await fmtWith(
      { printWidth: 30 },
      "const a = 'x';\nconst pair = [aaaaaaaaaa, bbbbbbbbbb, cccccccccc]",
    )
    expect(result).toStrictEqual(`const a = 'x'
const pair = [
  aaaaaaaaaa,
  bbbbbbbbbb,
  cccccccccc,
]
`)
  })

  it('falls back to defaults when called with empty object', async () => {
    // default: singleQuote: true, semi: false
    const result = await fmtWith({}, "const x = 'hello'")
    expect(result).toStrictEqual("const x = 'hello'\n")
  })
})
