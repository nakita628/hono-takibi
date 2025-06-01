import { describe, it, expect } from 'vitest'
import { getVariableSchemaNameHelper } from './get-variable-schema-name-helper'

// Test run
// pnpm vitest run ./src/core/helper/get-variable-schema-name-helper.test.ts

describe('getVariableSchemaNameHelper Test', () => {
  it.concurrent('getVariableSchemaNameHelper test -> TestSchema', () => {
    const result = getVariableSchemaNameHelper('test', {
      schema: {
        name: 'PascalCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    })

    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })
  it.concurrent('getVariableSchemaNameHelper test -> testSchema', () => {
    const result = getVariableSchemaNameHelper('test', {
      schema: {
        name: 'camelCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    })

    const expected = 'testSchema'
    expect(result).toBe(expected)
  })
  it.concurrent('getVariableSchemaNameHelper Test -> TestSchema', () => {
    const result = getVariableSchemaNameHelper('Test', {
      schema: {
        name: 'PascalCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    })

    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })
  it.concurrent('getVariableSchemaNameHelper Test -> testSchema', () => {
    const result = getVariableSchemaNameHelper('Test', {
      schema: {
        name: 'camelCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    })

    const expected = 'testSchema'
    expect(result).toBe(expected)
  })
})
