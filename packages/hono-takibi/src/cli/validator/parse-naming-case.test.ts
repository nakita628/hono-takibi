import { describe, it, expect } from 'vitest'
import { parseNamingCase } from '.'

// Test run
// pnpm vitest run ./src/cli/validator/parse-naming-case.test.ts

describe('parseNamingCaseCase', () => {
  it.concurrent('returns ok when given PascalCase', () => {
    const result = parseNamingCase('PascalCase')
    const expected = { ok: true, value: 'PascalCase' }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('returns ok when given camelCase', () => {
    const result = parseNamingCase('camelCase')
    const expected = { ok: true, value: 'camelCase' }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('defaults to PascalCase when input is undefined', () => {
    const result = parseNamingCase(undefined)
    const expected = { ok: true, value: undefined }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('returns err when given an invalid case', () => {
    const result = parseNamingCase('snake_case')
    const expected = {
      ok: false,
      error: '--naming-case must be PascalCase or camelCase (got snake_case)',
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('returns err when given an empty string', () => {
    const result = parseNamingCase('')
    const expected = {
      ok: false,
      error: '--naming-case must be PascalCase or camelCase (got )',
    }
    expect(result).toStrictEqual(expected)
  })
})
