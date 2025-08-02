import { describe, expect, it } from 'vitest'
import { ref } from './ref'

// Test run
// pnpm vitest run ./src/helper/ref.test.ts

describe('ref', () => {
  it('should return a wrapped reference schema', () => {
    const result = ref({ $ref: '#/components/schemas/Test' })
    expect(result).toBe('TestSchema')
  })

  it('should return z.any() for schemas without $ref', () => {
    expect(ref({})).toBe('z.any()')
  })
})
