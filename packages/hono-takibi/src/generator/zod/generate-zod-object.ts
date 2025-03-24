import type { Schema } from '../../type'
import type { Config } from '../../config'
import { generateZodRecord } from './generate-zod-record'
import { generateAllOfCode } from '../zod-openapi-hono/openapi/component/allof/generate-allof-code'
import { generateOneOfCode } from '../zod-openapi-hono/openapi/component/oneof/generate-oneof-code'
import { generateAnyOfCode } from '../zod-openapi-hono/openapi/component/anyof/generate-anyof-code'
import { generateZodPropertiesSchema } from './property/generate-zod-properties-schema'

/**
 * Generate Zod object schema
 * @param { Schema } schema - Schema definition
 * @param { Config } config - Configuration
 * @returns { string } Zod object schema string
 */
export function generateZodObject(schema: Schema, config: Config): string {
  if (schema.additionalProperties) return generateZodRecord(schema.additionalProperties, config)
  if (schema.allOf) {
    return generateAllOfCode(schema, config)
  }
  if (schema.oneOf) {
    return generateOneOfCode(schema, config)
  }
  if (schema.anyOf) {
    return generateAnyOfCode(schema, config)
  }
  if (!schema.properties) {
    return 'z.object({})'
  }
  return generateZodPropertiesSchema(schema.properties, schema.required || [], config)
}
