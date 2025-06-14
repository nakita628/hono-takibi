import { describe, it, expect } from 'vitest'
import { parseHelp } from '.'

// Test run
// pnpm vitest run ./src/cli/validator/parse-help.test.ts

describe('parseHelp', () => {
  it('returns true for ["--help"]', () => {
    expect(parseHelp(['--help'])).toBe(true)
  })

  it('returns true for ["-h"]', () => {
    expect(parseHelp(['-h'])).toBe(true)
  })

  it('returns false for other arguments only', () => {
    expect(parseHelp(['--foo'])).toBe(false)
    expect(parseHelp(['input.yaml', '-o', 'output.ts'])).toBe(false)
    expect(parseHelp(['--export-type'])).toBe(false)
  })

  it('returns false for --help or -h mixed with other arguments', () => {
    expect(parseHelp(['input.yaml', '--help'])).toBe(false)
    expect(parseHelp(['-h', '--foo'])).toBe(false)
    expect(parseHelp(['--help', '--foo'])).toBe(false)
    expect(parseHelp(['--foo', '--help'])).toBe(false)
  })
})
