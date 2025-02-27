import type { Config } from '../../../config'
import type { Schema } from '../../../types'
import { getRefSchemaName } from '../../../core/schema/references/get-ref-schema-name'
import { generateZod } from '../generate-zod'

/**
 * Generates a Zod schema from a sub-schema.
 *
 * @param subSchema - The sub-schema object.
 * @param config - The configuration object.
 * @returns The generated Zod schema as a string.
 */
export function generateZodSchemaFromSubSchema(subSchema: Schema, config: Config): string {
  return subSchema.$ref ? getRefSchemaName(subSchema, config) : generateZod(config, subSchema)
}
