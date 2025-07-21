/**
 * Removes `.max(n)` from a string if it matches the given maximum value.
 *
 * @param str - The input string (e.g., a Zod schema string).
 * @param maximum - The numeric value to match in `.max(...)`.
 * @returns The string with `.max(n)` removed if present.
 *
 * @example
 * ```ts
 * stripMaxIfLtExist('z.string().max(30)', 30)
 * // → 'z.string()'
 *
 * stripMaxIfLtExist('z.string().min(1).max(100)', 100)
 * // → 'z.string().min(1)'
 *
 * stripMaxIfLtExist('z.string().min(1)', 10)
 * // → 'z.string().min(1)' (unchanged)
 * ```
 */
export function stripMaxIfLtExist(str: string, maximum: number): string {
  return str.replace(`.max(${maximum})`, '')
}
