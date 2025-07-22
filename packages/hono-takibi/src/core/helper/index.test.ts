import { describe, it, expect } from 'vitest'
import { maybeApplyNullability } from './maybe-apply-nullability.js'
import { pickTypes } from './pick-types.js'

// Test run
// pnpm vitest run ./src/core/helper/index.test.ts

describe('helper barrel file exports', () => {
  it('should export maybeApplyNullability', () => {
    expect(typeof maybeApplyNullability).toBe('function')
  })
  it('should export pickTypes', () => {
    expect(typeof pickTypes).toBe('function')
  })
})
