import { describe, it, expect } from 'vitest'
import { getVariableSchemaName } from '.'

// Test run
// pnpm vitest run ./src/core/helper/get-variable-schema-name.test.ts

describe('getVariableSchemaName Test', () => {
  it.concurrent('getVariableSchemaName test -> TestSchema', () => {
    const result = getVariableSchemaName('test', {
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
  it.concurrent('getVariableSchemaName test -> testSchema', () => {
    const result = getVariableSchemaName('test', {
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
  it.concurrent('getVariableSchemaName Test -> TestSchema', () => {
    const result = getVariableSchemaName('Test', {
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
  it.concurrent('getVariableSchemaName Test -> testSchema', () => {
    const result = getVariableSchemaName('Test', {
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
