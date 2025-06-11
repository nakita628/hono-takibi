import { describe, it, expect } from 'vitest'
import { regex } from './regex'

// Test run
// pnpm vitest run ./src/generator/zod/regex.test.ts

describe('regex Test', () => {
  it.concurrent(`regex('^[a-z]+$') -> .regex(/^[a-z]+$/)`, () => {
    const result = regex('^[a-z]+$')
    const expected = '.regex(/^[a-z]+$/)'
    expect(result).toBe(expected)
  })

  it.concurrent(`regex('^\\d{4}-\\d{2}-\\d{2}$') -> .regex(/^\\d{4}-\\d{2}-\\d{2}$/)`, () => {
    const result = regex('^\\d{4}-\\d{2}-\\d{2}$')
    const expected = '.regex(/^\\d{4}-\\d{2}-\\d{2}$/)'
    expect(result).toBe(expected)
  })

  it.concurrent(
    `regex('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$') -> .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$/)`,
    () => {
      const result = regex('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$')
      const expected = '.regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$/)'
      expect(result).toBe(expected)
    },
  )

  it.concurrent(`regex('^#[0-9a-fA-F]{6}$') -> .regex(/^#[0-9a-fA-F]{6}$/)`, () => {
    const result = regex('^#[0-9a-fA-F]{6}$')
    const expected = '.regex(/^#[0-9a-fA-F]{6}$/)'
    expect(result).toBe(expected)
  })

  it.concurrent(
    `regex('^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$') -> .regex(/^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$/)`,
    () => {
      const result = regex('^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$')
      const expected = '.regex(/^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$/)'
      expect(result).toBe(expected)
    },
  )

  it.concurrent(`regex('^\\d{2}/\\d{2}$') -> '.regex(/^\\d{2}\\/\\d{2}$/)'`, () => {
    const result = regex('^\\d{2}/\\d{2}$')
    const expected = '.regex(/^\\d{2}\\/\\d{2}$/)'
    expect(result).toBe(expected)
  })
})
