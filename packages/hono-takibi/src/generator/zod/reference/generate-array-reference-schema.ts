import type { Config } from '../../../config/index.js'
import type { Schema } from '../../../openapi/index.js'
import { getVariableSchemaName } from '../../../core/helper/get-variable-schema-name.js'
import { getRefName } from '../../../core/schema/references/get-ref-name.js'
import { array } from '../index.js'

/**
 * Generates a Zod schema string for an array reference
 * @param { Schema } schema - The schema to generate the array reference schema for
 * @param { Config } config - The configuration to use for the generation
 * @returns { string } The generated array reference schema
 */
export function generateArrayReferenceSchema(
  schema: Schema,
  schemaNameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
): string {
  if (!schema.items?.$ref) {
    return 'z.array(z.any())'
  }
  const refName = getRefName(schema.items?.$ref)
  if (!refName) {
    return 'z.array(z.any())'
  }

  const variableName = getVariableSchemaName(refName, schemaNameCase)

  return array(variableName)
}
