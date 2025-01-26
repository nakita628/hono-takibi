import { generateRouteName } from '../openapi/paths/generate-route-name'

export function generateHandlerName(method: string, path: string) {
  return `${generateRouteName(method, path)}Handler`
}
