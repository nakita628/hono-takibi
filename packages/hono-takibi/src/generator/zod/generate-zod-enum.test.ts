import type { Schema } from '../../types'
import { describe, expect, test } from 'vitest'
import { generateZodEnum } from './generate-zod-enum'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod-enum.test.ts

describe('generateZodEnum Test', () => {
  test.concurrent('generateZodEnum -> z.enum(["a","b","c"])', () => {
    const result = generateZodEnum({
      type: 'string',
      enum: ['a', 'b', 'c'],
    })

    const expected = 'z.enum(["a","b","c"])'
    expect(result).toBe(expected)
  })

  test.concurrent('generateZodEnum -> z.enum(["a","b","c"])', () => {
    const result = generateZodEnum({
      type: 'string',
      enum: ['a', 'b', 'c'],
    })

    const expected = 'z.enum(["a","b","c"])'
    expect(result).toBe(expected)
  })

  test.concurrent(`generateZodEnum -> z.literal('test')`, () => {
    const result = generateZodEnum({
      type: 'string',
      enum: ['test'],
    })

    const expected = `z.literal('test')`
    expect(result).toBe(expected)
  })

  test.concurrent('should throw an error when schema is null', () => {
    // biome-ignore lint:
    const schema = null as any
    expect(() => generateZodEnum(schema)).toThrow('Cannot read properties of null')
  })

  test.concurrent('should throw an error when enum is not defined', () => {
    const schema: Schema = {
      type: 'string',
    }
    expect(() => generateZodEnum(schema)).toThrow('enum is not found')
  })

  test.concurrent('should throw an error when enum is null', () => {
    const schema: Schema = {
      type: 'string',
      // biome-ignore lint:
      enum: null as any,
    } as Schema
    expect(() => generateZodEnum(schema)).toThrow('enum is not found')
  })

  test.concurrent('should throw an error when enum is undefined', () => {
    const schema: Schema = {
      type: 'string',
      enum: undefined,
    }
    expect(() => generateZodEnum(schema)).toThrow('enum is not found')
  })
})
