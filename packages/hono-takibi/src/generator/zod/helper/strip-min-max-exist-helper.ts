/**
 * Strips min and max from a string.
 *
 * @function stripMinMaxExistHelper
 * @param str - The string to strip min and max from.
 * @param min - The min value.
 * @param max - The max value.
 * @returns The string without min and max.
 */
export function stripMinMaxExistHelper(str: string, min: number, max: number): string {
  return str.replace(`.min(${min})`, '').replace(`.max(${max})`, '')
}
