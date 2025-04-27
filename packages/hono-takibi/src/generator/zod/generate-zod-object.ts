import type { Schema } from '../../types/index.js'
import type { Config } from '../../config/index.js'
import { generateZodRecord } from './generate-zod-record.js'
import { generateAllOfCode } from '../zod-openapi-hono/openapi/component/allof/generate-allof-code.js'
import { generateOneOfCode } from '../zod-openapi-hono/openapi/component/oneof/generate-oneof-code.js'
import { generateAnyOfCode } from '../zod-openapi-hono/openapi/component/anyof/generate-anyof-code.js'
import { generateZodPropertiesSchema } from './property/generate-zod-properties-schema.js'
import { generateZodPassthrough } from './generate-zod-passthrough.js'
/**
 * Generate Zod object schema
 * @param { Schema } schema - Schema definition
 * @param { Config } config - Configuration
 * @returns { string } Zod object schema string
 */
export function generateZodObject(schema: Schema, config: Config): string {
  if (schema.additionalProperties) {
    if (typeof schema.additionalProperties === 'boolean') {
      if (schema.properties) {
        const zodSchema = generateZodPropertiesSchema(
          schema.properties,
          schema.required || [],
          config,
        )
        return generateZodPassthrough(zodSchema)
      }
      return 'z.any()'
    }
    return generateZodRecord(schema.additionalProperties, config)
  }
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
