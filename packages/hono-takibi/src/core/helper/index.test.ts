import { describe, it, expect } from 'vitest'
import {
  getCamelCaseSchemaName,
  getPascalCaseSchemaName,
  getToSafeIdentifier,
  getVariableName,
  getVariableSchemaName,
} from '.'

// Test run
// pnpm vitest run ./src/core/helper/index.test.ts

describe('helpers barrel file exports', () => {
  it('should export getCamelCaseSchemaName', () => {
    expect(typeof getCamelCaseSchemaName).toBe('function')
  })

  it('should export getPascalCaseSchemaName', () => {
    expect(typeof getPascalCaseSchemaName).toBe('function')
  })

  it('should export getToSafeIdentifierHelper', () => {
    expect(typeof getToSafeIdentifier).toBe('function')
  })

  it('should export getVariableName', () => {
    expect(typeof getVariableName).toBe('function')
  })

  it('should export getVariableSchemaName', () => {
    expect(typeof getVariableSchemaName).toBe('function')
  })
})
