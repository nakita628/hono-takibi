import type { Schema } from '../../../openapi/index.js'
import { record } from './index.js'

import { propertiesSchema } from '../property/properties-schema.js'
import { allOf } from '../../zod-openapi-hono/openapi/components/allof/index.js'
import { oneOf } from '../../zod-openapi-hono/openapi/components/oneof/index.js'
import { anyOf } from '../../zod-openapi-hono/openapi/components/anyof/index.js'
/**
 * @param { Schema } schema - Schema definition
 * @returns { string } Zod object schema string
 * @description Generates a Zod object schema from an OpenAPI schema definition.
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
