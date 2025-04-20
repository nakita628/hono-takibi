import { describe, test, expect, it } from 'vitest'
import { getRefName } from './get-ref-name'

// Test run
// pnpm vitest run ./src/core/schema/references/get-ref-name.test.ts

describe('getRefName Test', () => {
  test.concurrent(`getRefName('#/components/schemas/Test') -> 'Test'`, () => {
    const result = getRefName('#/components/schemas/Test')
    const expected = 'Test'
    expect(result).toBe(expected)
  })
})
