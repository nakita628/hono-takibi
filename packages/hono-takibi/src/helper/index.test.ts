import { describe, expect, it } from 'vitest'
import { propertiesSchema, resolveSchemasDependencies, wrap } from './index.js'

// Test run
// pnpm vitest run ./src/helper/index.test.ts

describe('helper barrel file exports', () => {
  it('should export propertiesSchema', () => {
    expect(typeof propertiesSchema).toBe('function')
  })
  it('should export resolveSchemasDependencies', () => {
    expect(typeof resolveSchemasDependencies).toBe('function')
  })
  it('should export wrap', () => {
    expect(typeof wrap).toBe('function')
  })
})
