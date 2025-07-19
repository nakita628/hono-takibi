import type { Schema } from '../../../openapi/index.js'
import { getRefSchemaName } from '../../../core/schema/references/index.js'
import { zod } from '../index.js'

/**
 * @param { Schema } subSchema - The sub-schema object.
 * @returns { string } The generated Zod schema as a string.
 * @description Generates a Zod schema from a sub-schema.
 */
export function zodSchemaFromSubSchema(subSchema: Schema): string {
  return subSchema.$ref ? getRefSchemaName(subSchema.$ref) : zod(subSchema)
}
