import { describe, expect, it } from 'vitest'
import { schema } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/z/schema.test.ts

describe('schema Test', () => {
  it.concurrent('schema -> z.object({name:string})', () => {
    const result = schema({
      name: 'string',
    })
    const expected = 'z.object({name:string})'
    expect(result).toBe(expected)
  })

  it.concurrent('schema -> z.object({name:string,age:number})', () => {
    const result = schema({
      name: 'string',
      age: 'number',
    })
    const expected = 'z.object({name:string,age:number})'
    expect(result).toBe(expected)
  })
})
