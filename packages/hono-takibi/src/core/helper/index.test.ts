import { describe, it, expect } from 'vitest'
import {
  getCamelCaseSchemaNameHelper,
  getPascalCaseSchemaNameHelper,
  getToSafeIdentifierHelper,
  getVariableNameHelper,
  getVariableSchemaNameHelper,
} from '.'

// Test run
// pnpm vitest run ./src/core/helper/index.test.ts

describe('helpers barrel file exports', () => {
  it('should export getCamelCaseSchemaNameHelper', () => {
    expect(typeof getCamelCaseSchemaNameHelper).toBe('function')
  })

  it('should export getPascalCaseSchemaNameHelper', () => {
    expect(typeof getPascalCaseSchemaNameHelper).toBe('function')
  })

  it('should export getToSafeIdentifierHelper', () => {
    expect(typeof getToSafeIdentifierHelper).toBe('function')
  })

  it('should export getVariableNameHelper', () => {
    expect(typeof getVariableNameHelper).toBe('function')
  })

  it('should export getVariableSchemaNameHelper', () => {
    expect(typeof getVariableSchemaNameHelper).toBe('function')
  })
})
