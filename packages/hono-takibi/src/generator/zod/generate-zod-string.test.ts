import { describe, expect, test } from 'vitest'
import { generateZodString } from './generate-zod-string'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-string.test.ts

describe('generateZodStringSchema Test', () => {
  test.concurrent('generateZodString({}) -> z.string()', () => {
    const result = generateZodString({})
    const expected = 'z.string()'
    expect(result).toBe(expected)
  })

  test.concurrent(
    `generateZodString({ pattern: '^[a-z]+$' }) -> z.string().regex(/^[a-z]+$/)`,
    () => {
      const result = generateZodString({ pattern: '^[a-z]+$' })
      const expected = 'z.string().regex(/^[a-z]+$/)'
      expect(result).toBe(expected)
    },
  )

  test.concurrent('generateZodString({ minLength: 1 }) -> z.string().min(1)', () => {
    const result = generateZodString({ minLength: 1 })
    const expected = 'z.string().min(1)'
    expect(result).toBe(expected)
  })

  test.concurrent('generateZodString({ maxLength: 10 }) -> z.string().max(10)', () => {
    const result = generateZodString({ maxLength: 10 })
    const expected = 'z.string().max(10)'
    expect(result).toBe(expected)
  })

  test.concurrent(
    'generateZodString({ minLength: 1, maxLength: 10 }) -> z.string().min(1).max(10)',
    () => {
      const result = generateZodString({ minLength: 1, maxLength: 10 })
      const expected = 'z.string().min(1).max(10)'
      expect(result).toBe(expected)
    },
  )

  test.concurrent(`generateZodString({ format: 'email' }) -> z.string().email()`, () => {
    const result = generateZodString({ format: 'email' })
    const expected = 'z.string().email()'
    expect(result).toBe(expected)
  })

  test.concurrent(`generateZodString({ format: 'uuid' }) -> z.string().uuid()`, () => {
    const result = generateZodString({ format: 'uuid' })
    const expected = 'z.string().uuid()'
    expect(result).toBe(expected)
  })

  test.concurrent(`generateZodString({ default: 'test' }) -> z.string().default("test")`, () => {
    const result = generateZodString({
      default: 'test',
    })
    const expected = `z.string().default("test")`
    expect(result).toBe(expected)
  })

  test.concurrent('generateZodString({ nullable: true }) -> z.string().nullable()', () => {
    const result = generateZodString({
      nullable: true,
    })
    const expected = 'z.string().nullable()'
    expect(result).toBe(expected)
  })
})
