import { capitalize } from '../../../../core/utils/index.js'

/**
 * Generates a PascalCase route name from HTTP method and path.
 *
 * @param method - HTTP method (e.g., 'get', 'post').
 * @param path - URL path (e.g., '/users/{id}/posts').
 * @returns A route name string (e.g., 'getUsersIdPostsRoute').
 *
 * @example
 * routeName('get', '/users/{id}/posts') // 'getUsersIdPostsRoute'
 */
export function routeName(method: string, path: string): string {
  // 1. api_path: `/user/createWithList`
  // 2. replace(/[\/{}-]/g, ' ') -> ` user createWithList`
  // 3. trim() -> `user createWithList`
  // 4. split(/\s+/) -> `['user', 'createWithList']`
  // 5. map(capitalize) -> `['User', 'CreateWithList']`
  // 6. join('') -> `UserCreateWithList`

  const api_path = path
    .replace(/[/{}._-]/g, ' ')
    .trim()
    .split(/\s+/)
    .map(capitalize)
    .join('')
  return `${method}${api_path}Route`
}
