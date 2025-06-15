import { describe, it, expect } from 'vitest'
import { getVariableName } from '.'

// Test run
// pnpm vitest run ./src/core/helper/get-variable-name.test.ts

describe('getVariableName Test', () => {
  it.concurrent(`getVariableName('test', 'PascalCase') -> 'Test'`, () => {
    expect(getVariableName('test', 'PascalCase')).toBe('Test')
  })
  it.concurrent(`getVariableName('test', 'camelCase') -> 'test'`, () => {
    expect(getVariableName('test', 'camelCase')).toBe('test')
  })
  it.concurrent(`getVariableName('Test', 'PascalCase') -> 'Test'`, () => {
    expect(getVariableName('Test', 'PascalCase')).toBe('Test')
  })
  it.concurrent(`getVariableName('Test', 'camelCase') -> 'test`, () => {
    expect(getVariableName('Test', 'camelCase')).toBe('test')
  })
})
