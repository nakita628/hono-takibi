import { describe, it, expect } from 'vitest'
import { getRefName } from '.'

// Test run
// pnpm vitest run ./src/core/schema/references/get-ref-name.test.ts

describe('getRefName Test', () => {
  it.concurrent(`getRefName('#/components/schemas/Test') -> 'Test'`, () => {
    const result = getRefName('#/components/schemas/Test')
    const expected = 'Test'
    expect(result).toBe(expected)
  })
})
