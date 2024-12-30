import { describe, expect, it } from 'vitest'
import { generatePropertySchema } from './generate-zod-property-schema'
import type { Schema } from '../../types'

const generatePropertySchemaTestCases: { schema: Schema; expected: string }[] = [
  {
    schema: {
      $ref: '#/components/schemas/User',
    },
    expected: 'userSchema',
  },
  {
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Post',
      },
    },
    expected: 'z.array(postSchema)',
  },
  {
    schema: {
      type: 'string',
    },
    expected: 'z.string()',
  },
  {
    schema: {
      type: 'number',
    },
    expected: 'z.number()',
  },
  {
    schema: {
      $ref: '',
    },
    expected: 'z.any()',
  },
  {
    schema: {
      type: 'array',
      items: {
        $ref: '',
      },
    },
    expected: 'z.array(z.any())',
  },
  {
    schema: {},
    expected: 'z.any()',
  },
  // with example
  // number
  {
    schema: { type: 'integer', format: 'int64', example: 1 },
    expected: 'z.number().int().openapi({example:1})',
  },
  // string
  {
    schema: { type: 'string', example: 'Dogs' },
    expected: 'z.string().openapi({example:"Dogs"})',
  },
  {
    schema: { type: 'string', example: 'theUser' },
    expected: 'z.string().openapi({example:"theUser"})',
  },
  // name
  {
    schema: { type: 'string', example: 'John' },
    expected: 'z.string().openapi({example:"John"})',
  },
  {
    schema: { type: 'string', example: 'James' },
    expected: 'z.string().openapi({example:"James"})',
  },
  // email
  {
    schema: { type: 'string', example: 'john@email.com' },
    expected: 'z.string().openapi({example:"john@email.com"})',
  },
  // zip
  {
    schema: { type: 'string', example: '12345' },
    expected: 'z.string().openapi({example:"12345"})',
  },
  // pet name
  {
    schema: { type: 'string', example: 'doggie' },
    expected: 'z.string().openapi({example:"doggie"})',
  },
  // enum
  {
    schema: { type: 'string', enum: ['placed', 'approved', 'delivered'], example: 'approved' },
    expected: 'z.enum(["placed","approved","delivered"]).openapi({example:"approved"})',
  },
  // date-time
  {
    schema: { type: 'string', format: 'date-time', example: '2023-01-15T09:30:00.000Z' },
    expected: 'z.string().datetime().openapi({example:"2023-01-15T09:30:00.000Z"})',
  },
  // uuid
  {
    schema: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' },
    expected:
      'z.string().uuid().openapi({example:"123e4567-e89b-12d3-a456-426614174000"})',
  },
]

describe('generatePropertySchema', () => {
  it.concurrent.each(generatePropertySchemaTestCases)(
    'generatePropertySchema($schema) -> $expected',
    ({ schema, expected }) => {
      const result = generatePropertySchema(schema)
      expect(result).toBe(expected)
    },
  )
})
