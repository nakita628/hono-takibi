/**
 * Escapes single quotes in a string
 *
 * @function escape
 * @param str - The string to escape
 * @returns The escaped string
 */
export function escape(str: string): string {
  return str?.replace(/'/g, "\\'")
}
