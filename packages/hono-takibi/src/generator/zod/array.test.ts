import { describe, it, expect } from 'vitest'
import { array } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/array.test.ts

describe('array Test', () => {
  it.concurrent(`array('Test') -> z.array(Test)`, () => {
    const result = array('Test')
    const expected = 'z.array(Test)'
    expect(result).toBe(expected)
  })

  it.concurrent(`array('z.string()') -> z.array(z.string())`, () => {
    const result = array('z.string()')
    const expected = 'z.array(z.string())'
    expect(result).toBe(expected)
  })

  it.concurrent(
    `array('z.object({ name: z.string() })') -> z.array(z.object({ name: z.string() }))`,
    () => {
      const result = array('z.object({ name: z.string() })')
      const expected = 'z.array(z.object({ name: z.string() }))'
      expect(result).toBe(expected)
    },
  )
})
