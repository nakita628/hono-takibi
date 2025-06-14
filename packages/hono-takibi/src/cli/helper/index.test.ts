import { describe, it, expect } from 'vitest'
import { setConfig } from '.'

// Test run
// pnpm vitest run ./src/cli/helper/index.test.ts

describe('helper barrel file exports', () => {
  it.concurrent('should export mergeConfig', () => {
    expect(typeof setConfig).toBe('function')
  })
})
