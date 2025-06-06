import type { Config } from '../../../config/index.js'
import type { Schema } from '../../../types/index.js'
import { getVariableSchemaNameHelper } from '../../../core/helper/get-variable-schema-name-helper.js'
import { getRefName } from '../../../core/schema/references/get-ref-name.js'

/**
 * Generates a Zod schema string for a reference
 * @param { Schema } schema - The schema to generate the reference schema for
 * @param { Config } config - The configuration to use for the generation
 * @returns { string } The generated reference schema
 */
export function generateReferenceSchema(schema: Schema, config: Config): string {
  if (!schema.$ref) {
    return 'z.any()'
  }
  const refName = getRefName(schema.$ref)
  if (!refName) {
    return 'z.any()'
  }

  return getVariableSchemaNameHelper(refName, config) || 'z.any()'
}
