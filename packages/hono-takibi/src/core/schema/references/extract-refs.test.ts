import type { Schema } from '../../../type'
import { describe, expect, it } from 'vitest'
import { extractRefs } from './extract-refs'

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

describe('extractRefs valid cases', () => {
  it.concurrent.each(extractRefsTestCases)(
    'should extract refs correctly',
    ({ schema, expected }) => {
      const result = extractRefs(schema)
      expect(result).toEqual(expected)
    },
  )
})

describe('extractRefs edge cases', () => {
  it.concurrent('should return empty array when no refs are found', () => {
    const result = extractRefs({})
    expect(result).toEqual([])
  })

  it.concurrent('should return empty array when schema is null', () => {
    // biome-ignore lint/suspicious/noExplicitAny:
    const result = extractRefs(null as any)
    expect(result).toEqual([])
  })

  it.concurrent('should return empty array when schema is undefined', () => {
    // biome-ignore lint/suspicious/noExplicitAny:
    const result = extractRefs(undefined as any)
    expect(result).toEqual([])
  })

  it.concurrent('should return empty array when schema is a non-object value', () => {
    // biome-ignore lint/suspicious/noExplicitAny:
    const result = extractRefs(1 as any)
    expect(result).toEqual([])
  })

  it.concurrent('should extract valid refs and ignore invalid ones', () => {
    const schema: Schema = {
      $ref: '#/components/schemas/ValidRef',
      nested: {
        $ref: 100,
        deeper: {
          $ref: '#/components/schemas/AnotherRef',
        },
      },
      // biome-ignore lint/suspicious/noExplicitAny:
    } as any
    const result = extractRefs(schema)
    expect(result).toEqual(['ValidRef', 'AnotherRef'])
  })
})
