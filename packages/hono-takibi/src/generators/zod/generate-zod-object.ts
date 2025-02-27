import type { Schema } from '../../types'
import type { Config } from '../../config'
import { generateZodRecord } from './generate-zod-record'
import { generateAllOfCode } from '../zod-openapi-hono/openapi/component/allof/generate-allof-code'
import { generateOneOfCode } from '../zod-openapi-hono/openapi/component/oneof/generate-oneof-code'
import { generateAnyOfCode } from '../zod-openapi-hono/openapi/component/anyof/generate-anyof-code'
import { generateZodPropertiesSchema } from './generate-zod-properties-schema'

export function generateZodObject(schema: Schema, config: Config) {
  if (schema.additionalProperties)
    return generateZodRecord(schema.additionalProperties, config)
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
