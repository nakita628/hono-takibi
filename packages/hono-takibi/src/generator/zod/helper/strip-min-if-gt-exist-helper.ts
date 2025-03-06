/**
 * Strips min if greater than exist.
 *
 * @function stripMinIfgTExistHelper
 * @param str - The string to strip min if greater than exist from.
 * @param minimum - The minimum value.
 * @returns The string without min if greater than exist.
 */
export function stripMinIfgTExistHelper(str: string, minimum: number): string {
  return str.replace(`.min(${minimum})`, '')
}
