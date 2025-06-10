import { describe, it, expect } from 'vitest'
import { getToSafeIdentifier } from '.'

// Test run
// pnpm vitest run ./src/core/helper/get-to-safe-identifier.test.ts
describe('getToSafeIdentifier Test', () => {
  it.concurrent(`getToSafeIdentifier(' - ') -> '_'`, () => {
    const result = getToSafeIdentifier(' - ')
    const expected = '_'
    expect(result).toBe(expected)
  })
  it.concurrent(`getToSafeIdentifierHelper('Test - Schema') -> 'Test_Schema'`, () => {
    const result = getToSafeIdentifier('Test - Schema')
    const expected = 'Test_Schema'
    expect(result).toBe(expected)
  })
  it.concurrent(`getToSafeIdentifierHelper('TestSchema') -> 'TestSchema'`, () => {
    const result = getToSafeIdentifier('TestSchema')
    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })
})
