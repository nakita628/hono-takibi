import { describe, it, expect } from 'vitest'
import { getRefSchemaName } from '.'

// Test run
// pnpm vitest run ./src/core/schema/references/get-ref-schema-name.test.ts

describe('getRefSchemaName', () => {
  it.concurrent('getRefSchemaName #/components/schemas/Test -> Test', () => {
    const result = getRefSchemaName({ $ref: '#/components/schemas/Test' })

    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })
  it.concurrent('should throw error when $ref is empty', () => {
    expect(() => getRefSchemaName({ $ref: '' })).toThrow('refName is not found')
  })
})
