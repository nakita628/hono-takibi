import { describe, it, expect } from 'vitest'
import { findReferences } from './find-references'

// Test run
// pnpm vitest run ./src/core/schema/references/find-references.test.ts

describe('findReferences Test', () => {
  it.concurrent(
    `findReferences({ $ref: '#/components/schemas/Test' }) -> new Set(['Test'])`,
    () => {
      const result = findReferences({ $ref: '#/components/schemas/Test' })
      const expected = new Set(['Test'])
      expect(result).toStrictEqual(expected)
    },
  )
})
