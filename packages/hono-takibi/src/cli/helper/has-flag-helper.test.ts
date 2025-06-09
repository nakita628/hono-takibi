import { describe, it, expect } from 'vitest'
import { hasFlagHelper } from './'

// Test run
// pnpm vitest run ./src/cli/helpers/has-flag-helper.test.ts

describe('hasFlagHelper', () => {
  it.concurrent(`hasFlagHelper(['--debug'], '--debug') -> true`, () => {
    const args = ['--debug']
    expect(hasFlagHelper(args, '--debug')).toBe(true)
  })

  it.concurrent(`hasFlagHelper(['--verbose', '--debug'], '--debug') -> true`, () => {
    const args = ['--verbose', '--debug']
    expect(hasFlagHelper(args, '--debug')).toBe(true)
  })

  it.concurrent(`hasFlagHelper(['--verbose'], '--debug') -> false`, () => {
    const args = ['--verbose']
    expect(hasFlagHelper(args, '--debug')).toBe(false)
  })

  it.concurrent(`hasFlagHelper([], '--debug') -> false`, () => {
    const args: string[] = []
    expect(hasFlagHelper(args, '--debug')).toBe(false)
  })

  it.concurrent(`hasFlagHelper(['--debug=true'], '--debug') -> false`, () => {
    const args = ['--debug=true']
    expect(hasFlagHelper(args, '--debug')).toBe(false)
  })
})
