import { describe, expect, it } from 'vitest'
import { resolveSchemasDependencies } from './resolve-schemas-dependencies'
import { Schema } from '../../../types'

describe('resolveSchemasDependencies', () => {
  it('should return empty array for empty schemas', () => {
    const schemas: Record<string, Schema> = {}
    const result = resolveSchemasDependencies(schemas)
    expect(result).toEqual([])
  })

  it('should handle single schema with no dependencies', () => {
    const schemas: Record<string, Schema> = {
      Address: {
        type: 'object',
        properties: {
          street: { type: 'string' },
        },
      },
    }
    const result = resolveSchemasDependencies(schemas)
    expect(result).toEqual(['Address'])
  })

  it('should handle simple dependency chain', () => {
    const schemas: Record<string, Schema> = {
      User: {
        type: 'object',
        properties: {
          address: { $ref: '#/components/schemas/Address' },
        },
      },
      Address: {
        type: 'object',
        properties: {
          street: { type: 'string' },
        },
      },
    }
    const result = resolveSchemasDependencies(schemas)
    expect(result).toEqual(['Address', 'User'])
  })

  it('should handle multiple dependencies', () => {
    const schemas: Record<string, Schema> = {
      Order: {
        type: 'object',
        properties: {
          user: { $ref: '#/components/schemas/User' },
          product: { $ref: '#/components/schemas/Product' },
        },
      },
      User: {
        type: 'object',
        properties: {
          address: { $ref: '#/components/schemas/Address' },
        },
      },
      Product: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
      },
      Address: {
        type: 'object',
        properties: {
          street: { type: 'string' },
        },
      },
    }
    const result = resolveSchemasDependencies(schemas)

    // Check that dependencies are satisfied
    const orderIndex = result.indexOf('Order')
    const userIndex = result.indexOf('User')
    const productIndex = result.indexOf('Product')
    const addressIndex = result.indexOf('Address')

    expect(orderIndex).toBeGreaterThan(userIndex) // Order depends on User
    expect(orderIndex).toBeGreaterThan(productIndex) // Order depends on Product
    expect(userIndex).toBeGreaterThan(addressIndex) // User depends on Address
  })

  it('should handle nested dependencies', () => {
    const schemas: Record<string, Schema> = {
      User: {
        type: 'object',
        properties: {
          orders: {
            type: 'array',
            items: { $ref: '#/components/schemas/Order' },
          },
        },
      },
      Order: {
        type: 'object',
        properties: {
          product: { $ref: '#/components/schemas/Product' },
        },
      },
      Product: {
        type: 'object',
        properties: {
          category: { type: 'string' },
        },
      },
    }
    const result = resolveSchemasDependencies(schemas)

    const userIndex = result.indexOf('User')
    const orderIndex = result.indexOf('Order')
    const productIndex = result.indexOf('Product')

    expect(userIndex).toBeGreaterThan(orderIndex) // User depends on Order
    expect(orderIndex).toBeGreaterThan(productIndex) // Order depends on Product
  })
})
