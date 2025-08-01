import { describe, expect, it } from 'vitest'
import { _enum } from './enum'

// Test run
// pnpm vitest run ./src/generator/zod/z/enum.test.ts

describe('_enum', () => {
  it.concurrent('z.enum(["a","b","c"])', () => {
    expect(
      _enum({
        enum: ['a', 'b', 'c'],
      }),
    ).toBe('z.enum(["a","b","c"])')
  })
  it.concurrent('z.enum(["a","b","c"]).nullable()', () => {
    expect(
      _enum({
        enum: ['a', 'b', 'c'],
        type: ['null'],
      }),
    ).toBe('z.enum(["a","b","c"]).nullable()')
  })

  it.concurrent("z.literal('test')", () => {
    expect(
      _enum({
        enum: ['test'],
      }),
    ).toBe("z.literal('test')")
  })
  // number
  it.concurrent('z.literal(1)', () => {
    expect(_enum({ enum: [1] })).toBe('z.literal(1)')
  })
  it.concurrent('z.union([z.literal(1),z.literal(2)])', () => {
    expect(_enum({ enum: [1, 2] })).toBe('z.union([z.literal(1),z.literal(2)])')
  })
  // integer
  it.concurrent('z.literal(42)', () => {
    expect(_enum({ enum: [42] })).toBe('z.literal(42)')
  })
  it.concurrent('z.union([z.literal(1),z.literal(2),z.literal(3)])', () => {
    expect(_enum({ enum: [1, 2, 3] })).toBe('z.union([z.literal(1),z.literal(2),z.literal(3)])')
  })
  // boolean
  it.concurrent('z.literal(true)', () => {
    expect(_enum({ enum: [true] })).toBe('z.literal(true)')
  })
  it.concurrent('z.union([z.literal(true),z.literal(false)])', () => {
    expect(_enum({ enum: [true, false] })).toBe('z.union([z.literal(true),z.literal(false)])')
  })
  // array
  it.concurrent('z.tuple([z.literal(1), z.literal(2)])', () => {
    expect(_enum({ type: 'array', enum: [[1, 2]] })).toBe('z.tuple([z.literal(1), z.literal(2)])')
  })
  it.concurrent(
    'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])])',
    () => {
      expect(
        _enum({
          type: 'array',
          enum: [
            [1, 2],
            [3, 4],
          ],
        }),
      ).toBe('z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])])')
    },
  )
  it.concurrent('z.union([z.literal(1),z.literal(2),z.literal(3)])', () => {
    expect(_enum({ enum: [1, 2, 3] })).toBe('z.union([z.literal(1),z.literal(2),z.literal(3)])')
  })
  // fallback: mixed
  it.concurrent("z.union([z.literal(1),z.literal('two'),z.null()])", () => {
    expect(_enum({ enum: [1, 'two', null] })).toBe(
      "z.union([z.literal(1),z.literal('two'),z.null()])",
    )
  })
  // fallback: single null
  it.concurrent('z.literal(null)', () => {
    expect(_enum({ enum: [null] })).toBe('z.literal(null)')
  })
  // fallback: string literal when no type but one string
  it.concurrent(`z.literal('abc')`, () => {
    expect(_enum({ enum: ['abc'] })).toBe(`z.literal('abc')`)
  })
  // fallback: z.enum when type is omitted but all strings
  it.concurrent('z.enum(["x","y"])', () => {
    expect(_enum({ enum: ['x', 'y'] })).toBe(`z.enum(["x","y"])`)
  })
})
