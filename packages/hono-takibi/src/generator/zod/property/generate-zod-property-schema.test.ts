import { describe, expect, it } from 'vitest'
import { generatePropertySchema } from './generate-zod-property-schema'
import { DEFAULT_CONFIG } from '../../../config'
import { PASCAL_CASE_CONFIG } from '../../../../data/test-data'
import type { Schema } from '../../../type'
import type { Config} from '../../../config'

const generatePropertySchemaTestCases: {
  schema: Schema
  config: Config
  expected: string
}[] = [
  {
    schema: {
      $ref: '#/components/schemas/User',
    },
    config: DEFAULT_CONFIG,
    expected: 'UserSchema',
  },
  {
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Post',
      },
    },
    config: DEFAULT_CONFIG,
    expected: 'z.array(PostSchema)',
  },
  {
    schema: {
      type: 'string',
    },
    config: DEFAULT_CONFIG,
    expected: 'z.string()',
  },
  {
    schema: {
      type: 'number',
    },
    config: DEFAULT_CONFIG,
    expected: 'z.number()',
  },
  {
    schema: {
      $ref: '',
    },
    config: DEFAULT_CONFIG,
    expected: 'z.any()',
  },
  {
    schema: {
      type: 'array',
      items: {
        $ref: '',
      },
    },
    config: DEFAULT_CONFIG,
    expected: 'z.array(z.any())',
  },
  {
    schema: {},
    config: DEFAULT_CONFIG,
    expected: 'z.any()',
  },
  // with example
  // number
  {
    schema: { type: 'integer', format: 'int64', example: 1 },
    config: DEFAULT_CONFIG,
    expected: 'z.number().int().openapi({example:1})',
  },
  // string
  {
    schema: { type: 'string', example: 'Dogs' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().openapi({example:"Dogs"})',
  },
  {
    schema: { type: 'string', example: 'theUser' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().openapi({example:"theUser"})',
  },
  // name
  {
    schema: { type: 'string', example: 'John' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().openapi({example:"John"})',
  },
  {
    schema: { type: 'string', example: 'James' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().openapi({example:"James"})',
  },
  // email
  {
    schema: { type: 'string', example: 'john@email.com' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().openapi({example:"john@email.com"})',
  },
  // zip
  {
    schema: { type: 'string', example: '12345' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().openapi({example:"12345"})',
  },
  // pet name
  {
    schema: { type: 'string', example: 'doggie' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().openapi({example:"doggie"})',
  },
  // enum
  {
    schema: { type: 'string', enum: ['placed', 'approved', 'delivered'], example: 'approved' },
    config: DEFAULT_CONFIG,
    expected: 'z.enum(["placed","approved","delivered"]).openapi({example:"approved"})',
  },
  // date-time
  {
    schema: { type: 'string', format: 'date-time', example: '2023-01-15T09:30:00.000Z' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().datetime().openapi({example:"2023-01-15T09:30:00.000Z"})',
  },
  // uuid
  {
    schema: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' },
    config: DEFAULT_CONFIG,
    expected: 'z.string().uuid().openapi({example:"123e4567-e89b-12d3-a456-426614174000"})',
  },
  // PascalCase
  {
    schema: {
      $ref: '#/components/schemas/User',
    },
    config: PASCAL_CASE_CONFIG,
    expected: 'UserSchema',
  },
  {
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Post',
      },
    },
    config: PASCAL_CASE_CONFIG,
    expected: 'z.array(PostSchema)',
  },
]

describe('generatePropertySchema', () => {
  it.concurrent.each(generatePropertySchemaTestCases)(
    'generatePropertySchema($schema, $config) -> $expected',
    ({ schema, config, expected }) => {
      const result = generatePropertySchema(schema, config)
      expect(result).toBe(expected)
    },
  )
})
