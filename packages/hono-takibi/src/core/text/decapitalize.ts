/**
 * Decapitalize the first letter of a string
 * @param {string} str - String to decapitalize
 * @returns {string} String with the first letter in lowercase
 *
 * @example
 * decapitalize('Posts')    // Returns: 'posts'
 * decapitalize('User')     // Returns: 'user'
 * decapitalize('Api')      // Returns: 'api'
 *
 * @remarks
 * - Leaves the rest of the string unchanged
 * - Returns an empty string if the input is empty
 */
export function decapitalize(str: string): string {
  return `${str.charAt(0).toLowerCase()}${str.slice(1)}`
}
