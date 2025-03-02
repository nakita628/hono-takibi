import { generateRouteName } from '../openapi/route/generate-route-name'

export function generateHandlerName(method: string, path: string) {
  return `${generateRouteName(method, path)}Handler`
}
