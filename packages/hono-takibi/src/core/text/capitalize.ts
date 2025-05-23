/**
 * Capitalize the first letter of a string
 * @param { string } str - String to capitalize
 * @returns { string } String with first letter capitalized
 *
 * @example
 * capitalize('posts')    // Returns: 'Posts'
 * capitalize('user')     // Returns: 'User'
 * capitalize('api')      // Returns: 'Api'
 *
 * @remarks
 * - Leaves rest of the string unchanged
 * - Returns empty string if input is empty
 * - Commonly used for generating type names and class names
 */
export function capitalize(str: string): string {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}
