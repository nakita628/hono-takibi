import { describe, it, expect } from 'vitest'
import { sliceArgs } from '.'

// Test run
// pnpm vitest run ./src/cli/helper/slice-args.test.ts

describe('sliceArgs', () => {
  it(`sliceArgs(['**/bin/node', '**/dist/index.js', '-o']) -> ['-o']`, () => {
    const argv = ['**/bin/node', '**/dist/index.js', '-o']
    expect(sliceArgs(argv)).toStrictEqual(['-o'])
  })

  it(`sliceArgs(['**/bin/node', '**/dist/index.js', '-h']) -> ['-h']`, () => {
    const argv = ['**/bin/node', '**/dist/index.js', '-h']
    expect(sliceArgs(argv)).toStrictEqual(['-h'])
  })

  it(`sliceArgs(['**/bin/node', '**/dist/index.js', '-h']) -> ['-help']`, () => {
    const argv = ['**/bin/node', '**/dist/index.js', '-help']
    expect(sliceArgs(argv)).toStrictEqual(['-help'])
  })
})
