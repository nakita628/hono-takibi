import type { Schema } from '../../../openapi/index.js'
import { getToSafeIdentifier } from '../../../utils/index.js'
import { zodToOpenAPI } from '../index.js'

/**
 * Generates a Zod object schema from an OpenAPI schema definition.
 *
 * @param schema - Schema definition.
 * @returns The Zod object schema string.
 */
export function object(schema: Schema): string {
  const propertiesSchema = (
    properties: { readonly [k: string]: Schema },
    required: readonly string[],
  ) => {
    const objectProperties = Object.entries(properties).map(([key, propSchema]) => {
      const isRequired = required.includes(key)
      const safeKey = getToSafeIdentifier(key)
      const z = zodToOpenAPI(propSchema, isRequired ? undefined : { isOptional: true })
      return `${safeKey}:${z}`
    })
    return `z.object({${objectProperties}})`
  }

  // allOf, oneOf, anyOf, not
  if (schema.oneOf) return zodToOpenAPI(schema)
  if (schema.anyOf) return zodToOpenAPI(schema)
  if (schema.allOf) return zodToOpenAPI(schema)
  if (schema.not) return zodToOpenAPI(schema)
  if (schema.additionalProperties) {
    if (typeof schema.additionalProperties === 'boolean') {
      if (schema.properties) {
        const s = propertiesSchema(
          schema.properties,
          Array.isArray(schema.required) ? schema.required : [],
        )
        if (schema.additionalProperties === true) {
          return s.replace('object', 'looseObject')
        }
        if (schema.additionalProperties === false) {
          return s.replace('object', 'strictObject')
        }
        return s
      }
      const s = 'z.object({})'
      if (schema.additionalProperties === true) {
        return s.replace('object', 'looseObject')
      }
      if (schema.additionalProperties === false) {
        return s.replace('object', 'strictObject')
      }
      return s
    }
    const s = zodToOpenAPI(schema.additionalProperties)
    return `z.record(z.string(),${s})`
  }
  if (schema.properties) {
    const s = propertiesSchema(
      schema.properties,
      Array.isArray(schema.required) ? schema.required : [],
    )
    if (schema.additionalProperties === false) {
      return s.replace('object', 'strictObject')
    }
    if (schema.additionalProperties === true) {
      return s.replace('object', 'looseObject')
    }
    return s
  }
  if (schema.additionalProperties === false) {
    return 'z.strictObject({})'
  }
  if (schema.additionalProperties === true) {
    return 'z.looseObject({})'
  }
  return 'z.object({})'
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
