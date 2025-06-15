import { describe, it, expect } from 'vitest'
import { getVariableSchemaName } from '.'

// Test run
// pnpm vitest run ./src/core/helper/get-variable-schema-name.test.ts

describe('getVariableSchemaName', () => {
  it.concurrent(`getVariableSchemaName('test', 'PascalCase') -> 'TestSchema'`, () => {
    expect(getVariableSchemaName('test', 'PascalCase')).toBe('TestSchema')
  })
  it.concurrent(`getVariableSchemaName('test', 'camelCase') -> testSchema`, () => {
    expect(getVariableSchemaName('test', 'camelCase')).toBe('testSchema')
  })
  it.concurrent(`getVariableSchemaName('Test', 'PascalCase') -> 'TestSchema'`, () => {
    expect(getVariableSchemaName('Test', 'PascalCase')).toBe('TestSchema')
  })
  it.concurrent(`getVariableSchemaName('Test', 'camelCase') -> 'testSchema`, () => {
    expect(getVariableSchemaName('Test', 'camelCase')).toBe('testSchema')
  })
})
