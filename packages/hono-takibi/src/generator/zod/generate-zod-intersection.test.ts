import { describe, it, expect } from 'vitest'
import { generateZodIntersection } from './generate-zod-intersection'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-intersection.test.ts

describe('generateZodIntersection Test', () => {
  it.concurrent(
    `generateZodIntersection(['TestSchema', 'z.object({type:z.enum(["A","B","C"])})']) -> z.intersection(TestSchema,z.object({type:z.enum(["A","B","C"])}))`,
    () => {
      const result = generateZodIntersection([
        'TestSchema',
        'z.object({type:z.enum(["A","B","C"])})',
      ])
      const expected = 'z.intersection(TestSchema,z.object({type:z.enum(["A","B","C"])}))'
      expect(result).toBe(expected)
    },
  )
})
