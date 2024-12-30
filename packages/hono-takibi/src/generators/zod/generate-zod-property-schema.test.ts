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

// with example
describe('generatePropertySchema with example', () => {
  // number
  it.concurrent(
    'generatePropertySchema({type: "integer", format: "int64", example: 1}) -> z.number().int().optional().openapi({ example: 1 })',
    () => {
      const schema: Schema = { type: 'integer', format: 'int64', example: 1 }
      const result = generatePropertySchema(schema)
      const expected = 'z.number().int().optional().openapi({ example: 1 })'
      expect(result).toBe(expected)
    },
  )

  // 文字列のケース
  it.concurrent(
    'generatePropertySchema({type: "string", example: "Dogs"}) -> z.string().optional().openapi({ example: "Dogs" })',
    () => {
      const schema: Schema = { type: 'string', example: 'Dogs' }
      const result = generatePropertySchema(schema)
      const expected = 'z.string().optional().openapi({ example: "Dogs" })'
      expect(result).toBe(expected)
    },
  )

  it.concurrent(
    'generatePropertySchema({type: "string", example: "theUser"}) -> z.string().optional().openapi({ example: "theUser" })',
    () => {
      const schema: Schema = { type: 'string', example: 'theUser' }
      const result = generatePropertySchema(schema)
      const expected = 'z.string().optional().openapi({ example: "theUser" })'
      expect(result).toBe(expected)
    },
  )

  // name
  it.concurrent(
    'generatePropertySchema({type: "string", example: "John"}) -> z.string().optional().openapi({ example: "John" })',
    () => {
      const schema: Schema = { type: 'string', example: 'John' }
      const result = generatePropertySchema(schema)
      const expected = 'z.string().optional().openapi({ example: "John" })'
      expect(result).toBe(expected)
    },
  )

  it.concurrent(
    'generatePropertySchema({type: "string", example: "James"}) -> z.string().optional().openapi({ example: "James" })',
    () => {
      const schema: Schema = { type: 'string', example: 'James' }
      const result = generatePropertySchema(schema)
      const expected = 'z.string().optional().openapi({ example: "James" })'
      expect(result).toBe(expected)
    },
  )

  // email
  it.concurrent(
    'generatePropertySchema({type: "string", example: "john@email.com"}) -> z.string().optional().openapi({ example: "john@email.com" })',
    () => {
      const schema: Schema = { type: 'string', example: 'john@email.com' }
      const result = generatePropertySchema(schema)
      const expected = 'z.string().optional().openapi({ example: "john@email.com" })'
      expect(result).toBe(expected)
    },
  )

  // zip
  it.concurrent(
    'generatePropertySchema({type: "string", example: "12345"}) -> z.string().optional().openapi({ example: "12345" })',
    () => {
      const schema: Schema = { type: 'string', example: '12345' }
      const result = generatePropertySchema(schema)
      const expected = 'z.string().optional().openapi({ example: "12345" })'
      expect(result).toBe(expected)
    },
  )

  // pet name
  it.concurrent(
    'generatePropertySchema({type: "string", example: "doggie"}) -> z.string().optional().openapi({ example: "doggie" })',
    () => {
      const schema: Schema = { type: 'string', example: 'doggie' }
      const result = generatePropertySchema(schema)
      const expected = 'z.string().optional().openapi({ example: "doggie" })'
      expect(result).toBe(expected)
    },
  )

  // enum
  it.concurrent(
    'generatePropertySchema({type: "string", enum: ["placed","approved","delivered"], example: "approved"}) -> z.enum(["placed","approved","delivered"]).optional().openapi({ example: "approved" })',
    () => {
      const schema: Schema = {
        type: 'string',
        enum: ['placed', 'approved', 'delivered'],
        example: 'approved',
      }
      const result = generatePropertySchema(schema)
      const expected =
        'z.enum(["placed","approved","delivered"]).optional().openapi({ example: "approved" })'
      expect(result).toBe(expected)
    },
  )

  // date-time
  it.concurrent(
    'generatePropertySchema({type: "string", format: "date-time", example: "2023-01-15T09:30:00.000Z"}) -> z.string().datetime().optional().openapi({ example: "2023-01-15T09:30:00.000Z" })',
    () => {
      const schema: Schema = {
        type: 'string',
        format: 'date-time',
        example: '2023-01-15T09:30:00.000Z',
      }
      const result = generatePropertySchema(schema)
      const expected =
        'z.string().datetime().optional().openapi({ example: "2023-01-15T09:30:00.000Z" })'
      expect(result).toBe(expected)
    },
  )

  // uuid
  it.concurrent(
    'generatePropertySchema({type: "string", format: "uuid", example: "123e4567-e89b-12d3-a456-426614174000"}) -> z.string().uuid().optional().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" })',
    () => {
      const schema: Schema = {
        type: 'string',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }
      const result = generatePropertySchema(schema)
      const expected =
        'z.string().uuid().optional().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" })'
      expect(result).toBe(expected)
    },
  )
})
