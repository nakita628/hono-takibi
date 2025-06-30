import { describe, it, expect } from 'vitest'
import { isYamlOrJsonOrTsp, isTs } from '.'

// Test run
// pnpm vitest run ./src/cli/validator/index.test.ts

describe('helpers barrel file exports', () => {
  it.concurrent('should export isYamlOrJsonOrTsp', () => {
    expect(typeof isYamlOrJsonOrTsp).toBe('function')
  })
  it.concurrent('should export isTs', () => {
    expect(typeof isTs).toBe('function')
  })
})
