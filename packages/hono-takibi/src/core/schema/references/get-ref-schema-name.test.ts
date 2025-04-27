import { describe, test, expect } from 'vitest'
import { getRefSchemaName } from './get-ref-schema-name'

// Test run
// pnpm vitest run ./src/core/schema/references/get-ref-schema-name.test.ts

describe('getRefSchemaName Test', () => {
  test.concurrent('getRefSchemaName #/components/schemas/Test -> Test', () => {
    const result = getRefSchemaName(
      { $ref: '#/components/schemas/Test' },
      {
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      },
    )

    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })
  test.concurrent('should throw error when $ref is empty', () => {
    expect(() =>
      getRefSchemaName(
        { $ref: '' },
        {
          schema: {
            name: 'PascalCase',
            export: false,
          },
          type: {
            name: 'PascalCase',
            export: false,
          },
        },
      ),
    ).toThrow('refName is not found')
  })
})
