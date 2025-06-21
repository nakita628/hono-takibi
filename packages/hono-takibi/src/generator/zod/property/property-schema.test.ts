import { describe, it, expect } from 'vitest'
import { propertySchema } from './property-schema'

// Test run
// pnpm vitest run ./src/generator/zod/property/property-schema.test.ts

describe('propertySchema', () => {
  it.concurrent('propertySchema -> TestSchema', () => {
    const result = propertySchema(
      {
        $ref: '#/components/schemas/Test',
      },
    )

    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.string()', () => {
    const result = propertySchema(
      {
        type: 'string',
      },
    )

    const expected = 'z.string()'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.number()', () => {
    const result = propertySchema(
      {
        type: 'number',
      },
    )

    const expected = 'z.number()'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.any', () => {
    const result = propertySchema(
      {
        $ref: '',
      },
    )

    const expected = 'z.any()'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.array(z.any())', () => {
    const result = propertySchema(
      {
        type: 'array',
        items: {
          $ref: '',
        },
      },
    )

    const expected = 'z.array(z.any())'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.array(TestSchema)', () => {
    const result = propertySchema(
      {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Test',
        },
      },
    )

    const expected = 'z.array(TestSchema)'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.email()', () => {
    const result = propertySchema(
      { type: 'string', format: 'email' },
    )

    const expected = 'z.email()'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.uuid()', () => {
    const result = propertySchema(
      { type: 'string', format: 'uuid' },
    )

    const expected = 'z.uuid()'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.iso.datetime()', () => {
    const result = propertySchema(
      { type: 'string', format: 'date-time' },
    )

    const expected = 'z.iso.datetime()'
    expect(result).toBe(expected)
  })

  it.concurrent('propertySchema -> z.enum(["a","b","c"])', () => {
    const result = propertySchema(
      { type: 'string', enum: ['a', 'b', 'c'] },
    )

    const expected = 'z.enum(["a","b","c"])'
    expect(result).toBe(expected)
  })
})
