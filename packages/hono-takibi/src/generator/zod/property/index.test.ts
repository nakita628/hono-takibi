import { describe, expect, it } from 'vitest'
import { propertiesSchema, propertySchema } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/property/index.test.ts

describe('property schema module barrel file exports', () => {
  it('should export propertiesSchema', () => {
    expect(typeof propertiesSchema).toBe('function')
  })

  it('should export propertySchema', () => {
    expect(typeof propertySchema).toBe('function')
  })
})
