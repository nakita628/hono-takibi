/**
 * @function getRefName
 * @description Extracts the type name from an OpenAPI schema reference ($ref)
 * @param ref - OpenAPI schema reference path (e.g., '#/components/schemas/Address')
 * @returns The referenced type name, or undefined if the reference is invalid
 *
 * @example
 * // Basic usage with Address schema
 * getRefName('#/components/schemas/Address')
 * // Returns: 'Address'
 *
 * // Nested Address schema
 * getRefName('#/components/schemas/Location/Address')
 * // Returns: 'Address'
 *
 * // Complex Address reference
 * getRefName('#/components/schemas/Shipping/Address/Details')
 * // Returns: 'Details'
 *
 * // Invalid path
 * getRefName('')
 * // Returns: undefined
 *
 * @note
 * - Expects standard OpenAPI reference paths (e.g., '#/components/schemas/Address')
 * - Extracts the last segment of the path as the type name
 * - Returns undefined for empty strings or invalid paths
 * - Used when processing Address and other schema references in OpenAPI
 *
 * @description
 * Processes OpenAPI $ref strings to extract schema type names.
 * For example, when processing an Address schema reference:
 * Input: '#/components/schemas/Address'
 * Process: Splits by '/' -> ['#', 'components', 'schemas', 'Address']
 * Output: Returns 'Address'
 */
export function getRefName(ref: string) {
  // split('/'): Split a string into an array using slashes
  // 1. ["#", "components", "schemas", "Address"]
  // pop() to get the last element
  // 2. "Address"
  return ref.split('/').pop()
}
