import { describe, it, expect } from 'vitest'
import { getVariableName } from '.'

// Test run
// pnpm vitest run ./src/core/helper/get-variable-name.test.ts

describe('getVariableName Test', () => {
  it.concurrent('getVariableName test return Test', () => {
    const result = getVariableName('test', {
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
  it.concurrent('getVariableName test return test', () => {
    const result = getVariableName('test', {
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
  it.concurrent('getVariableName Test return Test', () => {
    const result = getVariableName('Test', {
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
  it.concurrent('getVariableName Test return test', () => {
    const result = getVariableName('Test', {
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
