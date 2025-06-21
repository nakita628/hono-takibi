import { describe, it, expect } from 'vitest'
import { getToSafeIdentifier } from '.'

// Test run
// pnpm vitest run ./src/core/utils/get-to-safe-identifier.test.ts

describe('getToSafeIdentifier', () => {
  it('should return the string as-is if it is a valid identifier', () => {
    expect(getToSafeIdentifier('validName')).toBe('validName')
    expect(getToSafeIdentifier('_underscore')).toBe('_underscore')
    expect(getToSafeIdentifier('$dollar')).toBe('$dollar')
    expect(getToSafeIdentifier('camelCase123')).toBe('camelCase123')
  })

  it('should quote the string if it contains invalid characters', () => {
    expect(getToSafeIdentifier('invalid-name')).toBe('"invalid-name"')
    expect(getToSafeIdentifier('123startWithNumber')).toBe('"123startWithNumber"')
    expect(getToSafeIdentifier('has space')).toBe('"has space"')
    expect(getToSafeIdentifier('has.dot')).toBe('"has.dot"')
    expect(getToSafeIdentifier('hyphen-ated')).toBe('"hyphen-ated"')
  })

  it('should quote reserved keywords', () => {
    expect(getToSafeIdentifier('class')).toBe('class')
    expect(getToSafeIdentifier('function')).toBe('function')
  })

  it('should handle edge cases correctly', () => {
    expect(getToSafeIdentifier('')).toBe('""')
    expect(getToSafeIdentifier(' ')).toBe('" "')
    expect(getToSafeIdentifier('-')).toBe('"-"')
  })
})
