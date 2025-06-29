/**
 * Strips max if less than exist.
 * @param { string } str - The string to strip max if less than exist from.
 * @param { number } maximum - The maximum value.
 * @returns { string } The string without max if less than exist.
 */
export function stripMaxIfLtExist(str: string, maximum: number): string {
  return str.replace(`.max(${maximum})`, '')
}
