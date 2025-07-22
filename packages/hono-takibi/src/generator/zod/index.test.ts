import { describe, expect, it } from 'vitest'
import { zod } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/index.test.ts

describe('zod', () => {
  it.concurrent('z.string()', () => {
    const result = zod({ type: 'string' })
    const expected = 'z.string()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.number()', () => {
    const result = zod({ type: 'number' })
    const expected = 'z.number()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.number().int()', () => {
    const result = zod({ type: 'integer' })
    const expected = 'z.int()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.boolean()', () => {
    const result = zod({ type: 'boolean' })
    const expected = 'z.boolean()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.null()', () => {
    const result = zod({ type: 'null' })
    const expected = 'z.null()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.string().min(1).max(10)', () => {
    const result = zod({ type: 'string', minLength: 1, maxLength: 10 })
    const expected = 'z.string().min(1).max(10)'
    expect(result).toBe(expected)
  })
  it.concurrent('z.email()', () => {
    const result = zod({ type: 'string', format: 'email' })
    const expected = 'z.email()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.url()', () => {
    const result = zod({ type: 'string', format: 'uri' })
    const expected = 'z.url()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.uuid()', () => {
    const result = zod({ type: 'string', format: 'uuid' })
    const expected = 'z.uuid()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.cuid()', () => {
    const result = zod({ type: 'string', format: 'cuid' })
    const expected = 'z.cuid()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.cuid2()', () => {
    const result = zod({ type: 'string', format: 'cuid2' })
    const expected = 'z.cuid2()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.ulid()', () => {
    const result = zod({ type: 'string', format: 'ulid' })
    const expected = 'z.ulid()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.string().regex(/^[a-zA-Z]+$/)', () => {
    const result = zod({ type: 'string', pattern: '^[a-zA-Z]+$' })
    const expected = 'z.string().regex(/^[a-zA-Z]+$/)'
    expect(result).toBe(expected)
  })
  it.concurrent('z.iso().datetime()', () => {
    const result = zod({ type: 'string', format: 'date-time' })
    const expected = 'z.iso.datetime()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.ipv4()', () => {
    const result = zod({ type: 'string', format: 'ipv4' })
    const expected = 'z.ipv4()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.string().length(5)', () => {
    const result = zod({ type: 'string', minLength: 5, maxLength: 5 })
    const expected = 'z.string().length(5)'
    expect(result).toBe(expected)
  })
  it.concurrent('z.array(z.string())', () => {
    const result = zod({
      type: 'array',
      items: { type: 'string' },
    })
    const expected = 'z.array(z.string())'
    expect(result).toBe(expected)
  })
  it.concurrent('z.array(z.number())', () => {
    const result = zod({
      type: 'array',
      items: { type: 'number' },
    })
    const expected = 'z.array(z.number())'
    expect(result).toBe(expected)
  })
  it.concurrent('z.array(z.boolean())', () => {
    const result = zod({
      type: 'array',
      items: { type: 'boolean' },
    })
    const expected = 'z.array(z.boolean())'
    expect(result).toBe(expected)
  })
  it.concurrent('z.array(z.array(z.array(z.number())))', () => {
    const result = zod({
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'array',
          items: { type: 'number' },
        },
      },
    })
    const expected = 'z.array(z.array(z.array(z.number())))'
    expect(result).toBe(expected)
  })
  it.concurrent('z.array(z.union([z.string(),z.number(),z.boolean()]))', () => {
    const result = zod({
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'number',
          },
          {
            type: 'boolean',
          },
        ],
      },
    })
    const expected = 'z.array(z.union([z.string(),z.number(),z.boolean()]))'
    expect(result).toBe(expected)
  })
  it.concurrent(
    'z.array(z.object({id:z.int().min(0),name:z.string(),active:z.boolean().optional()}))',
    () => {
      const result = zod({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              minimum: 0,
              exclusiveMinimum: true,
            },
            name: {
              type: 'string',
            },
            active: {
              type: 'boolean',
            },
          },
          required: ['id', 'name'],
        },
      })
      const expected =
        'z.array(z.object({id:z.int().min(0),name:z.string(),active:z.boolean().optional()}))'
      expect(result).toBe(expected)
    },
  )
  it.concurrent('z.array(z.string()).length(5)', () => {
    const result = zod({
      type: 'array',
      items: { type: 'string' },
      minLength: 5,
      maxLength: 5,
    })
    const expected = 'z.array(z.string()).length(5)'
    expect(result).toBe(expected)
  })
  it.concurrent('reference: Test', () => {
    const result = zod({
      $ref: '#/components/schemas/Test',
    })
    const expected = 'TestSchema'
    expect(result).toBe(expected)
  })

  it.concurrent('z.string().nullable()', () => {
    const result = zod({ type: 'string', nullable: true })
    const expected = 'z.string().nullable()'
    expect(result).toBe(expected)
  })

  it.concurrent('z.int().nullable()', () => {
    const result = zod({ type: ['integer', 'null'] })
    const expected = 'z.int().nullable()'
    expect(result).toBe(expected)
  })

  it.concurrent('z.literal("fixed")', () => {
    const result = zod({ type: 'string', const: 'fixed' })
    const expected = 'z.literal("fixed")'
    expect(result).toBe(expected)
  })

  // exclusiveMinimum
  it.concurrent('z.number().gt(1)', () => {
    const result = zod({ type: 'number', exclusiveMinimum: 1 })
    const expected = 'z.number().gt(1)'
    expect(result).toBe(expected)
  })

  // exclusiveMaximum
  it.concurrent('z.number().lt(100)', () => {
    expect(zod({ type: 'number', exclusiveMaximum: 100 })).toBe('z.number().lt(100)')
  })

  // int64
  it.concurrent('int64 minimum rendered as bigint literal', () => {
    expect(zod({ type: 'integer', format: 'int64', minimum: 0 })).toBe('z.int64().min(0n)')
  })

  // bigint
  it.concurrent('bigint boundaries wrapped in BigInt()', () => {
    expect(
      zod({
        type: 'integer',
        format: 'bigint',
        minimum: -1e38,
        maximum: 1e38,
      }),
    ).toBe('z.bigint().min(BigInt(-1e+38)).max(BigInt(1e+38))')
  })

  it.concurrent('array with minItems / maxItems', () => {
    expect(zod({ type: 'array', items: { type: 'string' }, minItems: 2, maxItems: 4 })).toBe(
      'z.array(z.string()).min(2).max(4)',
    )
  })

  it.concurrent('array with minItems === maxItems → length()', () => {
    expect(zod({ type: 'array', items: { type: 'number' }, minItems: 3, maxItems: 3 })).toBe(
      'z.array(z.number()).length(3)',
    )
  })

  it.concurrent('enum with nullable flag', () => {
    expect(zod({ enum: ['A', 'B'], type: 'string', nullable: true })).toBe(
      'z.enum(["A","B"]).nullable()',
    )
  })
})
