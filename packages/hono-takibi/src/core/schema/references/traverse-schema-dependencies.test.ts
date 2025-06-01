import { describe, it, expect, vi } from 'vitest'
import { traverseSchemaDependencies } from './traverse-schema-dependencies'

// Test run
// pnpm vitest run ./src/core/schema/references/traverse-schema-dependencies.test.ts

describe('traverseSchemaDependencies Test', () => {
  it.concurrent('should handle single schema with no dependencies', () => {
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const orderedSchemas: string[] = []

    traverseSchemaDependencies(
      'Test',
      {
        Test: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
        },
      },
      visited,
      recursionStack,
      orderedSchemas,
    )

    expect(orderedSchemas).toStrictEqual(['Test'])
    expect(visited.has('Test')).toBe(true)
    expect(recursionStack.size).toBe(0)
  })

  it.concurrent('should handle simple dependency chain', () => {
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const orderedSchemas: string[] = []

    traverseSchemaDependencies(
      'Test',
      {
        Test: {
          type: 'object',
          properties: {
            example: { $ref: '#/components/schemas/Example' },
          },
        },
        Example: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
        },
      },
      visited,
      recursionStack,
      orderedSchemas,
    )

    expect(orderedSchemas).toStrictEqual(['Example', 'Test'])
    expect(visited.has('Test')).toBe(true)
    expect(visited.has('Example')).toBe(true)
    expect(recursionStack.size).toBe(0)
  })

  it.concurrent('should handle multiple levels of dependencies', () => {
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const orderedSchemas: string[] = []

    traverseSchemaDependencies(
      'Test',
      {
        Test: {
          type: 'object',
          properties: {
            example: { $ref: '#/components/schemas/Example' },
          },
        },
        Example: {
          type: 'object',
          properties: {
            sample: { $ref: '#/components/schemas/Sample' },
          },
        },
        Sample: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
      },
      visited,
      recursionStack,
      orderedSchemas,
    )

    expect(orderedSchemas).toStrictEqual(['Sample', 'Example', 'Test'])
    expect(visited.has('Test')).toBe(true)
    expect(visited.has('Example')).toBe(true)
    expect(visited.has('Sample')).toBe(true)
    expect(recursionStack.size).toBe(0)
  })

  it.concurrent('should detect circular dependencies', () => {
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const orderedSchemas: string[] = []

    expect(() =>
      traverseSchemaDependencies(
        'Test',
        {
          Test: {
            type: 'object',
            properties: {
              example: { $ref: '#/components/schemas/Example' },
            },
          },
          Example: {
            type: 'object',
            properties: {
              test: { $ref: '#/components/schemas/Test' },
            },
          },
        },
        visited,
        recursionStack,
        orderedSchemas,
      ),
    ).toThrow('Circular dependency detected in schema: Test')
  })

  it.concurrent('should handle missing schema references', () => {
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const orderedSchemas: string[] = []
    const consoleSpy = vi.spyOn(console, 'warn')

    traverseSchemaDependencies(
      'Test',
      {
        Test: {
          type: 'object',
          properties: {
            profile: { $ref: '#/components/schemas/Example' },
          },
        },
      },
      visited,
      recursionStack,
      orderedSchemas,
    )

    expect(consoleSpy).toHaveBeenCalledWith('Schema reference not found: Example')
    expect(orderedSchemas).toStrictEqual(['Test'])
    consoleSpy.mockRestore()
  })

  it.concurrent('should handle already visited schemas', () => {
    const visited = new Set<string>(['Example'])
    const recursionStack = new Set<string>()
    const orderedSchemas: string[] = ['Example']

    traverseSchemaDependencies(
      'Test',
      {
        Test: {
          type: 'object',
          properties: {
            example: { $ref: '#/components/schemas/Example' },
          },
        },
        Example: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
        },
      },
      visited,
      recursionStack,
      orderedSchemas,
    )

    expect(orderedSchemas).toEqual(['Example', 'Test'])
    expect(recursionStack.size).toBe(0)
  })
})
