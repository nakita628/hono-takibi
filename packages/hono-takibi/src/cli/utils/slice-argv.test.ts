import { describe, it, expect } from 'vitest'
import { sliceArgv } from '.'

// Test run
// pnpm vitest run ./src/cli/utils/slice-argv.test.ts

describe('sliceArgv', () => {
  it(`sliceArgv(['**/bin/node', '**/dist/index.js', '-o']) -> ['-o']`, () => {
    const argv = ['**/bin/node', '**/dist/index.js', '-o']
    expect(sliceArgv(argv)).toStrictEqual(['-o'])
  })

  it(`sliceArgv(['**/bin/node', '**/dist/index.js', '-h']) -> ['-h']`, () => {
    const argv = ['**/bin/node', '**/dist/index.js', '-h']
    expect(sliceArgv(argv)).toStrictEqual(['-h'])
  })

  it(`sliceArgv(['**/bin/node', '**/dist/index.js', '-h']) -> ['-help']`, () => {
    const argv = ['**/bin/node', '**/dist/index.js', '-help']
    expect(sliceArgv(argv)).toStrictEqual(['-help'])
  })
})
