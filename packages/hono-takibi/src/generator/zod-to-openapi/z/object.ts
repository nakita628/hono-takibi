import { propertiesSchema } from '../../../helper/properties-schema.js'
import type { Schema } from '../../../openapi/index.js'
import { zodToOpenAPI } from '../index.js'

/**
 * Generates a Zod object schema from an OpenAPI schema definition.
 *
 * @param schema - Schema definition.
 * @returns The Zod object schema string.
 */
export function object(schema: Schema): string {
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
