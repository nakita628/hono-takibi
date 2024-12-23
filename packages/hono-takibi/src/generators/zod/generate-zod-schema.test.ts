import { describe, expect, it } from 'vitest'
import type { Schema } from '../../types'
import { generateZodSchema } from './generate-zod-schema'

const generateZodSchemaTestCases: { schema: Schema; expected: string }[] = [
  {
    schema: { type: 'string' },
    expected: 'z.string()',
  },
  {
    schema: { type: 'number' },
    expected: 'z.number()',
  },
  {
    schema: { type: 'integer' },
    expected: 'z.number().int()',
  },
  {
    schema: { type: 'bigint' },
    expected: 'z.bigint()',
  },
  {
    schema: { type: 'boolean' },
    expected: 'z.boolean()',
  },
  {
    schema: { type: 'date' },
    expected: 'z.date()',
  },
  {
    schema: { type: 'null' },
    expected: 'z.null()',
  },
  {
    schema: { type: 'any' },
    expected: 'z.any()',
  },
  {
    schema: { type: 'unknown' },
    expected: 'z.unknown()',
  },
  {
    schema: { type: 'string', minLength: 1, maxLength: 10 },
    expected: 'z.string().min(1).max(10)',
  },
  {
    schema: { type: 'string', format: 'email' },
    expected: 'z.string().email()',
  },
  {
    schema: { type: 'string', format: 'uri' },
    expected: 'z.string().url()',
  },
  {
    schema: { type: 'string', format: 'uuid' },
    expected: 'z.string().uuid()',
  },
  {
    schema: { type: 'string', format: 'cuid' },
    expected: 'z.string().cuid()',
  },
  {
    schema: { type: 'string', format: 'cuid2' },
    expected: 'z.string().cuid2()',
  },
  {
    schema: { type: 'string', format: 'ulid' },
    expected: 'z.string().ulid()',
  },
  {
    schema: { type: 'string', pattern: '^[a-zA-Z]+$' },
    expected: 'z.string().regex(/^[a-zA-Z]+$/)',
  },
  {
    schema: { type: 'string', format: 'date-time' },
    expected: 'z.string().datetime()',
  },
  {
    schema: { type: 'string', format: 'ip' },
    expected: 'z.string().ip()',
  },
]

describe('generateZodSchema', () => {
  it.concurrent.each(generateZodSchemaTestCases)(
    'generateZodSchema($schema) -> $expected',
    async ({ schema, expected }) => {
      const result = generateZodSchema(schema)
      expect(result).toBe(expected)
    },
  )
})
