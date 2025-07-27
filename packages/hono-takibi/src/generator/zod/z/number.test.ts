import { describe, expect, it } from 'vitest'
import { number } from './number'

// Test run
// pnpm vitest run ./src/generator/zod/z/number.test.ts

describe('numberSchema Test', () => {
  // number
  it.concurrent('number({}) -> z.number()', () => {
    expect(number({})).toBe('z.number()')
  })
  // nonpositive()
  it.concurrent('number({ minimum: 0 }) -> z.number().nonpositive()', () => {
    expect(number({ minimum: 0 })).toBe('z.number().nonpositive()')
  })
  // min
  it.concurrent('number({ minLength: 1 }) -> z.number().min(1)', () => {
    expect(number({ minLength: 1 })).toBe('z.number().min(1)')
  })
  // max
  it.concurrent('number({ maxLength: 10 }) -> z.number().max(10)', () => {
    expect(number({ maxLength: 10 })).toBe('z.number().max(10)')
  })
  // default
  it.concurrent('number({ default: 1 }) -> z.number().default(1)', () => {
    expect(number({ default: 1 })).toBe('z.number().default(1)')
  })
  // if minimum === 0 and exclusiveMinimum is true
  it.concurrent('number({ minimum: 0, exclusiveMinimum: true }) -> z.number().positive()', () => {
    expect(number({ minimum: 0, exclusiveMinimum: true })).toBe('z.number().positive()')
  })
  // if minimum === 0 and exclusiveMinimum is false
  it.concurrent(
    'number({ minimum: 0, exclusiveMinimum: false }) -> z.number().nonpositive()',
    () => {
      expect(number({ minimum: 0, exclusiveMinimum: false })).toBe('z.number().nonpositive()')
    },
  )
  // if maximum === 0 and exclusiveMaximum is true
  it.concurrent('number({ maximum: 0, exclusiveMaximum: true }) -> z.number().negative()', () => {
    const result = number({ maximum: 0, exclusiveMaximum: true })
    const expected = 'z.number().negative()'
    expect(result).toBe(expected)
  })
  // float
  it.concurrent('number({ format: "float" }) -> z.float()', () => {
    expect(number({ format: 'float' })).toBe('z.float32()')
  })
  // float32
  it.concurrent('number({ format: "float32" }) -> z.float32()', () => {
    expect(number({ format: 'float32' })).toBe('z.float32()')
  })
  // float64
  it.concurrent('number({ format: "float64" }) -> z.float64()', () => {
    expect(number({ format: 'float64' })).toBe('z.float64()')
  })
})
