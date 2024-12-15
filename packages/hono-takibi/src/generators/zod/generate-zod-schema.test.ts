import { describe, expect, it } from 'vitest'
import { generateZodSchema } from './generate-zod-schema'
import { Schema } from '../../types'

const generateZodSchemaTestCases: { input: Schema; expected: string }[] = [
  {
    input: { type: 'string' },
    expected: 'z.string()',
  },
  {
    input: { type: 'number' },
    expected: 'z.number()',
  },
  {
    input: { type: 'integer' },
    expected: 'z.number().int()',
  },
  {
    input: { type: 'bigint' },
    expected: 'z.bigint()',
  },
  {
    input: { type: 'boolean' },
    expected: 'z.boolean()',
  },
  {
    input: { type: 'date' },
    expected: 'z.date()',
  },
  {
    input: { type: 'null' },
    expected: 'z.null()',
  },
  {
    input: { type: 'any' },
    expected: 'z.any()',
  },
  {
    input: { type: 'unknown' },
    expected: 'z.unknown()',
  },
  {
    input: { type: 'string', minLength: 1, maxLength: 10 },
    expected: 'z.string().min(1).max(10)',
  },
  {
    input: { type: 'string', format: 'email' },
    expected: 'z.string().email()',
  },
  {
    input: { type: 'string', format: 'uri' },
    expected: 'z.string().url()',
  },
  {
    input: { type: 'string', format: 'uuid' },
    expected: 'z.string().uuid()',
  },
  {
    input: { type: 'string', format: 'cuid' },
    expected: 'z.string().cuid()',
  },
  {
    input: { type: 'string', format: 'cuid2' },
    expected: 'z.string().cuid2()',
  },
  {
    input: { type: 'string', format: 'ulid' },
    expected: 'z.string().ulid()',
  },
  {
    input: { type: 'string', pattern: '^[a-zA-Z]+$' },
    expected: 'z.string().regex(/^[a-zA-Z]+$/)',
  },
  {
    input: { type: 'string', format: 'date-time' },
    expected: 'z.string().datetime()',
  },
  {
    input: { type: 'string', format: 'ip' },
    expected: 'z.string().ip()',
  },
]

describe('generateZodSchema', () => {
  it.concurrent.each(generateZodSchemaTestCases)(
    'generateZodSchema($input) -> $expected',
    async ({ input, expected }) => {
      const result = generateZodSchema(input)
      expect(result).toBe(expected)
    },
  )
})
