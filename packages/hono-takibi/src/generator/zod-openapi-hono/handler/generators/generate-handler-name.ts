import { generateRouteName } from '../../openapi/route/generate-route-name.js'

/**
 * Generate handler name
 * @param { string } method - Method
 * @param { string } path - Path
 * @returns { string } Handler name
 */
export function generateHandlerName(method: string, path: string): string {
  return `${generateRouteName(method, path)}Handler`
}
