import type { Operation } from '../../type'

/**
 * @function isOperation
 * @description Type guard function to check if an object is an Operation
 * @param obj - The object to check
 * @returns True if the object is an Operation, with type narrowing support
 *
 * @note Consider using `unknown` type instead of `Operation` for better type guarding:
 * ```typescript
 * function isOperation(obj: unknown): obj is Operation
 * ```
 * This would provide more strict type checking for arbitrary values.
 */
export function isOperation(obj: Operation): obj is Operation {
  return obj && typeof obj === 'object' && 'responses' in obj
}
