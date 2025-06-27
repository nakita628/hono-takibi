import { describe, it, expect } from 'vitest'
import { zodToOpenAPI, zodToOpenAPISchema } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-to-openapi/index.test.ts

describe('zod module barrel file exports', () => {
  it('should export zodToOpenAPI', () => {
    expect(typeof zodToOpenAPI).toBe('function')
  })
  it('should export zodToOpenAPISchema', () => {
    expect(typeof zodToOpenAPISchema).toBe('function')
  })
})
