import type { Operation } from '../../type'

/**
 * Check if an object is an Operation
 * @param { Operation } obj - The object to check
 * @returns { boolean } True if the object is an Operation, with type narrowing support
 *
 * Consider using `unknown` type instead of `Operation` for better type guarding:
 * ```typescript
 * function isOperation(obj: unknown): obj is Operation
 * ```
 * This would provide more strict type checking for arbitrary values.
 */
export function isOperation(obj: Operation): obj is Operation {
  return obj && typeof obj === 'object' && 'responses' in obj
}
