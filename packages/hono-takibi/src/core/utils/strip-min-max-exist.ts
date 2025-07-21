/**
 * Removes `.min(...)` and `.max(...)` from a string if they match the given values.
 *
 * @param str - The input string (e.g., a Zod schema string).
 * @param min - The value to match in `.min(...)`.
 * @param max - The value to match in `.max(...)`.
 * @returns The string with matching `.min(...)` and `.max(...)` removed.
 *
 * @example
 * ```ts
 * stripMinMaxExist('z.string().min(1).max(100)', 1, 100)
 * // → 'z.string()'
 *
 * stripMinMaxExist('z.string().min(1).max(50)', 1, 100)
 * // → 'z.string().max(50)' (only `.min(1)` removed)
 *
 * stripMinMaxExist('z.string().max(100)', 1, 100)
 * // → 'z.string()' (only `.max(100)` removed)
 *
 * stripMinMaxExist('z.string()', 1, 100)
 * // → 'z.string()' (unchanged)
 * ```
 */
export function stripMinMaxExist(str: string, min: number, max: number): string {
  return str.replace(`.min(${min})`, '').replace(`.max(${max})`, '')
}
