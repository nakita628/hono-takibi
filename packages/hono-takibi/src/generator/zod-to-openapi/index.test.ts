import { describe, it, expect } from 'vitest'
import { zodToOpenAPI } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-to-openapi/index.test.ts

describe('zod module barrel file exports', () => {
  it('should export zodToOpenAPI', () => {
    expect(typeof zodToOpenAPI).toBe('function')
  })
})
