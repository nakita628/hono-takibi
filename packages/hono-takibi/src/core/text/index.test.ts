import { describe, it, expect } from 'vitest'
import { capitalize, decapitalize, escapeStr, regexPattern, removeZodPrefix } from './'

// Test run
// pnpm vitest run ./src/core/text/index.test.ts

describe('string-utils barrel file exports', () => {
  it('should export capitalize', () => {
    expect(typeof capitalize).toBe('function')
  })

  it('should export decapitalize', () => {
    expect(typeof decapitalize).toBe('function')
  })

  it('should export escapeStr', () => {
    expect(typeof escapeStr).toBe('function')
  })

  it('should export regexPattern', () => {
    expect(typeof regexPattern).toBe('function')
  })

  it('should export removeZodPrefix', () => {
    expect(typeof removeZodPrefix).toBe('function')
  })
})
