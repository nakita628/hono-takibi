import { describe, expect, it } from 'vitest'
import type { Schema } from '../../../types'
import { resolveSchemaReferences } from './resolve-schema-references'

describe('resolveSchemaReferences', () => {
  it('should return empty map for empty schemas', () => {
    const schemas: Record<string, Schema> = {}
    const result = resolveSchemaReferences(schemas)

    expect(result).toBeInstanceOf(Map)
    expect(result.size).toBe(0)
  })

  it('should resolve single schema with no references', () => {
    const schemas: Record<string, Schema> = {
      User: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
      },
    }

    const result = resolveSchemaReferences(schemas)

    expect(result.size).toBe(1)
    expect(result.get('User')).toEqual(new Set())
  })

  it('should resolve single schema with one reference', () => {
    const schemas: Record<string, Schema> = {
      User: {
        type: 'object',
        properties: {
          profile: { $ref: '#/components/schemas/Profile' },
        },
      },
    }

    const result = resolveSchemaReferences(schemas)

    expect(result.size).toBe(1)
    expect(result.get('User')).toEqual(new Set(['Profile']))
  })

  it('should resolve multiple schemas with references', () => {
    const schemas: Record<string, Schema> = {
      User: {
        properties: {
          profile: { $ref: '#/components/schemas/Profile' },
          address: { $ref: '#/components/schemas/Address' },
        },
      },
      Profile: {
        properties: {
          avatar: { $ref: '#/components/schemas/Avatar' },
        },
      },
      Address: {},
      Avatar: {},
    }

    const result = resolveSchemaReferences(schemas)

    expect(result.size).toBe(4)
    expect(result.get('User')).toEqual(new Set(['Profile', 'Address']))
    expect(result.get('Profile')).toEqual(new Set(['Avatar']))
    expect(result.get('Address')).toEqual(new Set())
    expect(result.get('Avatar')).toEqual(new Set())
  })

  it('should resolve nested array references', () => {
    const schemas: Record<string, Schema> = {
      User: {
        properties: {
          orders: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Order',
            },
          },
        },
      },
      Order: {},
    }

    const result = resolveSchemaReferences(schemas)

    expect(result.size).toBe(2)
    expect(result.get('User')).toEqual(new Set(['Order']))
    expect(result.get('Order')).toEqual(new Set())
  })

  it('should handle deeply nested references', () => {
    const schemas: Record<string, Schema> = {
      Root: {
        properties: {
          nested: {
            properties: {
              deeplyNested: {
                properties: {
                  ref: { $ref: '#/components/schemas/DeepSchema' },
                },
              },
            },
          },
        },
      },
      DeepSchema: {},
    }

    const result = resolveSchemaReferences(schemas)

    expect(result.size).toBe(2)
    expect(result.get('Root')).toEqual(new Set(['DeepSchema']))
    expect(result.get('DeepSchema')).toEqual(new Set())
  })
})
