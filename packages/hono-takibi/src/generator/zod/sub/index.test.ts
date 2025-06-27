import { describe, it, expect } from 'vitest'
import { zodSchemaFromSubSchema } from './index.js'

// Test run
// pnpm vitest run ./src/generator/zod/sub/index.test.ts

describe('zod schema module barrel file exports', () => {
  it('should export zodSchemaFromSubSchema', () => {
    expect(typeof zodSchemaFromSubSchema).toBe('function')
  })
})
