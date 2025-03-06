/**
 * Strips max if less than exist.
 *
 * @function stripMaxIfLtExistHelper
 * @param str - The string to strip max if less than exist from.
 * @param maximum - The maximum value.
 * @returns The string without max if less than exist.
 */
export function stripMaxIfLtExistHelper(str: string, maximum: number): string {
  return str.replace(`.max(${maximum})`, '')
}
