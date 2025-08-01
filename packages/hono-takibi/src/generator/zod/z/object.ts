import { allOf } from '../../../helper/allof.js'
import { anyOf } from '../../../helper/anyof.js'
import { not } from '../../../helper/not.js'
import { oneOf } from '../../../helper/oneof.js'
import { wrap } from '../../../helper/wrap.js'
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
        const s = propertiesSchema(
          schema.properties,
          Array.isArray(schema.required) ? schema.required : [],
        )
        if (schema.additionalProperties === true) {
          const z = s.replace('object', 'looseObject')
          return wrap(z, schema)
        }
      }
      const z = 'z.any()'
      return wrap(z, schema)
    }
    const s = zod(schema.additionalProperties)
    const z = `z.record(z.string(),${s})`
    return wrap(z, schema)
  }
  if (schema.properties) {
    const s = propertiesSchema(
      schema.properties,
      Array.isArray(schema.required) ? schema.required : [],
    )
    if (schema.additionalProperties === false) {
      const z = s.replace('object', 'strictObject')
      return wrap(z, schema)
    }
    const z = s
    return wrap(z, schema)
  }
  // allOf, oneOf, anyOf, not
  if (schema.oneOf) {
    return oneOf(schema)
  }
  if (schema.anyOf) {
    return anyOf(schema)
  }
  if (schema.allOf) {
    return allOf(schema)
  }
  if (schema.not) {
    return not(schema)
  }
  const z = 'z.object({})'
  return wrap(z, schema)
}
