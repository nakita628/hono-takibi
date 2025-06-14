import { describe, it, expect } from 'vitest'
import { isHelpRequested } from '.'

// Test run
// pnpm vitest run ./src/cli/utils/is-help-requested.test.ts

describe('isHelpRequested', () => {
  it('returns true for ["--help"]', () => {
    expect(isHelpRequested(['--help'])).toBe(true)
  })

  it('returns true for ["-h"]', () => {
    expect(isHelpRequested(['-h'])).toBe(true)
  })

  it('returns false for other arguments only', () => {
    expect(isHelpRequested(['--foo'])).toBe(false)
    expect(isHelpRequested(['input.yaml', '-o', 'output.ts'])).toBe(false)
    expect(isHelpRequested(['--export-type'])).toBe(false)
  })

  it('returns false for --help or -h mixed with other arguments', () => {
    expect(isHelpRequested(['input.yaml', '--help'])).toBe(false)
    expect(isHelpRequested(['-h', '--foo'])).toBe(false)
    expect(isHelpRequested(['--help', '--foo'])).toBe(false)
    expect(isHelpRequested(['--foo', '--help'])).toBe(false)
  })
})
