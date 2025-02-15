import { generateRouteName } from '../hono/openapi/route/generate-route-name'

export function generateHandlerName(method: string, path: string) {
  return `${generateRouteName(method, path)}Handler`
}
