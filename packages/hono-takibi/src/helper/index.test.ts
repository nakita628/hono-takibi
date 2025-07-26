import { describe, expect, it } from 'vitest'
import { maybeApplyNullability } from './maybe-apply-nullability.js'
import { pickTypes } from './pick-types.js'
import { zodToOpenAPI } from './zod-to-openapi.js'
import { zodToOpenAPISchema } from './zod-to-openapi-schema.js'

// Test run
// pnpm vitest run ./src/helper/index.test.ts

describe('helper barrel file exports', () => {
  it('should export maybeApplyNullability', () => {
    expect(typeof maybeApplyNullability).toBe('function')
  })
  it('should export pickTypes', () => {
    expect(typeof pickTypes).toBe('function')
  })
  it('should export zodToOpenAPISchema', () => {
    expect(typeof zodToOpenAPISchema).toBe('function')
  })
  it('should export zodToOpenAPI', () => {
    expect(typeof zodToOpenAPI).toBe('function')
  })
})
