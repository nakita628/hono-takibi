import { describe, it, expect } from 'vitest'
import { parseHelp } from '.'

// Test run
// pnpm vitest run ./src/cli/validator/parse-help.test.ts

describe('parseHelp (Result version)', () => {
  it('should return err("help") for no arguments (args.length === 0)', () => {
    expect(parseHelp([])).toEqual({ ok: false, error: 'help' })
  })

  it('should return err("help") for ["--help"]', () => {
    expect(parseHelp(['--help'])).toEqual({ ok: false, error: 'help' })
  })

  it('should return err("help") for ["-h"]', () => {
    expect(parseHelp(['-h'])).toEqual({ ok: false, error: 'help' })
  })

  it('should return ok(undefined) for other options only', () => {
    expect(parseHelp(['--foo'])).toEqual({ ok: true, value: undefined })
    expect(parseHelp(['input.yaml', '-o', 'output.ts'])).toEqual({ ok: true, value: undefined })
    expect(parseHelp(['--export-type'])).toEqual({ ok: true, value: undefined })
  })

  it('should return ok(undefined) for --help or -h with other arguments', () => {
    expect(parseHelp(['input.yaml', '--help'])).toEqual({ ok: true, value: undefined })
    expect(parseHelp(['-h', '--foo'])).toEqual({ ok: true, value: undefined })
    expect(parseHelp(['--help', '--foo'])).toEqual({ ok: true, value: undefined })
    expect(parseHelp(['--foo', '--help'])).toEqual({ ok: true, value: undefined })
  })
})
