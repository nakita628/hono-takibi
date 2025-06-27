import type { Schema } from '../../../openapi/index.js'
import { getRefSchemaName } from '../../../core/schema/references/index.js'
import { zod } from '../index.js'

/**
 * Generates a Zod schema from a sub-schema.
 * @param { Schema } subSchema - The sub-schema object.
 * @returns { string } The generated Zod schema as a string.
 */
export function generateZodSchemaFromSubSchema(subSchema: Schema): string {
  return subSchema.$ref ? getRefSchemaName(subSchema) : zod(subSchema)
}
