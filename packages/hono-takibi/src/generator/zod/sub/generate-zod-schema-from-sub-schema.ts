import type { Config } from '../../../config'
import type { Schema } from '../../../type'
import { getRefSchemaName } from '../../../core/schema/references/get-ref-schema-name'
import { generateZod } from '../generate-zod'

/**
 * Generates a Zod schema from a sub-schema.
 * @param { Schema } subSchema - The sub-schema object.
 * @param { Config } config - The configuration object.
 * @returns { string } The generated Zod schema as a string.
 */
export function generateZodSchemaFromSubSchema(subSchema: Schema, config: Config): string {
  return subSchema.$ref ? getRefSchemaName(subSchema, config) : generateZod(config, subSchema)
}
