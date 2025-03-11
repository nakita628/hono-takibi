import { generateRouteName } from '../openapi/route/generate-route-name'

/**
 * Generate handler name
 *
 * @function generateHandlerName
 * @param method - Method
 * @param path - Path
 * @returns Handler name
 */
export function generateHandlerName(method: string, path: string) {
  return `${generateRouteName(method, path)}Handler`
}
