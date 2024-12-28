/**
 * Escapes single quote in a string
 *
 * @function escapeQuote
 * @param str - The string to escape
 * @returns The escaped string
 */
export function escapeQuote(str: string): string {
  return str?.replace(/'/g, "\\'")
}
