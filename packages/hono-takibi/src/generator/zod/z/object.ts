import { allOf } from '../../../helper/allof.js'
import { anyOf } from '../../../helper/anyof.js'
import { not } from '../../../helper/not.js'
import { oneOf } from '../../../helper/oneof.js'
import type { Schema } from '../../../openapi/index.js'
import { propertiesSchema } from '../helper/properties-schema.js'
import { propertySchema } from '../helper/property-schema.js'
import zod from '../index.js'

/**
 * Generates a Zod object schema from an OpenAPI schema definition.
 *
 * @param schema - Schema definition.
 * @returns The Zod object schema string.
 */
export function object(schema: Schema): string {
  // // allOf, oneOf, anyOf, not
  if (schema.oneOf) return oneOf(schema)
  if (schema.anyOf) return anyOf(schema)
  if (schema.allOf) return allOf(schema)
  if (schema.not) return not(schema)
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
      }
      return 'z.any()'
    }
    // const s = zod(schema.additionalProperties)
    const s = propertySchema(schema.additionalProperties)
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
    return s
  }
  return 'z.object({})'
}
