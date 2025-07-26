import { describe, expect, it } from 'vitest'
import { number } from './number'

// Test run
// pnpm vitest run ./src/generator/zod/z/number.test.ts

describe('numberSchema Test', () => {
  it.concurrent('number({}) -> z.number()', () => {
    const result = number({})
    const expected = 'z.number()'
    expect(result).toBe(expected)
  })

  it.concurrent('number({ minimum: 0 }) -> z.number().nonpositive()', () => {
    const result = number({ minimum: 0 })
    const expected = 'z.number().nonpositive()'
    expect(result).toBe(expected)
  })

  it.concurrent('number({ minLength: 1 }) -> z.number().min(1)', () => {
    const result = number({ minLength: 1 })
    const expected = 'z.number().min(1)'
    expect(result).toBe(expected)
  })

  it.concurrent('number({ maxLength: 10 }) -> z.number().max(10)', () => {
    const result = number({ maxLength: 10 })
    const expected = 'z.number().max(10)'
    expect(result).toBe(expected)
  })

  it.concurrent('number({ default: 1 }) -> z.number().default(1)', () => {
    const result = number({ default: 1 })
    const expected = 'z.number().default(1)'
    expect(result).toBe(expected)
  })

  it.concurrent('number({ minimum: 0, exclusiveMinimum: true }) -> z.number().positive()', () => {
    const result = number({ minimum: 0, exclusiveMinimum: true })
    const expected = 'z.number().positive()'
    expect(result).toBe(expected)
  })

  it.concurrent(
    'number({ minimum: 0, exclusiveMinimum: false }) -> z.number().nonpositive()',
    () => {
      const result = number({ minimum: 0, exclusiveMinimum: false })
      const expected = 'z.number().nonpositive()'
      expect(result).toBe(expected)
    },
  )

  it.concurrent('number({ maximum: 0, exclusiveMaximum: true }) -> z.number().negative()', () => {
    const result = number({ maximum: 0, exclusiveMaximum: true })
    const expected = 'z.number().negative()'
    expect(result).toBe(expected)
  })

  it.concurrent('number({ format: "float" }) -> z.float()', () => {
    const result = number({ format: 'float' })
    const expected = 'z.float32()'
    expect(result).toBe(expected)
  })

  it.concurrent('number({ format: "float32" }) -> z.float32()', () => {
    const result = number({ format: 'float32' })
    const expected = 'z.float32()'
    expect(result).toBe(expected)
  })

  it.concurrent('number({ format: "float64" }) -> z.float64()', () => {
    const result = number({ format: 'float64' })
    const expected = 'z.float64()'
    expect(result).toBe(expected)
  })
})
