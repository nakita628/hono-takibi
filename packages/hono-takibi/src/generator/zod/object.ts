import type { Schema } from '../../openapi/index.js'
import { record } from './index.js'
import { allOf } from '../zod-openapi-hono/openapi/component/allof/index.js'
import { oneOf } from '../zod-openapi-hono/openapi/component/oneof/index.js'
import { anyOf } from '../zod-openapi-hono/openapi/component/anyof/any-of.js'
import { propertiesSchema } from './property/properties-schema.js'
/**
 * Generate Zod object schema
 * @param { Schema } schema - Schema definition
 * @returns { string } Zod object schema string
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
    return record(schema.additionalProperties)
  } else {
    if (schema.properties) {
      const zodSchema = propertiesSchema(
        schema.properties,
        Array.isArray(schema.required) ? schema.required : [],
      )
      if (schema.additionalProperties === false) {
        console.log(schema.additionalProperties)
        return zodSchema.replace('object', 'strictObject')
      }
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
