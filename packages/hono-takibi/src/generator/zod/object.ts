import type { Schema } from '../../openapi/index.js'
import { record, passthrough } from './index.js'
import { allOf } from '../zod-openapi-hono/openapi/component/allof/index.js'
import { oneOf } from '../zod-openapi-hono/openapi/component/oneof/index.js'
import { anyOf } from '../zod-openapi-hono/openapi/component/anyof/any-of.js'
import { generateZodPropertiesSchema } from './property/generate-zod-properties-schema.js'
/**
 * Generate Zod object schema
 * @param { Schema } schema - Schema definition
 * @param { Config } config - Configuration
 * @returns { string } Zod object schema string
 */
export function object(
  schema: Schema,
  schemaNameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
  typeNameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
): string {
  if (schema.additionalProperties) {
    if (typeof schema.additionalProperties === 'boolean') {
      if (schema.properties) {
        const zodSchema = generateZodPropertiesSchema(
          schema.properties,
          Array.isArray(schema.required) ? schema.required : [],
          schemaNameCase,
          typeNameCase,
        )
        return passthrough(zodSchema)
      }
      return 'z.any()'
    }
    return record(schema.additionalProperties, schemaNameCase, typeNameCase)
  }
  if (schema.allOf) {
    return allOf(schema, schemaNameCase, typeNameCase)
  }
  if (schema.oneOf) {
    return oneOf(schema, schemaNameCase, typeNameCase)
  }
  if (schema.anyOf) {
    return anyOf(schema, schemaNameCase, typeNameCase)
  }
  if (!schema.properties) {
    return 'z.object({})'
  }
  return generateZodPropertiesSchema(
    schema.properties,
    Array.isArray(schema.required) ? schema.required : [],
    schemaNameCase,
    typeNameCase,
  )
}
