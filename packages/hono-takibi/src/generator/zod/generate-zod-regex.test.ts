import { describe, expect, test } from 'vitest'
import { generateZodRegex } from './generate-zod-regex'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-regex.test.ts

describe('generateZodRegex Test', () => {
  test.concurrent(`generateZodRegex('^[a-z]+$') -> .regex(/^[a-z]+$/)`, () => {
    const result = generateZodRegex('^[a-z]+$')
    const expected = '.regex(/^[a-z]+$/)'
    expect(result).toBe(expected)
  })

  test.concurrent(
    `generateZodRegex('^\\d{4}-\\d{2}-\\d{2}$') -> .regex(/^\\d{4}-\\d{2}-\\d{2}$/)`,
    () => {
      const result = generateZodRegex('^\\d{4}-\\d{2}-\\d{2}$')
      const expected = '.regex(/^\\d{4}-\\d{2}-\\d{2}$/)'
      expect(result).toBe(expected)
    },
  )

  test.concurrent(
    `generateZodRegex('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$') -> .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$/)`,
    () => {
      const result = generateZodRegex('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$')
      const expected = '.regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$/)'
      expect(result).toBe(expected)
    },
  )

  test.concurrent(`generateZodRegex('^#[0-9a-fA-F]{6}$') -> .regex(/^#[0-9a-fA-F]{6}$/)`, () => {
    const result = generateZodRegex('^#[0-9a-fA-F]{6}$')
    const expected = '.regex(/^#[0-9a-fA-F]{6}$/)'
    expect(result).toBe(expected)
  })

  test.concurrent(
    `generateZodRegex('^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$') -> .regex(/^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$/)`,
    () => {
      const result = generateZodRegex(
        '^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$',
      )
      const expected = '.regex(/^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$/)'
      expect(result).toBe(expected)
    },
  )

  test.concurrent(`generateZodRegex('^\\d{2}/\\d{2}$') -> '.regex(/^\\d{2}\\/\\d{2}$/)'`, () => {
    const result = generateZodRegex('^\\d{2}/\\d{2}$')
    const expected = '.regex(/^\\d{2}\\/\\d{2}$/)'
    expect(result).toBe(expected)
  })
})
