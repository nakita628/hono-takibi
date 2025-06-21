import { describe, it, expect } from 'vitest'
import { getToSafeIdentifier } from '.'

// Test run
// pnpm vitest run ./src/core/helper/index.test.ts

describe('helpers barrel file exports', () => {
  it('should export getToSafeIdentifierHelper', () => {
    expect(typeof getToSafeIdentifier).toBe('function')
  })
})
