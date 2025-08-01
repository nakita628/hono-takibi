import { describe, expect, it } from 'vitest'
import {
  allOf,
  anyOf,
  docs,
  getRouteMaps,
  normalizeTypes,
  not,
  oneOf,
  resolveSchemasDependencies,
  wrap,
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
  it('should export docs', () => {
    expect(typeof docs).toBe('function')
  })
  it('should export getRouteMaps', () => {
    expect(typeof getRouteMaps).toBe('function')
  })
  it('should export normalizeTypes', () => {
    expect(typeof normalizeTypes).toBe('function')
  })
  it('should export not', () => {
    expect(typeof not).toBe('function')
  })
  it('should export oneOf', () => {
    expect(typeof oneOf).toBe('function')
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
  it('should export zodToOpenAPI', () => {
    expect(typeof zodToOpenAPI).toBe('function')
  })
})
