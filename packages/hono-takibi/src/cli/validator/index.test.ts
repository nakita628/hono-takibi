import { describe, it, expect } from 'vitest'
import { parseIO, parseCliArgs, parseNaming } from '.'

// Test run
// pnpm vitest run ./src/cli/validator/index.test.ts

describe('helpers barrel file exports', () => {
  it.concurrent('should export ensureIO', () => {
    expect(typeof parseIO).toBe('function')
  })

  it.concurrent('should export parseCliArgs', () => {
    expect(typeof parseCliArgs).toBe('function')
  })

  it.concurrent('should export parseNaming', () => {
    expect(typeof parseNaming).toBe('function')
  })
})
