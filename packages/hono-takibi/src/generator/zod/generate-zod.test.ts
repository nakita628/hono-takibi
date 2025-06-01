import { describe, it, expect } from 'vitest'
import { generateZod } from './generate-zod'
import type { Schema } from '../../types'
import type { Config } from '../../config'

// Test run
// pnpm vitest run ./src/generator/zod/generate-zod.test.ts

const DEFAULT_CONFIG: Config = {
  schema: {
    name: 'PascalCase',
    export: false,
  },
  type: {
    name: 'PascalCase',
    export: false,
  },
}

const generateZodTestCases: { config: Config; schema: Schema; expected: string }[] = [
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
  {
    schema: { type: 'string', minLength: 5, maxLength: 5 },
    config: DEFAULT_CONFIG,
    expected: 'z.string().length(5)',
  },
  {
    schema: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    config: DEFAULT_CONFIG,
    expected: 'z.array(z.string())',
  },
  {
    schema: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
    config: DEFAULT_CONFIG,
    expected: 'z.array(z.number())',
  },
  {
    schema: {
      type: 'array',
      items: {
        type: 'boolean',
      },
    },
    config: DEFAULT_CONFIG,
    expected: 'z.array(z.boolean())',
  },
  {
    schema: {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
    },
    config: DEFAULT_CONFIG,
    expected: 'z.array(z.array(z.array(z.number())))',
  },
  {
    schema: {
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
    },
    config: DEFAULT_CONFIG,
    expected: 'z.array(z.union([z.string(),z.number(),z.boolean()]))',
  },
  {
    schema: {
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
    },
    config: DEFAULT_CONFIG,
    expected:
      'z.array(z.object({id:z.number().int().min(0),name:z.string(),active:z.boolean().optional()}))',
  },
  {
    schema: {
      type: 'array',
      items: {
        type: 'string',
      },
      minLength: 5,
      maxLength: 5,
    },
    config: DEFAULT_CONFIG,
    expected: 'z.array(z.string()).length(5)',
  },
]

describe('generateZod', () => {
  it.concurrent.each(generateZodTestCases)(
    'generateZod($schema) -> $expected',
    async ({ schema, config, expected }) => {
      const result = generateZod(config, schema)
      expect(result).toBe(expected)
    },
  )
})
