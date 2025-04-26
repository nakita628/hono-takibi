import { describe, test, expect } from 'vitest'
import { regexPattern } from './regex-pattern'

// Test run
// pnpm vitest run ./src/core/text/regex-pattern.test.ts

describe('regexPattern Test', () => {
  test.concurrent(`regexPattern('^[a-z]+$') -> '/^[a-z]+$/'`, () => {
    const result = regexPattern('^[a-z]+$')
    const expected = '/^[a-z]+$/'
    expect(result).toBe(expected)
  })
  test.concurrent(
    `regexPattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$') -> '/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$/'`,
    () => {
      const result = regexPattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$')
      const expected = '/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$/'
      expect(result).toBe(expected)
    },
  )
  test.concurrent(`regexPattern('^#[0-9a-fA-F]{6}$') -> '/^#[0-9a-fA-F]{6}$/'`, () => {
    const result = regexPattern('^#[0-9a-fA-F]{6}$')
    const expected = '/^#[0-9a-fA-F]{6}$/'
    expect(result).toBe(expected)
  })
  test.concurrent(
    `regexPattern('^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$') -> '/^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$/'`,
    () => {
      const result = regexPattern('^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$')
      const expected = '/^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$/'
      expect(result).toBe(expected)
    },
  )
  test.concurrent(`regexPattern('^\\d{4}-\\d{2}-\\d{2}$') -> '/^\\d{4}-\\d{2}-\\d{2}$/'`, () => {
    const result = regexPattern('^\\d{4}-\\d{2}-\\d{2}$')
    const expected = '/^\\d{4}-\\d{2}-\\d{2}$/'
    expect(result).toBe(expected)
  })
  test.concurrent(`regexPattern('^\\d{2}/\\d{2}$') -> '/^\\d{2}\\/\\d{2}$/'`, () => {
    const result = regexPattern('^\\d{2}/\\d{2}$')
    const expected = '/^\\d{2}\\/\\d{2}$/'
    expect(result).toBe(expected)
  })
})
