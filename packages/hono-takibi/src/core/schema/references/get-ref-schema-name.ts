import type { Schema } from '../../../openapi/index.js'
import { getRefName } from './index.js'

/**
 * Retrieves the referenced schema name from a schema object.
 * @param { Schema } schema - The schema object
 * @returns { string } The referenced schema name
 * @throws { Error } Will throw an error if the $ref property or the reference name is not found
 */
export function getRefSchemaName(schema: Schema): string {
  if (!schema.$ref) {
    throw new Error('refName is not found')
  }
  const refName = getRefName(schema.$ref)
  if (!refName) {
    throw new Error('refName is not found')
  }
  return `${refName}Schema`
}
