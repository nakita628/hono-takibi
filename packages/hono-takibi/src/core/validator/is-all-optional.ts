/**
 * Checks if all object properties are marked as optional.
 *
 * Expects each property string to include `.optional()` if it is optional.
 *
 * @param objectProperties - List of property expressions (e.g., Zod property strings).
 * @returns `true` if all properties contain `.optional()`, otherwise `false`.
 *
 * @example
 * ```ts
 * isAllOptional(['z.string().optional()', 'z.number().optional()'])
 * // → true
 *
 * isAllOptional(['z.string()', 'z.number().optional()'])
 * // → false
 *
 * isAllOptional([])
 * // → true
 * ```
 */
export function isAllOptional(objectProperties: string[]): boolean {
  return objectProperties.every((prop) => prop.includes('.optional()'))
}
