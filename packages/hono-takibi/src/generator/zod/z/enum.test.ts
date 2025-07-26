import { describe, expect, it } from 'vitest'
import { _enum } from './enum'

// Test run
// pnpm vitest run ./src/generator/zod/z/enum.test.ts

describe('_enum Test', () => {
  it.concurrent('_enum -> z.enum(["a","b","c"])', () => {
    const result = _enum({
      type: 'string',
      enum: ['a', 'b', 'c'],
    })

    const expected = 'z.enum(["a","b","c"])'
    expect(result).toBe(expected)
  })

  it.concurrent(`_enum -> z.literal('test')`, () => {
    const result = _enum({
      type: 'string',
      enum: ['test'],
    })

    const expected = `z.literal('test')`
    expect(result).toBe(expected)
  })

  // number
  it.concurrent('_enum -> z.literal(1) for number single', () => {
    const result = _enum({ type: 'number', enum: [1] })
    expect(result).toBe('z.literal(1)')
  })

  it.concurrent('_enum -> z.union([z.literal(1),z.literal(2)]) for number multiple', () => {
    const result = _enum({ type: 'number', enum: [1, 2] })
    expect(result).toBe('z.union([z.literal(1),z.literal(2)])')
  })

  // integer
  it.concurrent('_enum -> z.literal(42) for integer single', () => {
    const result = _enum({ type: 'integer', enum: [42] })
    expect(result).toBe('z.literal(42)')
  })

  it.concurrent('_enum -> z.union(...) for integer multiple', () => {
    const result = _enum({ type: 'integer', enum: [1, 2, 3] })
    expect(result).toBe('z.union([z.literal(1),z.literal(2),z.literal(3)])')
  })

  // boolean
  it.concurrent('_enum -> z.literal(true) for boolean single', () => {
    const result = _enum({ type: 'boolean', enum: [true] })
    expect(result).toBe('z.literal(true)')
  })

  it.concurrent('_enum -> z.union(...) for boolean multiple', () => {
    const result = _enum({ type: 'boolean', enum: [true, false] })
    expect(result).toBe('z.union([z.literal(true),z.literal(false)])')
  })

  // array
  it.concurrent('_enum -> z.tuple([...]) for array of one tuple', () => {
    const result = _enum({ type: 'array', enum: [[1, 2]] })
    expect(result).toBe('z.tuple([z.literal(1), z.literal(2)])')
  })

  it.concurrent('_enum -> z.union([...]) of tuples for array of tuples', () => {
    const result = _enum({
      type: 'array',
      enum: [
        [1, 2],
        [3, 4],
      ],
    })
    expect(result).toBe(
      'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])])',
    )
  })

  it.concurrent('_enum -> z.union([...]) for array of primitives', () => {
    const result = _enum({ type: 'array', enum: [1, 2, 3] })
    expect(result).toBe('z.union([z.literal(1),z.literal(2),z.literal(3)])')
  })

  // fallback: mixed
  it.concurrent('_enum -> z.union([mixed]) (number, string, null)', () => {
    const result = _enum({ enum: [1, 'two', null] })
    expect(result).toBe("z.union([z.literal(1),z.literal('two'),z.null()])")
  })

  // fallback: single null
  it.concurrent('_enum -> z.literal(null)', () => {
    const result = _enum({ enum: [null] })
    expect(result).toBe('z.literal(null)')
  })

  // fallback: string literal when no type but one string
  it.concurrent('_enum -> z.literal("abc") without type', () => {
    const result = _enum({ enum: ['abc'] })
    expect(result).toBe(`z.literal('abc')`)
  })

  // fallback: z.enum when type is omitted but all strings
  it.concurrent('_enum -> z.enum(["x","y"]) without type', () => {
    const result = _enum({ enum: ['x', 'y'] })
    expect(result).toBe(`z.enum(["x","y"])`)
  })
})
