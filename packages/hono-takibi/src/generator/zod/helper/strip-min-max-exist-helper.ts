/**
 * Strips min and max from a string
 * @param { string } str - The string to strip min and max from.
 * @param { number } min - The min value.
 * @param { number } max - The max value.
 * @returns { string } The string without min and max.
 */
export function stripMinMaxExistHelper(str: string, min: number, max: number): string {
  return str.replace(`.min(${min})`, '').replace(`.max(${max})`, '')
}
