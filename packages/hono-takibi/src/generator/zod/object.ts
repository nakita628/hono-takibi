import type { Schema } from '../../openapi/index.js'
import { record, passthrough } from './index.js'
import { allOf } from '../zod-openapi-hono/openapi/component/allof/index.js'
import { oneOf } from '../zod-openapi-hono/openapi/component/oneof/index.js'
import { anyOf } from '../zod-openapi-hono/openapi/component/anyof/any-of.js'
import { generateZodPropertiesSchema } from './property/generate-zod-properties-schema.js'
/**
 * Generate Zod object schema
 * @param { Schema } schema - Schema definition
 * @returns { string } Zod object schema string
 */
export function object(schema: Schema): string {
  if (schema.additionalProperties) {
    if (typeof schema.additionalProperties === 'boolean') {
      if (schema.properties) {
        const zodSchema = generateZodPropertiesSchema(
          schema.properties,
          Array.isArray(schema.required) ? schema.required : [],
        )
        return passthrough(zodSchema)
      }
      return 'z.any()'
    }
    return record(schema.additionalProperties)
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
  return generateZodPropertiesSchema(
    schema.properties,
    Array.isArray(schema.required) ? schema.required : [],
  )
}
