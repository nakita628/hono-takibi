import { describe, it, expect } from 'vitest'
import { hasFlag } from '.'

// Test run
// pnpm vitest run ./src/cli/helper/has-flag.test.ts

describe('hasFlag', () => {
  it.concurrent(`hasFlag(['--debug'], '--debug') -> true`, () => {
    const args = ['--debug']
    expect(hasFlag(args, '--debug')).toBe(true)
  })

  it.concurrent(`hasFlag(['--verbose', '--debug'], '--debug') -> true`, () => {
    const args = ['--verbose', '--debug']
    expect(hasFlag(args, '--debug')).toBe(true)
  })

  it.concurrent(`hasFlag(['--verbose'], '--debug') -> false`, () => {
    const args = ['--verbose']
    expect(hasFlag(args, '--debug')).toBe(false)
  })

  it.concurrent(`hasFlag([], '--debug') -> false`, () => {
    const args: string[] = []
    expect(hasFlag(args, '--debug')).toBe(false)
  })

  it.concurrent(`hasFlag(['--debug=true'], '--debug') -> false`, () => {
    const args = ['--debug=true']
    expect(hasFlag(args, '--debug')).toBe(false)
  })
})
