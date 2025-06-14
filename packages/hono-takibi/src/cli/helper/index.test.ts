import { describe, it, expect } from 'vitest'
import { flagVal, hasFlag, setConfig, sliceArgs } from '.'

// Test run
// pnpm vitest run ./src/cli/helper/index.test.ts

describe('helper barrel file exports', () => {
  it.concurrent('should export flagVal', () => {
    expect(typeof flagVal).toBe('function')
  })

  it.concurrent('should export hasFlag', () => {
    expect(typeof hasFlag).toBe('function')
  })

  it.concurrent('should export mergeConfig', () => {
    expect(typeof setConfig).toBe('function')
  })

  it.concurrent('should export sliceArgs', () => {
    expect(typeof sliceArgs).toBe('function')
  })
})
