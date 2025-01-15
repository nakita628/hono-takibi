import { Config } from '../../../config'
import { getRefSchemaName } from '../../../core/schema/references/get-ref-schema-name'
import { Schema } from '../../../types'
import { generateZodSchema } from '../generate-zod-schema'

/**
 * Generates a Zod schema from a sub-schema.
 *
 * @param subSchema - The sub-schema object.
 * @param config - The configuration object.
 * @returns The generated Zod schema as a string.
 */
export function generateZodSchemaFromSubSchema(subSchema: Schema, config: Config): string {
  return subSchema.$ref ? getRefSchemaName(subSchema, config) : generateZodSchema(config, subSchema)
}
