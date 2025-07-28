import { allOf } from '../../../helper/allof.js'
import { anyOf } from '../../../helper/anyof.js'
import { oneOf } from '../../../helper/oneof.js'
import { zodToOpenAPI } from '../../../helper/zod-to-openapi.js'
import type { Schema } from '../../../openapi/index.js'
import { propertiesSchema } from '../helper/properties-schema.js'
import { zod } from '../index.js'

/**
 * Generates a Zod object schema from an OpenAPI schema definition.
 *
 * @param schema - Schema definition.
 * @returns The Zod object schema string.
 */
export function object(schema: Schema): string {
  if (schema.additionalProperties) {
    if (typeof schema.additionalProperties === 'boolean') {
      if (schema.properties) {
        const zodSchema = propertiesSchema(
          schema.properties,
          Array.isArray(schema.required) ? schema.required : [],
        )
        if (schema.additionalProperties === true) {
          return zodSchema.replace('object', 'looseObject')
        }
      }
      return 'z.any()'
    }
    return `z.record(z.string(),${zodToOpenAPI(zod(schema.additionalProperties), schema.additionalProperties)})`
  }

  if (schema.properties) {
    const zodSchema = propertiesSchema(
      schema.properties,
      Array.isArray(schema.required) ? schema.required : [],
    )
    if (schema.additionalProperties === false) {
      return zodSchema.replace('object', 'strictObject')
    }
  }
  if (schema.allOf) {
    return allOf(schema)
  }
  if (schema.oneOf) {
    return oneOf(schema)
  }
  if (schema.anyOf) {
    return anyOf(schema)
  }
  if (!schema.properties) {
    return 'z.object({})'
  }
  return propertiesSchema(schema.properties, Array.isArray(schema.required) ? schema.required : [])
}
