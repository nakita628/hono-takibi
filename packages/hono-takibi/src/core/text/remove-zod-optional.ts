/**
 * Removes the `.optional()` method from a Zod schema string
 *
 * @function removeZodOptional
 * @param zodSchema - The Zod schema string to remove the `.optional()` method from
 * @returns The Zod schema string with the `.optional()` method removed
 */
export function removeZodOptional(zodSchema: string): string {
  return zodSchema.replace('.optional()', '')
}
