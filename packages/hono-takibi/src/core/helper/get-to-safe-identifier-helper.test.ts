import { describe, it, expect } from 'vitest'
import { getToSafeIdentifierHelper } from './get-to-safe-identifier-helper'

// Test run
// pnpm vitest run ./src/core/helper/get-to-safe-identifier-helper.test.ts
describe('getToSafeIdentifierHelper Test', () => {
  it.concurrent(`getToSafeIdentifierHelper(' - ') -> '_'`, () => {
    const result = getToSafeIdentifierHelper(' - ')
    const expected = '_'
    expect(result).toBe(expected)
  })
  it.concurrent(`getToSafeIdentifierHelper('Test - Schema') -> 'Test_Schema'`, () => {
    const result = getToSafeIdentifierHelper('Test - Schema')
    const expected = 'Test_Schema'
    expect(result).toBe(expected)
  })
  it.concurrent(`getToSafeIdentifierHelper('TestSchema') -> 'TestSchema'`, () => {
    const result = getToSafeIdentifierHelper('TestSchema')
    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })
})
