import { describe, it, expect } from 'vitest'
import { parseNaming } from './'

// Test run
// pnpm vitest run ./src/cli/validator/parse-naming.test.ts

describe('parseNaming', () => {
  it('returns ok when given PascalCase', () => {
    const result = parseNaming('PascalCase')
    const expected = { ok: true, value: 'PascalCase' }
    expect(result).toStrictEqual(expected)
  })

  it('returns ok when given camelCase', () => {
    const result = parseNaming('camelCase')
    const expected = { ok: true, value: 'camelCase' }
    expect(result).toStrictEqual(expected)
  })

  it('defaults to PascalCase when input is undefined', () => {
    const result = parseNaming(undefined)
    const expected = { ok: true, value: 'PascalCase' }
    expect(result).toStrictEqual(expected)
  })

  it('returns err when given an invalid case', () => {
    const result = parseNaming('snake_case')
    const expected = {
      ok: false,
      error: '--naming-case must be PascalCase or camelCase (got snake_case)',
    }
    expect(result).toStrictEqual(expected)
  })

  it('returns err when given an empty string', () => {
    const result = parseNaming('')
    const expected = {
      ok: false,
      error: '--naming-case must be PascalCase or camelCase (got )',
    }
    expect(result).toStrictEqual(expected)
  })
})
