import { describe, it, expect } from 'vitest'
import { isYamlOrJson, isTs } from '.'

// Test run
// pnpm vitest run ./src/cli/validator/index.test.ts

describe('helpers barrel file exports', () => {
  it.concurrent('should export isYamlOrJson', () => {
    expect(typeof isYamlOrJson).toBe('function')
  })
  it.concurrent('should export isTs', () => {
    expect(typeof isTs).toBe('function')
  })
})
