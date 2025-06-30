import { getRefName } from './index.js'

/**
 * Retrieves the referenced schema name from a schema object.
 * @param { `#/components/schemas/${string}` } ref - The reference string in the format `#/components/schemas/{schemaName}`
 * @returns { string } The referenced schema name
 * @throws { Error } Will throw an error if the $ref property or the reference name is not found
 */
export function getRefSchemaName($ref: `#/components/schemas/${string}`): string {
  if (!$ref) {
    throw new Error('refName is not found')
  }
  const refName = getRefName($ref)
  return `${refName}Schema`
}
