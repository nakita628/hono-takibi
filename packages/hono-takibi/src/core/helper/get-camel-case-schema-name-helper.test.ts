import { describe, it, expect } from 'vitest'
import { getCamelCaseSchemaNameHelper } from './get-camel-case-schema-name-helper'

// Test run
// pnpm vitest run ./src/core/helper/get-camel-case-schema-name-helper.test.ts

describe('getCamelCaseSchemaNameHelper Test', () => {
  it.concurrent(`getCamelCaseSchemaNameHelper('test') -> 'testSchema'`, () => {
    const result = getCamelCaseSchemaNameHelper('test')
    const expected = 'testSchema'
    expect(result).toBe(expected)
  })
  it.concurrent(`getCamelCaseSchemaNameHelper('Test') -> 'testSchema'`, () => {
    const result = getCamelCaseSchemaNameHelper('Test')
    const expected = 'testSchema'
    expect(result).toBe(expected)
  })
})
