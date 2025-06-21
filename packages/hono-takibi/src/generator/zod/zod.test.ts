import { describe, it, expect } from 'vitest'
import { zod } from '.'
import type { Schema } from '../../openapi/index.js'

// Test run
// pnpm vitest run ./src/generator/zod/zod.test.ts

describe('zod', () => {
  it.concurrent('z.string()', () => {
    const schema: Schema = { type: 'string' }
    const result = zod(schema)
    const expected = 'z.string()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.number()', () => {
    const schema: Schema = { type: 'number' }
    const result = zod(schema)
    const expected = 'z.number()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.number().int()', () => {
    const schema: Schema = { type: 'integer' }
    const result = zod(schema)
    const expected = 'z.number().int()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.bigint()', () => {
    const schema: Schema = { type: 'bigint' }
    const result = zod(schema)
    const expected = 'z.bigint()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.boolean()', () => {
    const schema: Schema = { type: 'boolean' }
    const result = zod(schema)
    const expected = 'z.boolean()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.date()', () => {
    const schema: Schema = { type: 'date' }
    const result = zod(schema)
    const expected = 'z.date()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.null()', () => {
    const schema: Schema = { type: 'null' }
    const result = zod(schema)
    const expected = 'z.null()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.any()', () => {
    const schema: Schema = { type: 'any' }
    const result = zod(schema)
    const expected = 'z.any()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.unknown()', () => {
    const schema: Schema = { type: 'unknown' }
    const result = zod(schema)
    const expected = 'z.unknown()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.string().min(1).max(10)', () => {
    const schema: Schema = { type: 'string', minLength: 1, maxLength: 10 }
    const result = zod(schema)
    const expected = 'z.string().min(1).max(10)'
    expect(result).toBe(expected)
  })
  it.concurrent('z.email()', () => {
    const schema: Schema = { type: 'string', format: 'email' }
    const result = zod(schema)
    const expected = 'z.email()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.string().url()', () => {
    const schema: Schema = { type: 'string', format: 'uri' }
    const result = zod(schema)
    const expected = 'z.url()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.string().uuid()', () => {
    const schema: Schema = { type: 'string', format: 'uuid' }
    const result = zod(schema)
    const expected = 'z.uuid()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.cuid()', () => {
    const schema: Schema = { type: 'string', format: 'cuid' }
    const result = zod(schema)
    const expected = 'z.cuid()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.cuid2()', () => {
    const schema: Schema = { type: 'string', format: 'cuid2' }
    const result = zod(schema)
    const expected = 'z.cuid2()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.ulid()', () => {
    const schema: Schema = { type: 'string', format: 'ulid' }
    const result = zod(schema)
    const expected = 'z.ulid()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.string().regex(/^[a-zA-Z]+$/)', () => {
    const schema: Schema = { type: 'string', pattern: '^[a-zA-Z]+$' }
    const result = zod(schema)
    const expected = 'z.string().regex(/^[a-zA-Z]+$/)'
    expect(result).toBe(expected)
  })
  it.concurrent('z.iso().datetime()', () => {
    const schema: Schema = { type: 'string', format: 'date-time' }
    const result = zod(schema)
    const expected = 'z.iso.datetime()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.ipv4()', () => {
    const schema: Schema = { type: 'string', format: 'ipv4' }
    const result = zod(schema)
    const expected = 'z.ipv4()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.string().length(5)', () => {
    const schema: Schema = { type: 'string', minLength: 5, maxLength: 5 }
    const result = zod(schema)
    const expected = 'z.string().length(5)'
    expect(result).toBe(expected)
  })
  it.concurrent('z.array(z.string())', () => {
    const schema: Schema = {
      type: 'array',
      items: { type: 'string' },
    }
    const result = zod(schema)
    const expected = 'z.array(z.string())'
    expect(result).toBe(expected)
  })
  it.concurrent('z.array(z.number())', () => {
    const schema: Schema = {
      type: 'array',
      items: { type: 'number' },
    }
    const result = zod(schema)
    const expected = 'z.array(z.number())'
    expect(result).toBe(expected)
  })
  it.concurrent('z.array(z.boolean())', () => {
    const schema: Schema = {
      type: 'array',
      items: { type: 'boolean' },
    }
    const result = zod(schema)
    const expected = 'z.array(z.boolean())'
    expect(result).toBe(expected)
  })
  it.concurrent('z.array(z.array(z.array(z.number())))', () => {
    const schema: Schema = {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'array',
          items: { type: 'number' },
        },
      },
    }
    const result = zod(schema)
    const expected = 'z.array(z.array(z.array(z.number())))'
    expect(result).toBe(expected)
  })
  it.concurrent('z.array(z.union([z.string(),z.number(),z.boolean()]))', () => {
    const schema: Schema = {
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
    }
    const result = zod(schema)
    const expected = 'z.array(z.union([z.string(),z.number(),z.boolean()]))'
    expect(result).toBe(expected)
  })
  it.concurrent(
    'z.array(z.object({id:z.number().int().min(0),name:z.string(),active:z.boolean().optional()}))',
    () => {
      const schema: Schema = {
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
      }
      const result = zod(schema)
      const expected =
        'z.array(z.object({id:z.number().int().min(0),name:z.string(),active:z.boolean().optional()}))'
      expect(result).toBe(expected)
    },
  )
  it.concurrent('z.array(z.string()).length(5)', () => {
    const schema: Schema = {
      type: 'array',
      items: { type: 'string' },
      minLength: 5,
      maxLength: 5,
    }
    const result = zod(schema)
    const expected = 'z.array(z.string()).length(5)'
    expect(result).toBe(expected)
  })
})
