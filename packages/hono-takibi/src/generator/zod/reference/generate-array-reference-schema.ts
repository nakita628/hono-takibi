import type { Config } from '../../../config'
import { getVariableSchemaNameHelper } from '../../../core/helper/get-variable-schema-name-helper'
import { getRefName } from '../../../core/schema/references/get-ref-name'
import type { Schema } from '../../../type'
import { generateZodArray } from '../generate-zod-array'

/**
 * generateArrayReferenceSchema
 * generate array reference schema
 *
 * @param schema
 * @param config
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
  return generateZodArray(variableName)
}
