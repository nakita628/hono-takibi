import { describe, it, expect } from 'vitest'
import { parseNamingCase } from '.'

// Test run
// pnpm vitest run ./src/cli/validator/index.test.ts

describe('helpers barrel file exports', () => {
  it.concurrent('should export parseNaming', () => {
    expect(typeof parseNamingCase).toBe('function')
  })
})
