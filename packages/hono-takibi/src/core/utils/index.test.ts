import { describe, it, expect } from 'vitest'
import {
  capitalize,
  escapeStringLiteral,
  getToSafeIdentifier,
  regexPattern,
  removeZodPrefix,
  sanitizeIdentifier,
  stripMaxIfLtExist,
  stripMinIfgtExist,
  stripMinMaxExist,
  maybeApplyNullability,
} from '.'

// Test run
// pnpm vitest run ./src/core/utils/index.test.ts

describe('string-utils barrel file exports', () => {
  it('should export capitalize', () => {
    expect(typeof capitalize).toBe('function')
  })
  it('should export escapeStringLiteral', () => {
    expect(typeof escapeStringLiteral).toBe('function')
  })
  it('should export getToSafeIdentifier', () => {
    expect(typeof getToSafeIdentifier).toBe('function')
  })
  it('should export regexPattern', () => {
    expect(typeof regexPattern).toBe('function')
  })
  it('should export removeZodPrefix', () => {
    expect(typeof removeZodPrefix).toBe('function')
  })
  it('should export sanitizeIdentifier', () => {
    expect(typeof sanitizeIdentifier).toBe('function')
  })
  it('should export stripMaxIfLtExist', () => {
    expect(typeof stripMaxIfLtExist).toBe('function')
  })
  it('should export stripMinIfgTExist', () => {
    expect(typeof stripMinIfgtExist).toBe('function')
  })
  it('should export stripMinMaxExist', () => {
    expect(typeof stripMinMaxExist).toBe('function')
  })
  it('should export maybeApplyNullability', () => {
    expect(typeof maybeApplyNullability).toBe('function')
  })
})
