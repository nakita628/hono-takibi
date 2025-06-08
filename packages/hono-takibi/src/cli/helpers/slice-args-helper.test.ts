import { describe, it, expect } from 'vitest'
import { sliceArgsHelper } from '.'

// Test run
// pnpm vitest run ./src/cli/helpers/slice-args-helper.test.ts

describe('sliceArgsHelper', () => {
  it(`sliceArgsHelper(['node', 'script.js', '--help']) -> ['--help']`, () => {
    const argv = ['node', 'script.js', '--help']
    expect(sliceArgsHelper(argv)).toStrictEqual(['--help'])
  })

  it(`sliceArgsHelper(['node', 'cli.js', '--name', 'value']) -> ['--name', 'value']`, () => {
    const argv = ['node', 'cli.js', '--name', 'value']
    expect(sliceArgsHelper(argv)).toStrictEqual(['--name', 'value'])
  })

  it(`sliceArgsHelper(['node', 'cli.js']) -> []`, () => {
    const argv = ['node', 'cli.js']
    expect(sliceArgsHelper(argv)).toStrictEqual([])
  })

  it(`sliceArgsHelper(['a', 'b', 'c', 'd']) -> ['c', 'd']`, () => {
    const argv = ['a', 'b', 'c', 'd']
    expect(sliceArgsHelper(argv)).toStrictEqual(['c', 'd'])
  })

  it('sliceArgsHelper([]) -> []', () => {
    const argv: string[] = []
    expect(sliceArgsHelper(argv)).toStrictEqual([])
  })
})
