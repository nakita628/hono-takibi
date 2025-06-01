import { describe, it, expect } from 'vitest'
import { generateZodNumber } from './generate-zod-number'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-number.test.ts

describe('generateZodNumberSchema Test', () => {
  it.concurrent('generateZodNumber({}) -> z.number()', () => {
    const result = generateZodNumber({})
    const expected = 'z.number()'
    expect(result).toBe(expected)
  })

  it.concurrent('generateZodNumber({ minimum: 0 }) -> z.number().nonpositive()', () => {
    const result = generateZodNumber({ minimum: 0 })
    const expected = 'z.number().nonpositive()'
    expect(result).toBe(expected)
  })

  it.concurrent('generateZodNumber({ minLength: 1 }) -> z.number().min(1)', () => {
    const result = generateZodNumber({ minLength: 1 })
    const expected = 'z.number().min(1)'
    expect(result).toBe(expected)
  })

  it.concurrent('generateZodNumber({ maxLength: 10 }) -> z.number().max(10)', () => {
    const result = generateZodNumber({ maxLength: 10 })
    const expected = 'z.number().max(10)'
    expect(result).toBe(expected)
  })

  it.concurrent('generateZodNumber({ default: 1 }) -> z.number().default(1)', () => {
    const result = generateZodNumber({ default: 1 })
    const expected = 'z.number().default(1)'
    expect(result).toBe(expected)
  })

  it.concurrent(
    'generateZodNumber({ minimum: 0, exclusiveMinimum: true }) -> z.number().positive()',
    () => {
      const result = generateZodNumber({ minimum: 0, exclusiveMinimum: true })
      const expected = 'z.number().positive()'
      expect(result).toBe(expected)
    },
  )

  it.concurrent(
    'generateZodNumber({ minimum: 0, exclusiveMinimum: false }) -> z.number().nonpositive()',
    () => {
      const result = generateZodNumber({ minimum: 0, exclusiveMinimum: false })
      const expected = 'z.number().nonpositive()'
      expect(result).toBe(expected)
    },
  )

  it.concurrent(
    'generateZodNumber({ maximum: 0, exclusiveMaximum: true }) -> z.number().negative()',
    () => {
      const result = generateZodNumber({ maximum: 0, exclusiveMaximum: true })
      const expected = 'z.number().negative()'
      expect(result).toBe(expected)
    },
  )

  it.concurrent('should throw an error when schema is null', () => {
    // biome-ignore lint:
    const schema = null as any
    expect(() => generateZodNumber(schema)).toThrow('Cannot read properties of null')
  })

  it.concurrent('should throw an error when schema is undefined', () => {
    // biome-ignore lint:
    const schema = undefined as any
    expect(() => generateZodNumber(schema)).toThrow('Cannot read properties of undefined')
  })
})
