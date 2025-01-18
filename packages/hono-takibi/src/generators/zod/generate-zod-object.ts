import type { Schema } from '../../types'
import { Config } from '../../config'
import { generateZodRecordSchema } from './generate-zod-record-schema'
import { generateAllOfCode } from '../openapi/components/allof/generate-allof-code'
import { generateOneOfCode } from '../openapi/components/oneof/generate-oneof-code'
import { generateAnyOfCode } from '../openapi/components/anyof/generate-anyof-code'
import { generateZodPropertiesSchema } from './generate-zod-properties-schema'

export function generateZodObject(schema: Schema, config: Config) {
  if (schema.additionalProperties)
    return generateZodRecordSchema(schema.additionalProperties, config)
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
