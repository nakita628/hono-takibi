import { describe, expect, it } from 'vitest'
import { sortByDependencies, wrap } from './index.js'

// Test run
// pnpm vitest run ./src/helper/index.test.ts

describe('helper barrel file exports', () => {
  it('should export sortByDependencies', () => {
    expect(typeof sortByDependencies).toBe('function')
  })
  it('should export wrap', () => {
    expect(typeof wrap).toBe('function')
  })
})
