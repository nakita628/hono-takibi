import { describe, test, expect } from 'vitest'
import { getConfig } from './index'

// Test run
// pnpm vitest run ./src/config/index.test.ts

describe('getConfig Test', () => {
  test('getConfig', () => {
    const result = getConfig()

    const expected = {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: false },
    }

    expect(result).toStrictEqual(expected)
  })
})
