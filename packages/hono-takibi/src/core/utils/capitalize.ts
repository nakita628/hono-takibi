/**
 * Capitalizes the first letter of a string.
 *
 * @param str - Input string.
 * @returns A new string with the first letter in uppercase.
 */
export function capitalize(str: string): string {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}
