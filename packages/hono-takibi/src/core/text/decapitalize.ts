/**
 * Decapitalizes the first letter of a string
 *
 * @function decapitalize
 * @param str - String to decapitalize
 * @returns String with the first letter in lowercase
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
