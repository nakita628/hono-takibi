import { describe, expect, test } from 'vitest'
import { generateZodObjectSchema } from './generate-zod-object-schema'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-object-schema.test.ts

describe('generateZodObjectSchema Test', () => {
  test.concurrent('generateZodObjectSchema -> z.object({name:string})', () => {
    const result = generateZodObjectSchema({
      name: 'string',
    })
    const expected = 'z.object({name:string})'
    expect(result).toBe(expected)
  })

  test.concurrent('generateZodObjectSchema -> z.object({name:string,age:number})', () => {
    const result = generateZodObjectSchema({
      name: 'string',
      age: 'number',
    })
    const expected = 'z.object({name:string,age:number})'
    expect(result).toBe(expected)
  })
})
