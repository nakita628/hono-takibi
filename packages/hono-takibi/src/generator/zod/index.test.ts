import { describe, it, expect } from 'vitest'
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
    const expected = 'z.number().int()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.bigint()', () => {
    const result = zod({ type: 'bigint' })
    const expected = 'z.bigint()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.boolean()', () => {
    const result = zod({ type: 'boolean' })
    const expected = 'z.boolean()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.date()', () => {
    const result = zod({ type: 'date' })
    const expected = 'z.date()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.null()', () => {
    const result = zod({ type: 'null' })
    const expected = 'z.null()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.any()', () => {
    const result = zod({ type: 'any' })
    const expected = 'z.any()'
    expect(result).toBe(expected)
  })
  it.concurrent('z.unknown()', () => {
    const result = zod({ type: 'unknown' })
    const expected = 'z.unknown()'
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
    'z.array(z.object({id:z.number().int().min(0),name:z.string(),active:z.boolean().optional()}))',
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
        'z.array(z.object({id:z.number().int().min(0),name:z.string(),active:z.boolean().optional()}))'
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
})
