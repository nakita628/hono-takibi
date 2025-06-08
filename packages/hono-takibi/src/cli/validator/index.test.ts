import { describe, it, expect } from 'vitest'
import { ensureIO, parseCliArgs, parseNaming } from '.'

// Test run
// pnpm vitest run ./src/cli/validator/index.test.ts

describe('helpers barrel file exports', () => {
  it.concurrent('should export ensureIO', () => {
    expect(typeof ensureIO).toBe('function')
  })

  it.concurrent('should export parseCliArgs', () => {
    expect(typeof parseCliArgs).toBe('function')
  })

  it.concurrent('should export parseNaming', () => {
    expect(typeof parseNaming).toBe('function')
  })
})
