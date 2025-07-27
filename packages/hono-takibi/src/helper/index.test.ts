import { describe, expect, it } from 'vitest'
import {
  allOf,
  anyOf,
  maybeApplyNullability,
  oneOf,
  pickTypes,
  resolveSchemasDependencies,
  zodToOpenAPI,
  zodToOpenAPISchema,
} from './index.js'

// Test run
// pnpm vitest run ./src/helper/index.test.ts

describe('helper barrel file exports', () => {
  it('should export allOf', () => {
    expect(typeof allOf).toBe('function')
  })
  it('should export anyOf', () => {
    expect(typeof anyOf).toBe('function')
  })
  it('should export maybeApplyNullability', () => {
    expect(typeof maybeApplyNullability).toBe('function')
  })
  it('should export oneOf', () => {
    expect(typeof oneOf).toBe('function')
  })
  it('should export pickTypes', () => {
    expect(typeof pickTypes).toBe('function')
  })
  it('should export resolveSchemasDependencies', () => {
    expect(typeof resolveSchemasDependencies).toBe('function')
  })
  it('should export zodToOpenAPISchema', () => {
    expect(typeof zodToOpenAPISchema).toBe('function')
  })
  it('should export zodToOpenAPI', () => {
    expect(typeof zodToOpenAPI).toBe('function')
  })
})
