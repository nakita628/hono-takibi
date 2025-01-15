import { describe, expect, it } from 'vitest'
import { isNullableSchema } from './is-nullable-schema'
import type { Schema } from '../../types'

const isNullableSchemaTestCases: { schema: Schema; expected: boolean }[] = [
  {
    schema: { $ref: '#/components/schemas/GeoJsonObject' },
    expected: false,
  },
  {
    schema: {
      type: 'object',
      required: ['type', 'coordinates'],
      properties: {
        type: {
          type: 'string',
          enum: ['Point'],
        },
        coordinates: {
          $ref: '#/components/schemas/Position',
        },
      },
    },
    expected: false,
  },

  {
    schema: { $ref: '#/components/schemas/GeometryElement' },
    expected: false,
  },
  {
    schema: {
      type: 'object',
      required: ['coordinates'],
      properties: {
        coordinates: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Position',
          },
        },
      },
    },
    expected: false,
  },
  {
    schema: {
      $ref: '#/components/schemas/GeometryElement',
    },
    expected: false,
  },
  {
    schema: {
      type: 'object',
      required: ['coordinates'],
      properties: {
        coordinates: {
          $ref: '#/components/schemas/LineStringCoordinates',
        },
      },
    },
    expected: false,
  },
  {
    schema: {
      type: 'object',
      required: ['coordinates'],
      properties: {
        coordinates: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/LineStringCoordinates',
          },
        },
      },
    },
    expected: false,
  },
  {
    schema: {
      type: 'object',
      required: ['coordinates'],
      properties: {
        coordinates: {
          type: 'array',
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/LinearRing',
            },
          },
        },
      },
    },
    expected: false,
  },
  {
    schema: {
      nullable: true,
    },
    expected: true,
  },
]

describe('isNullableSchema', () => {
  it.concurrent.each(isNullableSchemaTestCases)(
    'isNullableSchema($schema) -> $expected',
    async ({ schema, expected }) => {
      const result = isNullableSchema(schema)
      expect(result).toBe(expected)
    },
  )
})
