/**
 * Checks if a Zod schema string contains the `.optional()` method.
 *
 * @function isOptional
 * @param zodSchema - The Zod schema string to check.
 * @returns `true` if the `.optional()` method is present, `false` otherwise.
 */
export function isOptional(zodSchema: string): boolean {
  return zodSchema.includes('.optional()')
}
