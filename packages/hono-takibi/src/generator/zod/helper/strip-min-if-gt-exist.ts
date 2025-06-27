/**
 * Strips min if greater than exist.
 * @param { string } str - The string to strip min if greater than exist from.
 * @param { number } minimum - The minimum value.
 * @returns { string } The string without min if greater than exist.
 */
export function stripMinIfgTExist(str: string, minimum: number): string {
  return str.replace(`.min(${minimum})`, '')
}
