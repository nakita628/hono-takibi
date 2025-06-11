import { describe, it, expect } from 'vitest'
import { getPascalCaseSchemaName } from '.'

// Test run
// pnpm vitest run ./src/core/helper/get-pascal-case-schema-name.test.ts

describe('getPascalCaseSchemaName Test', () => {
  it.concurrent(`getPascalCaseSchemaName('test') -> 'testSchema'`, () => {
    const result = getPascalCaseSchemaName('test')
    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })
  it.concurrent(`getPascalCaseSchemaName('Test') -> 'TestSchema'`, () => {
    const result = getPascalCaseSchemaName('Test')
    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })
})
