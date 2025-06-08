import { describe, it, expect } from 'vitest'
import { flagValHelper, hasFlagHelper, mergeConfigHelper, sliceArgsHelper } from '.'

// Test run
// pnpm vitest run ./src/cli/helpers/index.test.ts

describe('helpers barrel file exports', () => {
  it('should export flagValHelper', () => {
    expect(typeof flagValHelper).toBe('function')
  })

  it('should export hasFlagHelper', () => {
    expect(typeof hasFlagHelper).toBe('function')
  })

  it('should export mergeConfigHelper', () => {
    expect(typeof mergeConfigHelper).toBe('function')
  })

  it('should export sliceArgsHelper', () => {
    expect(typeof sliceArgsHelper).toBe('function')
  })
})
