/**
 * Removes `.min(n)` from a string if it matches the given minimum value.
 *
 * @param str - The input string (e.g., a Zod schema string).
 * @param minimum - The numeric value to match in `.min(...)`.
 * @returns The string with `.min(n)` removed if present.
 *
 * @example
 * ```ts
 * stripMinIfgtExist('z.string().min(1)', 1)
 * // → 'z.string()'
 *
 * stripMinIfgtExist('z.string().min(5).max(100)', 5)
 * // → 'z.string().max(100)'
 *
 * stripMinIfgtExist('z.string().max(50)', 5)
 * // → 'z.string().max(50)' (unchanged)
 * ```
 */
export function stripMinIfgtExist(str: string, minimum: number): string {
  return str.replace(`.min(${minimum})`, '')
}
