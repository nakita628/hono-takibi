import type { Schema } from '../../types'
import type { Config } from '../../config'
import { describe, expect, it } from 'vitest'
import { generateZodSchema } from './generate-zod-schema'
import { DEFAULT_CONFIG } from '../../data/test-data'

const generateZodSchemaTestCases: { config: Config; schema: Schema; expected: string }[] = [
  {
    schema: { type: 'string' },
    config: DEFAULT_CONFIG,
    expected: 'z.string()',
  },
  {
    schema: { type: 'number' },
    config: DEFAULT_CONFIG,
    expected: 'z.number()',
  },
  {
    schema: { type: 'integer' },
    config: DEFAULT_CONFIG,
    expected: 'z.number().int()',
  },
  {
    schema: { type: 'bigint' },
    config: DEFAULT_CONFIG,
    expected: 'z.bigint()',
  },
  {
    schema: { type: 'boolean' },
    config: DEFAULT_CONFIG,
    expected: 'z.boolean()',
  },
  {
    schema: { type: 'date' },
    config: DEFAULT_CONFIG,
    expected: 'z.date()',
  },
  {
    schema: { type: 'null' },
    config: DEFAULT_CONFIG,
    expected: 'z.null()',
  },
  {
    schema: { type: 'any' },
    config: DEFAULT_CONFIG,
    expected: 'z.any()',
  },
  {
    schema: { type: 'unknown' },
    config: DEFAULT_CONFIG,
    expected: 'z.unknown()',
  },
  {
    schema: { type: 'string', minLength: 1, maxLength: 10 },
    config: DEFAULT_CONFIG,
    expected: 'z.string().min(1).max(10)',
  },
  {
    schema: { type: 'string', format: 'email' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().email()',
  },
  {
    schema: { type: 'string', format: 'uri' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().url()',
  },
  {
    schema: { type: 'string', format: 'uuid' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().uuid()',
  },
  {
    schema: { type: 'string', format: 'cuid' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().cuid()',
  },
  {
    schema: { type: 'string', format: 'cuid2' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().cuid2()',
  },
  {
    schema: { type: 'string', format: 'ulid' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().ulid()',
  },
  {
    schema: { type: 'string', pattern: '^[a-zA-Z]+$' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().regex(/^[a-zA-Z]+$/)',
  },
  {
    schema: { type: 'string', format: 'date-time' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().datetime()',
  },
  {
    schema: { type: 'string', format: 'ip' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().ip()',
  },
]

describe('generateZodSchema', () => {
  it.concurrent.each(generateZodSchemaTestCases)(
    'generateZodSchema($schema) -> $expected',
    async ({ schema, config, expected }) => {
      const result = generateZodSchema(config, schema)
      expect(result).toBe(expected)
    },
  )
})
