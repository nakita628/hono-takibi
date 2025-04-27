import { capitalize } from '../../../../core/text/capitalize.js'

/**
 * Generates a route name from HTTP method and path
 * @param { string } method - HTTP method (e.g., 'get', 'post', 'put')
 * @param { string } path - URL path pattern (e.g., '/users/{id}/posts')
 * @returns { string } Formatted route name string
 * @remarks
 * Transformation process:
 * 1. Replace special characters (/{}-)  with spaces
 * 2. Remove leading and trailing spaces
 * 3. Split string by consecutive spaces
 * 4. Capitalize each word
 * 5. Join all words together
 * 6. Add HTTP method and Route suffix
 */
export function generateRouteName(method: string, path: string) {
  // 1. api_path: `/user/createWithList`
  // 2. replace(/[\/{}-]/g, ' ') -> ` user createWithList`
  // 3. trim() -> `user createWithList`
  // 4. split(/\s+/) -> `['user', 'createWithList']`
  // 5. map(capitalize) -> `['User', 'CreateWithList']`
  // 6. join('') -> `UserCreateWithList`

  const api_path = path
    .replace(/[\/{}-]/g, ' ')
    .trim()
    .split(/\s+/)
    .map(capitalize)
    .join('')
  return `${method}${api_path}Route`
}
