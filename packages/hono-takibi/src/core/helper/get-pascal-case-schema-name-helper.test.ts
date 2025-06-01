import { describe, it, expect } from 'vitest'
import { getPascalCaseSchemaNameHelper } from './get-pascal-case-schema-name-helper'

// Test run
// pnpm vitest run ./src/core/helper/get-pascal-case-schema-name-helper.test.ts

describe('getPascalCaseSchemaNameHelper Test', () => {
  it.concurrent(`getPascalCaseSchemaNameHelper('test') -> 'testSchema'`, () => {
    const result = getPascalCaseSchemaNameHelper('test')
    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })
  it.concurrent(`getPascalCaseSchemaNameHelper('Test') -> 'TestSchema'`, () => {
    const result = getPascalCaseSchemaNameHelper('Test')
    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })
})
