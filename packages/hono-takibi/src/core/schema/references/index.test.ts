import { describe, it, expect } from 'vitest'
import {
  extractRefs,
  findReferences,
  getRefName,
  getRefSchemaName,
  resolveSchemasDependencies,
  traverseSchemaDependencies,
  traverseSchema,
} from './index.js'

// Test run
// pnpm vitest run ./src/core/schema/references/index.test.ts

describe('schema module barrel file exports', () => {
  it('should export extractRefs', () => {
    expect(typeof extractRefs).toBe('function')
  })

  it('should export findReferences', () => {
    expect(typeof findReferences).toBe('function')
  })

  it('should export getRefName', () => {
    expect(typeof getRefName).toBe('function')
  })

  it('should export getRefSchemaName', () => {
    expect(typeof getRefSchemaName).toBe('function')
  })

  it('should export resolveSchemasDependencies', () => {
    expect(typeof resolveSchemasDependencies).toBe('function')
  })

  it('should export traverseSchemaDependencies', () => {
    expect(typeof traverseSchemaDependencies).toBe('function')
  })

  it('should export traverseSchema', () => {
    expect(typeof traverseSchema).toBe('function')
  })
})
