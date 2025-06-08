import type { Config } from '../../../config/index.js'
import type { Schema } from '../../../types/index.js'
import { getVariableSchemaNameHelper } from '../../helper/index.js'
import { getRefName } from './get-ref-name.js'

/**
 * Retrieves the referenced schema name from a schema object.
 * @param { Schema } schema - The schema object
 * @param { Config } config - The configuration object
 * @returns { string } The referenced schema name
 * @throws { Error } Will throw an error if the $ref property or the reference name is not found
 */
export function getRefSchemaName(schema: Schema, config: Config): string {
  if (!schema.$ref) {
    throw new Error('refName is not found')
  }
  const refName = getRefName(schema.$ref)
  if (!refName) {
    throw new Error('refName is not found')
  }
  return getVariableSchemaNameHelper(refName, config)
}
