import { routeName } from '../../openapi/route/route-name.js'

/**
 * Generate handler name
 * @param { string } method - Method
 * @param { string } path - Path
 * @returns { string } Handler name
 */
export function handlerName(method: string, path: string): string {
  return `${routeName(method, path)}Handler`
}
