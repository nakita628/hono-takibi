/**
 * Escapes text for use in TypeScript code
 *
 * @param text - The text to escape
 * @returns The escaped text
 */
export function escape(text: string): string {
  return (
    text
      // Basic text cleaning
      .replace(/\n/g, ' ') // Replace line breaks with spaces
      .replace(/\s+/g, ' ') // Replace consecutive spaces with a single space
      .replace(/\t/g, ' ') // Replace tabs with spaces

      // Escaping special characters
      .replace(/\\/g, '\\\\') // Escaping backslash
      .replace(/'/g, "\\'") // Escaping single quote
      // Removing control characters
      .replace(/[\x00-\x1F\x7F]/g, '') // Removing control characters

      // Convert full-width spaces to half-width
      .replace(/　/g, ' ') // Convert full-width spaces to half-width

      // Removing zero-width characters
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // Removing zero-width characters

      // Remove leading and trailing spaces
      .trim()
  )
}
