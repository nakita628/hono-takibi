import { describe, it, expect } from 'vitest'
import { arrayReferenceSchema, referenceSchema } from './index.js'

// Test run
// pnpm vitest run ./src/generator/zod/reference/index.test.ts

describe('reference schema module barrel file exports', () => {
  it('should export arrayReferenceSchema', () => {
    expect(typeof arrayReferenceSchema).toBe('function')
  })

  it('should export referenceSchema', () => {
    expect(typeof referenceSchema).toBe('function')
  })
})
