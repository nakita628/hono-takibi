import { describe, it, expect } from 'vitest'
import { intersection } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/intersection.test.ts

describe('intersection Test', () => {
  it.concurrent(
    `intersection(['TestSchema', 'z.object({type:z.enum(["A","B","C"])})']) -> z.intersection(TestSchema,z.object({type:z.enum(["A","B","C"])}))`,
    () => {
      const result = intersection(['TestSchema', 'z.object({type:z.enum(["A","B","C"])})'])
      const expected = 'z.intersection(TestSchema,z.object({type:z.enum(["A","B","C"])}))'
      expect(result).toBe(expected)
    },
  )
})
