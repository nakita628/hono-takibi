/**
 * Extracts the type name from an OpenAPI `$ref` string.
 *
 * Returns the last segment of the path, typically the schema name.
 *
 * @param $ref - A reference path like `#/components/schemas/Address`.
 * @returns The extracted type name, or `undefined` if invalid.
 *
 * @example
 * ```ts
 * getRefName('#/components/schemas/Address')
 * // → 'Address'
 *
 * getRefName('#/components/schemas/Location/Address')
 * // → 'Address'
 *
 * getRefName('#/components/schemas/Shipping/Address/Details')
 * // → 'Details'
 *
 * getRefName('')
 * // → undefined
 * ```
 */
export function getRefName($ref: `#/components/schemas/${string}`): string | undefined {
  // split('/'): Split a string into an array using slashes
  // 1. ["#", "components", "schemas", "Address"]
  // pop() to get the last element
  // 2. "Address"
  return $ref.split('/').pop()
}
