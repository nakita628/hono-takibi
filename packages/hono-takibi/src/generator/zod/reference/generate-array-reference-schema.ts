import type { Config } from '../../../config'
import type { Schema } from '../../../types'
import { getToSafeIdentifierHelper } from '../../../core/helper/get-to-safe-identifier-helper'
import { getVariableSchemaNameHelper } from '../../../core/helper/get-variable-schema-name-helper'
import { getRefName } from '../../../core/schema/references/get-ref-name'
import { generateZodArray } from '../generate-zod-array'

/**
 * Generates a Zod schema string for an array reference
 * @param { Schema } schema - The schema to generate the array reference schema for
 * @param { Config } config - The configuration to use for the generation
 * @returns { string } The generated array reference schema
 */
export function generateArrayReferenceSchema(schema: Schema, config: Config): string {
  if (!schema.items?.$ref) {
    return 'z.array(z.any())'
  }
  const refName = getRefName(schema.items?.$ref)
  if (!refName) {
    return 'z.array(z.any())'
  }

  const variableName = getVariableSchemaNameHelper(refName, config)
  const safeVariableName = getToSafeIdentifierHelper(variableName)

  return generateZodArray(safeVariableName)
}
