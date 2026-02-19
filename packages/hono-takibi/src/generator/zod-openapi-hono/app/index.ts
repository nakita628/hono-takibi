import { isHttpMethod } from '../../../guard/index.js'
import { makeHandlerFileName } from '../../../helper/handler.js'
import type { OpenAPI } from '../../../openapi/index.js'
import { methodPath } from '../../../utils/index.js'

/**
 * Generates a Hono app with OpenAPI integration.
 *
 * @param openapi - The OpenAPI specification.
 * @param output - The output file name (e.g., 'user.ts').
 * @param basePath - Optional base path for the app.
 * @param pathAlias - Optional path alias prefix.
 * @param routeImport - Optional route module specifier override.
 * @param routeHandler - When false (default), handlers import app and register routes inline.
 *   When true, generates `app.openapi()` pattern with RouteHandler type exports.
 * @returns The generated application code as a string.
 *
 * @example
 * ```ts
 * const code = app(openapiSpec, 'routes.ts', '/api')
 * // Returns generated Hono app code with route handlers
 * ```
 */
export function app(
  openapi: OpenAPI,
  output: string,
  basePath: string,
  pathAlias: string | undefined,
  routeImport: string | undefined = undefined,
  routeHandler = false,
): string {
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

  const isIndexFile = output.endsWith('/index.ts')
  const routeBasename = isIndexFile
    ? output.replace(/\/index\.ts$/, '').replace(/^.*\//, '')
    : output.replace(/^.*\//, '').replace(/\.ts$/, '')
  // Fallback: routeImport (routes.import) → pathAlias → relative path
  const aliasPrefix = pathAlias?.endsWith('/') ? pathAlias.slice(0, -1) : pathAlias

  const appInit =
    basePath !== '/'
      ? `const app=new OpenAPIHono().basePath('${basePath}')`
      : 'const app=new OpenAPIHono()'

  if (!routeHandler) {
    // routeHandler: false — handlers create sub-routers, index.ts mounts them via .route()
    const handlerFileNames = [
      ...new Set(Object.keys(openapi.paths).map((path) => makeHandlerFileName(path))),
    ]
    const handlerExportNames = handlerFileNames.map((fn) => `${fn.replace(/\.ts$/, '')}Handler`)
    const handlerModule = aliasPrefix ? `${aliasPrefix}/handlers` : './handlers'
    const handlerImport =
      handlerExportNames.length > 0
        ? `import{${handlerExportNames.join(',')}}from'${handlerModule}'`
        : ''

    const importSection = [`import{OpenAPIHono}from'@hono/zod-openapi'`, handlerImport]
      .filter(Boolean)
      .join('\n')

    const apiInit =
      handlerExportNames.length > 0
        ? 'export const api=app' + handlerExportNames.map((name) => `.route('/',${name})`).join('')
        : ''

    return [importSection, appInit, apiInit, 'export default app'].filter(Boolean).join('\n\n')
  }

  // routeHandler: true — app.openapi() pattern with barrel import
  const routeNames = [...new Set(routeMappings.map((m) => m.routeName))]
  const routeModule =
    routeImport ?? (aliasPrefix ? `${aliasPrefix}/${routeBasename}` : `./${routeBasename}`)
  const routesImport =
    routeNames.length > 0 ? `import{${routeNames.join(',')}}from'${routeModule}'` : ''

  const handlerNames = [...new Set(routeMappings.map((m) => m.handlerName))]
  const handlerModule = aliasPrefix ? `${aliasPrefix}/handlers` : './handlers'
  const handlerImport =
    handlerNames.length > 0 ? `import{${handlerNames.join(',')}}from'${handlerModule}'` : ''

  const importSection = [`import{OpenAPIHono}from'@hono/zod-openapi'`, routesImport, handlerImport]
    .filter(Boolean)
    .join('\n')

  const apiInit =
    'export const api=app' +
    routeMappings
      .map(({ routeName, handlerName }) => `.openapi(${routeName},${handlerName})`)
      .join('\n')

  return [importSection, appInit, apiInit, 'export default app'].join('\n\n')
}
