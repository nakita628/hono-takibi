import { describe, expect, it } from 'vitest'
import { parseCli, parseIO } from '.'

// Test run
// pnpm vitest run ./src/cli/args/index.test.ts

describe('args barrel file exports', () => {
  it.concurrent('should export parseCli', () => {
    expect(typeof parseCli).toBe('function')
  })

  it.concurrent('should export parseIO', () => {
    expect(typeof parseIO).toBe('function')
  })
})
