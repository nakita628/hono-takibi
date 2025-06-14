import { describe, it, expect } from 'vitest'
import { isHelpRequested } from '.'

// Test run
// pnpm vitest run ./src/cli/args/index.test.ts

describe('args barrel file exports', () => {
  it.concurrent('should export isHelpRequeste', () => {
    expect(typeof isHelpRequested).toBe('function')
  })
})
