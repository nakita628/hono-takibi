import { describe, it, expect } from 'vitest'
import { ensureIO, parseCliArgs, parseNaming } from '.'

// Test run
// pnpm vitest run ./src/cli/validator/index.test.ts

describe('helpers barrel file exports', () => {
  it('should export ensureIO', () => {
    expect(typeof ensureIO).toBe('function')
  })

  it('should export parseCliArgs', () => {
    expect(typeof parseCliArgs).toBe('function')
  })

  it('should export parseNaming', () => {
    expect(typeof parseNaming).toBe('function')
  })
})
