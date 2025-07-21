/**
 * Removes the `z.` prefix from a Zod schema expression string.
 *
 * @param zodSchema - A string representing a Zod schema (e.g., `"z.string()"`).
 * @returns The schema string without the `z.` prefix.
 *
 * @example
 * ```ts
 * removeZodPrefix('z.string()')
 * // → 'string()'
 *
 * removeZodPrefix('z.object({ name: z.string() })')
 * // → 'object({ name: z.string() })'
 *
 * removeZodPrefix('string()')
 * // → 'string()'
 * ```
 */
export function removeZodPrefix(zodSchema: string): string {
  return zodSchema.replace('z.', '')
}
