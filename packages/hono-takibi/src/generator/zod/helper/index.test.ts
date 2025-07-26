import { describe, expect, it } from 'vitest'
import {
  arrayReferenceSchema,
  propertiesSchema,
  propertySchema,
  referenceSchema,
  zodSchemaFromSubSchema,
} from './index.js'

// Test run
// pnpm vitest run ./src/generator/zod/helper/index.test.ts

describe('property schema module barrel file exports', () => {
  it('should export propertiesSchema', () => {
    expect(typeof propertiesSchema).toBe('function')
  })

  it('should export propertySchema', () => {
    expect(typeof propertySchema).toBe('function')
  })
  it('should export arrayReferenceSchema', () => {
    expect(typeof arrayReferenceSchema).toBe('function')
  })
  it('should export referenceSchema', () => {
    expect(typeof referenceSchema).toBe('function')
  })
  it('should export zodSchemaFromSubSchema', () => {
    expect(typeof zodSchemaFromSubSchema).toBe('function')
  })
})
