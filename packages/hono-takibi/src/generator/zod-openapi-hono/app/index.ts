import type { OpenAPI } from '../../../openapi/index.js'
import { isHttpMethod, methodPath } from '../../../utils/index.js'

/**
 * Generates a Hono app with OpenAPI integration.
 *
 * @param openapi - The OpenAPI specification.
 * @param output - The output file name (e.g., 'user.ts').
 * @param basePath - Optional base path for the app.
 * @returns The generated application code as a string.
 *
 * @example
 * ```ts
 * const code = app(openapiSpec, 'routes.ts', '/api')
 * // Returns generated Hono app code with route handlers
 * ```
 */
export function app(openapi: OpenAPI, output: `${string}.ts`, basePath: string): string {
  const getRouteMaps = (
    openapi: OpenAPI,
  ): { routeName: string; handlerName: string; path: string }[] => {
    const paths = openapi.paths
    const routeMappings = Object.entries(paths).flatMap(([path, pathItem]) => {
      return Object.entries(pathItem).flatMap(([method]) => {
        if (!isHttpMethod(method)) return []
        return {
          routeName: `${methodPath(method, path)}Route`,
          handlerName: `${methodPath(method, path)}RouteHandler`,
          path,
        }
      })
    })
    return routeMappings
  }

  const routeMappings = getRouteMaps(openapi)

  const routeNames = [...new Set(routeMappings.map((m) => m.routeName))]
  const routeModule = `./${output.replace(/^.*\//, '').replace(/\.ts$/, '')}`
  const routesImport =
    routeNames.length > 0 ? `import{${routeNames.join(',')}}from'${routeModule}'` : ''

  const handlerNames = [...new Set(routeMappings.map((m) => m.handlerName))]
  const handlerImport =
    handlerNames.length > 0 ? `import{${handlerNames.join(',')}}from'./handlers'` : ''

  const importSection = [`import{OpenAPIHono}from'@hono/zod-openapi'`, routesImport, handlerImport]
    .filter(Boolean)
    .join('\n')

  const appInit =
    basePath !== '/'
      ? `const app=new OpenAPIHono().basePath('${basePath}')`
      : 'const app=new OpenAPIHono()'

  const apiInit =
    'export const api=app' +
    routeMappings
      .map(({ routeName, handlerName }) => `.openapi(${routeName},${handlerName})`)
      .join('\n')

  return [
    importSection,
    appInit,
    apiInit,
    'export type AddType=typeof api',
    'export default app',
  ].join('\n\n')
}
