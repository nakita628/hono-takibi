import { getRefName } from '../../utils/index.js'

/**
 * Returns the schema name with "Schema" suffix from a `$ref` string.
 *
 * @param $ref - Reference string like `#/components/schemas/User`.
 * @returns The schema name, e.g., `'UserSchema'`.
 */
export function getRefSchemaName($ref: `#/components/schemas/${string}`): string {
  if (!$ref) {
    throw new Error('refName is not found')
  }
  const refName = getRefName($ref)
  return `${refName}Schema`
}
