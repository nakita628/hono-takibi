import { describe, it, expect } from 'vitest'
import { resolveConfig } from '.'

// Test run
// pnpm vitest run ./src/cli/config/index.test.ts

describe('config barrel file exports', () => {
  it.concurrent('should export resolveConfig', () => {
    expect(typeof resolveConfig).toBe('function')
  })
})
