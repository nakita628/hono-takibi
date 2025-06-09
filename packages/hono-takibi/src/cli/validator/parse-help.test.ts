import { describe, it, expect } from 'vitest'
import { parseHelp } from '.'

// Test run
// pnpm vitest run ./src/cli/validator/parse-help.test.ts

describe('parseHelp', () => {
  it('should return true for no arguments (args.length === 0)', () => {
    expect(parseHelp([])).toBe(true)
  })

  it('should return true for ["--help"]', () => {
    expect(parseHelp(['--help'])).toBe(true)
  })

  it('should return true for ["-h"]', () => {
    expect(parseHelp(['-h'])).toBe(true)
  })

  it('should return false for other options only', () => {
    expect(parseHelp(['--foo'])).toBe(false)
    expect(parseHelp(['input.yaml', '-o', 'output.ts'])).toBe(false)
    expect(parseHelp(['--export-type'])).toBe(false)
  })

  it('should return false for --help with other arguments', () => {
    expect(parseHelp(['input.yaml', '--help'])).toBe(false)
    expect(parseHelp(['-h', '--foo'])).toBe(false)
    expect(parseHelp(['--help', '--foo'])).toBe(false)
    expect(parseHelp(['--foo', '--help'])).toBe(false)
  })
})
