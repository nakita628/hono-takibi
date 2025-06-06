import { describe, it, expect } from 'vitest'
import { getConfig } from './index'

// Test run
// pnpm vitest run ./src/config/index.test.ts

describe('getConfig Test', () => {
  it.concurrent('getConfig', () => {
    const result = getConfig()

    const expected = {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: false },
    }

    expect(result).toStrictEqual(expected)
  })
})
