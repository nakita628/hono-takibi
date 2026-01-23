import type { Schema } from '../../../openapi/index.js'
import { makeSafeKey } from '../../../utils/index.js'
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
 * @param schema - Schema definition
 * @returns The Zod object schema string
 *
 * @example
 * ```ts
 * // Basic object with properties
 * object({
 *   type: 'object',
 *   properties: { name: { type: 'string' } },
 *   required: ['name']
 * })
 * // → 'z.object({name:z.string()})'
 *
 * // Strict object (no additional properties)
 * object({ type: 'object', additionalProperties: false })
 * // → 'z.strictObject({})'
 *
 * // Record type (dictionary)
 * object({ type: 'object', additionalProperties: { type: 'number' } })
 * // → 'z.record(z.string(),z.number())'
 * ```
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
          const safeKey = makeSafeKey(key)
          const z = zodToOpenAPI(propSchema, isRequired ? undefined : { isOptional: true })
          return `${safeKey}:${z}`
        })
        .join(',')
    : ''

  return `z.${objectType}({${propertiesCode}})`
}
