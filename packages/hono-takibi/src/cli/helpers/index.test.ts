import { describe, it, expect } from 'vitest'
import { flagValHelper, hasFlagHelper, mergeConfigHelper, sliceArgsHelper } from '.'

// Test run
// pnpm vitest run ./src/cli/helpers/index.test.ts

describe('helpers barrel file exports', () => {
  it.concurrent('should export flagValHelper', () => {
    expect(typeof flagValHelper).toBe('function')
  })

  it.concurrent('should export hasFlagHelper', () => {
    expect(typeof hasFlagHelper).toBe('function')
  })

  it.concurrent('should export mergeConfigHelper', () => {
    expect(typeof mergeConfigHelper).toBe('function')
  })

  it.concurrent('should export sliceArgsHelper', () => {
    expect(typeof sliceArgsHelper).toBe('function')
  })
})
