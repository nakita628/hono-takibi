import { describe, expect, it } from 'vitest'
import { extractRefs } from './extract-refs'
import type { Schema } from '../../../types'

const extractRefsTestCases: { schema: Schema; expected: string[] }[] = [
  {
    schema: {
      type: 'object',
      properties: {
        pet: {
          $ref: '#/components/schemas/Pet',
        },
      },
    },
    expected: ['Pet'],
  },
  {
    schema: {
      type: 'object',
      properties: {
        pet: {
          $ref: '#/components/schemas/Pet',
        },
        owner: {
          $ref: '#/components/schemas/User',
        },
      },
    },
    expected: ['Pet', 'User'],
  },
  {
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Pet',
      },
    },
    expected: ['Pet'],
  },
  {
    schema: {
      allOf: [{ $ref: '#/components/schemas/Pet' }, { $ref: '#/components/schemas/NewPet' }],
    },
    expected: ['Pet', 'NewPet'],
  },
  {
    schema: {
      type: 'object',
      properties: {
        nested: {
          type: 'object',
          properties: {
            deepRef: {
              $ref: '#/components/schemas/DeepSchema',
            },
          },
        },
      },
    },
    expected: ['DeepSchema'],
  },
]

describe('extractRefs', () => {
  it.concurrent.each(extractRefsTestCases)(
    'should extract refs correctly',
    ({ schema, expected }) => {
      const result = extractRefs(schema)
      expect(result).toEqual(expected)
    },
  )
})
