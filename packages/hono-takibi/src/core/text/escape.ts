/**
 * Escapes single quotes in a string
 *
 * @function escapeString
 * @param str - The string to escape
 * @returns The escaped string
 */
export function escapeString(str: string | undefined): string {
  return str?.replace(/'/g, "\\'") ?? ''
}
