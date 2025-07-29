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
  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')

  const addNullable = (expr: string) => (isNullable ? `${expr}.nullable()` : expr)

  if (schema.additionalProperties) {
    if (typeof schema.additionalProperties === 'boolean') {
      if (schema.properties) {
        const z = propertiesSchema(
          schema.properties,
          Array.isArray(schema.required) ? schema.required : [],
        )
        if (schema.additionalProperties === true) {
          return addNullable(z.replace('object', 'looseObject'))
        }
      }
      return addNullable('z.any()')
    }

    const value = zodToOpenAPI(zod(schema.additionalProperties), schema.additionalProperties)
    return addNullable(`z.record(z.string(), ${value})`)
  }

  if (schema.properties) {
    const zodSchema = propertiesSchema(
      schema.properties,
      Array.isArray(schema.required) ? schema.required : [],
    )
    if (schema.additionalProperties === false) {
      return addNullable(zodSchema.replace('object', 'strictObject'))
    }
    return addNullable(zodSchema)
  }

  if (schema.allOf) return addNullable(allOf(schema))
  if (schema.oneOf) return addNullable(oneOf(schema))
  if (schema.anyOf) return addNullable(anyOf(schema))

  return addNullable('z.object({})')
}
