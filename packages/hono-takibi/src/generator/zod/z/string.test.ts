import { describe, it, expect } from 'vitest'
import { string } from './string'

// Test run
// pnpm vitest run ./src/generator/zod/z/string.test.ts

describe('string Test', () => {
  it.concurrent('string({}) -> z.string()', () => {
    const result = string({})
    const expected = 'z.string()'
    expect(result).toBe(expected)
  })

  it.concurrent(`string({ pattern: '^[a-z]+$' }) -> z.string().regex(/^[a-z]+$/)`, () => {
    const result = string({ pattern: '^[a-z]+$' })
    const expected = 'z.string().regex(/^[a-z]+$/)'
    expect(result).toBe(expected)
  })

  it.concurrent('string({ minLength: 1 }) -> z.string().min(1)', () => {
    const result = string({ minLength: 1 })
    const expected = 'z.string().min(1)'
    expect(result).toBe(expected)
  })

  it.concurrent('string({ maxLength: 10 }) -> z.string().max(10)', () => {
    const result = string({ maxLength: 10 })
    const expected = 'z.string().max(10)'
    expect(result).toBe(expected)
  })

  it.concurrent('string({ minLength: 1, maxLength: 10 }) -> z.string().min(1).max(10)', () => {
    const result = string({ minLength: 1, maxLength: 10 })
    const expected = 'z.string().min(1).max(10)'
    expect(result).toBe(expected)
  })

  it.concurrent(`string({ format: 'email' }) -> z.email()`, () => {
    const result = string({ format: 'email' })
    const expected = 'z.email()'
    expect(result).toBe(expected)
  })

  it.concurrent(`string({ format: 'uuid' }) -> z.uuid()`, () => {
    const result = string({ format: 'uuid' })
    const expected = 'z.uuid()'
    expect(result).toBe(expected)
  })

  it.concurrent(`string({ default: 'test' }) -> z.string().default("test")`, () => {
    const result = string({
      default: 'test',
    })
    const expected = `z.string().default("test")`
    expect(result).toBe(expected)
  })

  it.concurrent('string({ format: "jwt" }) -> z.jwt()', () => {
    const result = string({ format: 'jwt' })
    const expected = 'z.jwt()'
    expect(result).toBe(expected)
  })
})
