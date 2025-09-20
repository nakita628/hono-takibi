import { describe, expect, it } from 'vitest'
import {
  docs,
  propertiesSchema,
  resolveSchemasDependencies,
  wrap,
  zodToOpenAPISchema,
} from './index.js'

// Test run
// pnpm vitest run ./src/helper/index.test.ts

describe('helper barrel file exports', () => {
  it('should export docs', () => {
    expect(typeof docs).toBe('function')
  })
  it('should export propertiesSchema', () => {
    expect(typeof propertiesSchema).toBe('function')
  })
  it('should export resolveSchemasDependencies', () => {
    expect(typeof resolveSchemasDependencies).toBe('function')
  })
  it('should export wrap', () => {
    expect(typeof wrap).toBe('function')
  })
  it('should export zodToOpenAPISchema', () => {
    expect(typeof zodToOpenAPISchema).toBe('function')
  })
})
