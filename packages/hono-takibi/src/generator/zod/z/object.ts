import { allOf } from '../../../helper/allof.js'
import { anyOf } from '../../../helper/anyof.js'
import { not } from '../../../helper/not.js'
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
  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')
  if (schema.additionalProperties) {
    if (typeof schema.additionalProperties === 'boolean') {
      if (schema.properties) {
        const z = propertiesSchema(
          schema.properties,
          Array.isArray(schema.required) ? schema.required : [],
        )
        if (schema.additionalProperties === true) {
          if (isNullable) {
            return `${z.replace('object', 'looseObject')}.nullable()`
          }
          return z.replace('object', 'looseObject')
        }
      }
      const z = isNullable ? 'z.any().nullable()' : 'z.any()'
      return schema.default ? `${z}.default(${JSON.stringify(schema.default)})` : z
    }
    const s = zodToOpenAPI(zod(schema.additionalProperties), schema.additionalProperties)
    const z = isNullable ? `z.record(z.string(),${s}).nullable()` : `z.record(z.string(),${s})`
    return schema.default ? `${z}.default(${JSON.stringify(schema.default)})` : z
  }

  if (schema.properties) {
    const s = propertiesSchema(
      schema.properties,
      Array.isArray(schema.required) ? schema.required : [],
    )
    if (schema.additionalProperties === false) {
      const z = isNullable
        ? `${s.replace('object', 'strictObject')}.nullable()`
        : s.replace('object', 'strictObject')
      return schema.default ? `${z}.default(${JSON.stringify(schema.default)})` : z
    }
    const z = isNullable ? `${s}.nullable()` : s
    return schema.default ? `${z}.default(${JSON.stringify(schema.default)})` : z
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
  const z = isNullable ? 'z.object({}).nullable()' : 'z.object({})'
  return schema.default ? `${z}.default(${JSON.stringify(schema.default)})` : z
}
