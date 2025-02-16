import type { Config } from '../../../config'
import type { Schema } from '../../../types'
import { getVariableSchemaNameHelper } from '../../../core/helper/get-variable-schema-name-helper'
import { getRefName } from '../../../core/schema/references/get-ref-name'

/**
 * generateReferenceSchema
 * generate reference schema
 *
 * @param schema
 * @param config
 */
export function generateReferenceSchema(schema: Schema, config: Config) {
    if (!schema.$ref) {
      return 'z.any()'
    }
    const refName = getRefName(schema.$ref)
    if (!refName) {
      return 'z.any()'
    }
  
    return getVariableSchemaNameHelper(refName, config) || 'z.any()'
  }