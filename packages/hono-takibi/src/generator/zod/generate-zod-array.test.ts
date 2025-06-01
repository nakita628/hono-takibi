import { describe, it, expect } from 'vitest'
import { generateZodArray } from './generate-zod-array'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-array.test.ts

describe('generateZodArray Test', () => {
  it.concurrent(`generateZodArray('Test') -> z.array(Test)`, () => {
    const result = generateZodArray('Test')
    const expected = 'z.array(Test)'
    expect(result).toBe(expected)
  })

  it.concurrent(`generateZodArray('z.string()') -> z.array(z.string())`, () => {
    const result = generateZodArray('z.string()')
    const expected = 'z.array(z.string())'
    expect(result).toBe(expected)
  })

  it.concurrent(
    `generateZodArray('z.object({ name: z.string() })') -> z.array(z.object({ name: z.string() }))`,
    () => {
      const result = generateZodArray('z.object({ name: z.string() })')
      const expected = 'z.array(z.object({ name: z.string() }))'
      expect(result).toBe(expected)
    },
  )
})
