import { describe, test, expect } from 'vitest'
import { getVariableNameHelper } from './get-variable-name-helper'

// Test run
// pnpm vitest run ./src/core/helper/get-variable-name-helper.test.ts

describe('getVariableNameHelper Test', () => {
  test.concurrent('getVariableNameHelper test return Test', () => {
    const result = getVariableNameHelper('test', {
      schema: {
        name: 'PascalCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    })

    const expected = 'Test'
    expect(result).toBe(expected)
  })
  test.concurrent('getVariableNameHelper test return test', () => {
    const result = getVariableNameHelper('test', {
      schema: {
        name: 'PascalCase',
        export: false,
      },
      type: {
        name: 'camelCase',
        export: false,
      },
    })

    const expected = 'test'
    expect(result).toBe(expected)
  })
  test.concurrent('getVariableNameHelper Test return Test', () => {
    const result = getVariableNameHelper('Test', {
      schema: {
        name: 'PascalCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    })

    const expected = 'Test'
    expect(result).toBe(expected)
  })
  test.concurrent('getVariableNameHelper Test return test', () => {
    const result = getVariableNameHelper('Test', {
      schema: {
        name: 'PascalCase',
        export: false,
      },
      type: {
        name: 'camelCase',
        export: false,
      },
    })

    const expected = 'test'
    expect(result).toBe(expected)
  })
})
