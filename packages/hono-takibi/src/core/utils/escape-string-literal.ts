/**
 * Escapes a string for safe use in TypeScript string literals.
 *
 * @param text - The input text to escape.
 * @returns The escaped string.
 */
export function escapeStringLiteral(text: string): string {
  return (
    text
      // Basic text cleaning
      .replace(/\n/g, ' ') // Replace line breaks with spaces
      .replace(/\s+/g, ' ') // Replace consecutive spaces with a single space
      .replace(/\t/g, ' ') // Replace tabs with spaces

      // Escaping special characters
      .replace(/\\/g, '\\\\') // Escaping backslash
      .replace(/'/g, "\\'") // Escaping single quote

      // Convert full-width spaces to half-width
      .replace(/　/g, ' ')

      // Removing zero-width characters
      .replace(/\u200B|\u200C|\u200D|\uFEFF/g, '')
      .trim()
  )
}
