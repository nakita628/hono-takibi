import type { Config } from '../../../config/index.js'
import type { Schema } from '../../../types/index.js'
import { getRefSchemaName } from '../../../core/schema/references/get-ref-schema-name.js'
import { generateZod } from '../generate-zod.js'

/**
 * Generates a Zod schema from a sub-schema.
 * @param { Schema } subSchema - The sub-schema object.
 * @param { Config } config - The configuration object.
 * @returns { string } The generated Zod schema as a string.
 */
export function generateZodSchemaFromSubSchema(subSchema: Schema, config: Config): string {
  return subSchema.$ref ? getRefSchemaName(subSchema, config) : generateZod(config, subSchema)
}
