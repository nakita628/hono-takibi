import { capitalize } from '../../../core/text/capitalize'

/**
 * Generates a route name string based on HTTP method and path
 * 
 * @function generateRouteName
 * @param method - HTTP method (e.g., 'get', 'post', 'put')
 * @param path - URL path pattern (e.g., '/users/{id}/posts')
 * @returns Formatted route name string
 *
 * @example
 * // Basic path
 * generateRouteName('get', '/users')
 * // Returns: 'getUsersRoute'
 *
 * // Path with parameters
 * generateRouteName('post', '/users/{id}/posts')
 * // Returns: 'postUsersIdPostsRoute'
 *
 * // Path with hyphens
 * generateRouteName('put', '/user-profiles/{id}')
 * // Returns: 'putUserProfilesIdRoute'
 *
 * @note
 * - Removes slashes and curly braces from path
 * - Converts hyphens to spaces before processing
 * - Capitalizes each path segment
 * - Joins all parts into camelCase
 * - Appends 'Route' suffix
 * - Preserves HTTP method at the start
 */
export function generateRouteName(method: string, path: string) {
  const api_path = path
    .replace(/[\/{}]/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(capitalize)
    .join('')
  return `${method}${api_path}Route`
}
