import { describe, expect, it, vi } from 'vitest'
import type { Schema } from '../../../types'
import { traverseSchemaDependencies } from './traverse-schema-dependencies'

describe('traverseSchemaDependencies', () => {
  it('should handle single schema with no dependencies', () => {
    const schemas: Record<string, Schema> = {
      User: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
      },
    }
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const orderedSchemas: string[] = []

    traverseSchemaDependencies('User', schemas, visited, recursionStack, orderedSchemas)

    expect(orderedSchemas).toEqual(['User'])
    expect(visited.has('User')).toBe(true)
    expect(recursionStack.size).toBe(0)
  })

  it('should handle simple dependency chain', () => {
    const schemas: Record<string, Schema> = {
      User: {
        type: 'object',
        properties: {
          profile: { $ref: '#/components/schemas/Profile' },
        },
      },
      Profile: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
      },
    }
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const orderedSchemas: string[] = []

    traverseSchemaDependencies('User', schemas, visited, recursionStack, orderedSchemas)

    expect(orderedSchemas).toEqual(['Profile', 'User'])
    expect(visited.has('User')).toBe(true)
    expect(visited.has('Profile')).toBe(true)
    expect(recursionStack.size).toBe(0)
  })

  it('should handle multiple levels of dependencies', () => {
    const schemas: Record<string, Schema> = {
      User: {
        type: 'object',
        properties: {
          profile: { $ref: '#/components/schemas/Profile' },
        },
      },
      Profile: {
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
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const orderedSchemas: string[] = []

    traverseSchemaDependencies('User', schemas, visited, recursionStack, orderedSchemas)

    expect(orderedSchemas).toEqual(['Address', 'Profile', 'User'])
    expect(recursionStack.size).toBe(0)
  })

  it('should detect circular dependencies', () => {
    const schemas: Record<string, Schema> = {
      User: {
        type: 'object',
        properties: {
          profile: { $ref: '#/components/schemas/Profile' },
        },
      },
      Profile: {
        type: 'object',
        properties: {
          user: { $ref: '#/components/schemas/User' },
        },
      },
    }
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const orderedSchemas: string[] = []

    expect(() =>
      traverseSchemaDependencies('User', schemas, visited, recursionStack, orderedSchemas),
    ).toThrow('Circular dependency detected in schema: User')
  })

  it('should handle missing schema references', () => {
    const schemas: Record<string, Schema> = {
      User: {
        type: 'object',
        properties: {
          profile: { $ref: '#/components/schemas/NonExistentSchema' },
        },
      },
    }
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const orderedSchemas: string[] = []
    const consoleSpy = vi.spyOn(console, 'warn')

    traverseSchemaDependencies('User', schemas, visited, recursionStack, orderedSchemas)

    expect(consoleSpy).toHaveBeenCalledWith('Schema reference not found: NonExistentSchema')
    expect(orderedSchemas).toEqual(['User'])
    consoleSpy.mockRestore()
  })

  it('should handle already visited schemas', () => {
    const schemas: Record<string, Schema> = {
      User: {
        type: 'object',
        properties: {
          profile: { $ref: '#/components/schemas/Profile' },
        },
      },
      Profile: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
      },
    }
    const visited = new Set<string>(['Profile'])
    const recursionStack = new Set<string>()
    const orderedSchemas: string[] = ['Profile']

    traverseSchemaDependencies('User', schemas, visited, recursionStack, orderedSchemas)

    expect(orderedSchemas).toEqual(['Profile', 'User'])
    expect(recursionStack.size).toBe(0)
  })
})
