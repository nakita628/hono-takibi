import type { Schema } from '../../../openapi/index.js'
import { getVariableSchemaName } from '../../helper/index.js'
import { getRefName } from './get-ref-name.js'

/**
 * Retrieves the referenced schema name from a schema object.
 * @param { Schema } schema - The schema object
 * @param { 'camelCase' | 'PascalCase' } style - The naming style for the schema name, either 'camelCase' or 'PascalCase'
 * @returns { string } The referenced schema name
 * @throws { Error } Will throw an error if the $ref property or the reference name is not found
 */
export function getRefSchemaName(
  schema: Schema,
  schemaNameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
): string {
  if (!schema.$ref) {
    throw new Error('refName is not found')
  }
  const refName = getRefName(schema.$ref)
  if (!refName) {
    throw new Error('refName is not found')
  }
  return getVariableSchemaName(refName, schemaNameCase)
}
