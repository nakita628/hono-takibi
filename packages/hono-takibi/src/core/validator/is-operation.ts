import type { Operation } from '../../openapi/index.js'

/**
 * Checks if a value is an OpenAPI `Operation` object.
 *
 * @param obj - The value to check.
 * @returns `true` if the value is an `Operation` object.
 *
 * @example
 * ```ts
 * isOperation({ responses: {} }) // true
 * isOperation({})                // false
 * ```
 */
export function isOperation(obj: Operation): obj is Operation {
  return obj && typeof obj === 'object' && 'responses' in obj
}
