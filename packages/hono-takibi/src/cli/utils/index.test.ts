import { describe, it, expect } from 'vitest'
import { getFlagValue, hasFlag, isHelpRequested, sliceArgv } from '.'

// Test run
// pnpm vitest run ./src/cli/args/index.test.ts

describe('args barrel file exports', () => {
  it.concurrent('should export getFlagValue', () => {
    expect(typeof getFlagValue).toBe('function')
  })
  it.concurrent('should export hasFlag', () => {
    expect(typeof hasFlag).toBe('function')
  })
  it.concurrent('should export isHelpRequeste', () => {
    expect(typeof isHelpRequested).toBe('function')
  })
  it.concurrent('should export sliceArgv', () => {
    expect(typeof sliceArgv).toBe('function')
  })
})
