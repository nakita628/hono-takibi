import { describe, expect, it } from 'vitest'
import { propertiesSchema } from './index.js'

// Test run
// pnpm vitest run ./src/generator/zod/helper/index.test.ts

describe('property schema module barrel file exports', () => {
  it('should export propertiesSchema', () => {
    expect(typeof propertiesSchema).toBe('function')
  })
})
