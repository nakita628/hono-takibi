import { describe, expect, it } from 'vitest'
import { honoTakibi } from '.'

// Test run
// pnpm vitest run ./src/cli/index.test.ts

describe('cli barrel file exports', () => {
  it('should export honoTakibi', () => {
    expect(typeof honoTakibi).toBe('function')
  })
})
