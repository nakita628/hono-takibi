import { describe, it, expect } from 'vitest'
import { getCamelCaseSchemaName } from '.'

// Test run
// pnpm vitest run ./src/core/helper/get-camel-case-schema-name.test.ts

describe('getCamelCaseSchemaName Test', () => {
  it.concurrent(`getCamelCaseSchemaName('test') -> 'testSchema'`, () => {
    const result = getCamelCaseSchemaName('test')
    const expected = 'testSchema'
    expect(result).toBe(expected)
  })
  it.concurrent(`getCamelCaseSchemaName('Test') -> 'testSchema'`, () => {
    const result = getCamelCaseSchemaName('Test')
    const expected = 'testSchema'
    expect(result).toBe(expected)
  })
})
