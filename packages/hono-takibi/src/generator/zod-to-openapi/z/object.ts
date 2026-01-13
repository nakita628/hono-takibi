import type { Schema } from '../../../openapi/index.js'
import { getToSafeIdentifier } from '../../../utils/index.js'
import { zodToOpenAPI } from '../index.js'

/**
 * Generates a Zod object schema from an OpenAPI schema definition.
 *
 * Handles the following OpenAPI object patterns:
 * - Plain object: `z.object({...})`
 * - additionalProperties: true → `z.looseObject({...})`
 * - additionalProperties: false → `z.strictObject({...})`
 * - additionalProperties: Schema → `z.record(z.string(), ...)`
 *
 * @param schema - Schema definition.
 * @returns The Zod object schema string.
 */
export function object(schema: Schema): string {
  // Delegate combinators to zodToOpenAPI
  if (schema.oneOf || schema.anyOf || schema.allOf || schema.not) {
    return zodToOpenAPI(schema)
  }

  // additionalProperties as Schema → record type
  if (typeof schema.additionalProperties === 'object') {
    return `z.record(z.string(),${zodToOpenAPI(schema.additionalProperties)})`
  }

  // Determine object type based on additionalProperties boolean
  const objectType =
    schema.additionalProperties === true
      ? 'looseObject'
      : schema.additionalProperties === false
        ? 'strictObject'
        : 'object'

  // Build properties code if present
  const propertiesCode = schema.properties
    ? Object.entries(schema.properties)
        .map(([key, propSchema]) => {
          const isRequired = Array.isArray(schema.required) && schema.required.includes(key)
          const safeKey = getToSafeIdentifier(key)
          const z = zodToOpenAPI(propSchema, isRequired ? undefined : { isOptional: true })
          return `${safeKey}:${z}`
        })
        .join(',')
    : ''

  return `z.${objectType}({${propertiesCode}})`
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-to-openapi/z/object.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
  describe('object', () => {
    it.concurrent.each<[Schema, string]>([
      [{ type: 'object' }, 'z.object({})'],
      [
        { type: 'object', properties: { foo: { type: 'string' } }, required: ['foo'] },
        'z.object({foo:z.string()})',
      ],
      [
        { type: 'object', properties: { foo: { type: 'string' } }, required: ['foo'] },
        'z.object({foo:z.string()})',
      ],
      [
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['A', 'B', 'C'],
            },
          },
          required: ['type'],
          discriminator: {
            propertyName: 'type',
          },
        },
        'z.object({type:z.enum(["A","B","C"])})',
      ],
      [
        {
          type: 'object',
          properties: {
            test: {
              type: 'string',
            },
          },
          required: ['test'],
          additionalProperties: false,
        },
        'z.strictObject({test:z.string()})',
      ],
      [
        {
          type: 'object',
          properties: {
            test: {
              type: 'string',
            },
          },
          required: ['test'],
          additionalProperties: true,
        },
        'z.looseObject({test:z.string()})',
      ],
      [
        {
          type: 'object',
          properties: {
            test: {
              type: 'string',
            },
          },
        },
        'z.object({test:z.string().exactOptional()})',
      ],
    ])('object(%o) → %s', (input, expected) => {
      expect(object(input)).toBe(expected)
    })
  })
}
