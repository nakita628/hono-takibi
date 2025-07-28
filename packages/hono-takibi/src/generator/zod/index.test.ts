import { describe, expect, it } from 'vitest'
import { zod } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/index.test.ts

describe('zod', () => {
  it.concurrent('z.string()', () => {
    expect(zod({ type: 'string' })).toBe('z.string()')
  })
  it.concurrent('z.number()', () => {
    expect(zod({ type: 'number' })).toBe('z.number()')
  })
  it.concurrent('z.number().int()', () => {
    expect(zod({ type: 'integer' })).toBe('z.int()')
  })
  it.concurrent('z.boolean()', () => {
    expect(zod({ type: 'boolean' })).toBe('z.boolean()')
  })
  it.concurrent('z.null()', () => {
    expect(zod({ type: 'null' })).toBe('z.null()')
  })
  it.concurrent('z.string().min(1).max(10)', () => {
    expect(zod({ type: 'string', minLength: 1, maxLength: 10 })).toBe('z.string().min(1).max(10)')
  })
  it.concurrent('z.string().default("test")', () => {
    expect(zod({ type: 'string', default: 'test' })).toBe('z.string().default("test")')
  })
  it.concurrent('z.string().nullable()', () => {
    expect(zod({ type: 'string', nullable: true })).toBe('z.string().nullable()')
  })
  it.concurrent('z.length(5)', () => {
    expect(zod({ type: 'string', minLength: 5, maxLength: 5 })).toBe('z.string().length(5)')
  })
  it.concurrent('z.email()', () => {
    expect(zod({ type: 'string', format: 'email' })).toBe('z.email()')
  })
  it.concurrent('z.url()', () => {
    expect(zod({ type: 'string', format: 'uri' })).toBe('z.url()')
  })
  it.concurrent('z.uuid()', () => {
    expect(zod({ type: 'string', format: 'uuid' })).toBe('z.uuid()')
  })
  it.concurrent('z.cuid()', () => {
    expect(zod({ type: 'string', format: 'cuid' })).toBe('z.cuid()')
  })
  it.concurrent('z.cuid2()', () => {
    expect(zod({ type: 'string', format: 'cuid2' })).toBe('z.cuid2()')
  })
  it.concurrent('z.ulid()', () => {
    expect(zod({ type: 'string', format: 'ulid' })).toBe('z.ulid()')
  })
  it.concurrent('z.string().regex(/^[a-zA-Z]+$/)', () => {
    expect(zod({ type: 'string', pattern: '^[a-zA-Z]+$' })).toBe('z.string().regex(/^[a-zA-Z]+$/)')
  })
  it.concurrent('z.iso().datetime()', () => {
    expect(zod({ type: 'string', format: 'date-time' })).toBe('z.iso.datetime()')
  })
  it.concurrent('z.ipv4()', () => {
    expect(zod({ type: 'string', format: 'ipv4' })).toBe('z.ipv4()')
  })
  it.concurrent('z.string().length(5)', () => {
    expect(zod({ type: 'string', minLength: 5, maxLength: 5 })).toBe('z.string().length(5)')
  })
  it.concurrent('z.array(z.string())', () => {
    expect(
      zod({
        type: 'array',
        items: { type: 'string' },
      }),
    ).toBe('z.array(z.string())')
  })
  it.concurrent('z.array(z.number())', () => {
    expect(
      zod({
        type: 'array',
        items: { type: 'number' },
      }),
    ).toBe('z.array(z.number())')
  })
  it.concurrent('z.array(z.boolean())', () => {
    expect(
      zod({
        type: 'array',
        items: { type: 'boolean' },
      }),
    ).toBe('z.array(z.boolean())')
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
    expect(
      zod({
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
      }),
    ).toBe('z.array(z.union([z.string(),z.number(),z.boolean()]))')
  })
  it.concurrent(
    'z.array(z.object({id:z.int().min(0).positive(),name:z.string(),active:z.boolean().optional()}))',
    () => {
      expect(
        zod({
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
        }),
      ).toBe(
        'z.array(z.object({id:z.int().positive(),name:z.string(),active:z.boolean().optional()}))',
      )
    },
  )
  it.concurrent('z.array(z.string()).length(5)', () => {
    expect(
      zod({
        type: 'array',
        items: { type: 'string' },
        minItems: 5,
        maxItems: 5,
      }),
    ).toBe('z.array(z.string()).length(5)')
  })
  it.concurrent('reference: Test', () => {
    expect(
      zod({
        $ref: '#/components/schemas/Test',
      }),
    ).toBe('TestSchema')
  })

  it.concurrent('z.string().nullable()', () => {
    expect(zod({ type: 'string', nullable: true })).toBe('z.string().nullable()')
  })

  it.concurrent('z.int().nullable()', () => {
    expect(zod({ type: ['integer', 'null'] })).toBe('z.int().nullable()')
  })

  it.concurrent('z.literal("fixed")', () => {
    expect(zod({ type: 'string', const: 'fixed' })).toBe('z.literal("fixed")')
  })

  // exclusiveMinimum
  it.concurrent('z.number().gt(1)', () => {
    expect(zod({ type: 'number', exclusiveMinimum: 1 })).toBe('z.number().gt(1)')
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
  // not
  it.concurrent('not schema', () => {
    const result = zod({
      not: {
        type: 'string',
      },
    })
    const expected = 'z.unknown()'
    expect(result).toBe(expected)
  })
})
