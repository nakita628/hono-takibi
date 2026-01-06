import type { OpenAPI } from '../../../openapi/index.js'
import { isHttpMethod, methodPath, registerComponent } from '../../../utils/index.js'

/**
 * Generates a Hono app with OpenAPI and Swagger UI integration.
 *
 * @param openapi - The OpenAPI specification.
 * @param output - The output file name (e.g., 'user.ts').
 * @param basePath - Optional base path for the app.
 * @returns The generated application code as a string.
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

  const handlerNames = Array.from(new Set(routeMappings.map((m) => m.handlerName))).sort()
  const handlerImport =
    handlerNames.length > 0 ? `import{${handlerNames.join(',')}}from'./handlers'` : ''

  const routeNames = Array.from(new Set(routeMappings.map((m) => m.routeName))).sort()
  const routeModule = `./${output.replace(/^.*\//, '').replace(/\.ts$/, '')}`
  const routesImport =
    routeNames.length > 0 ? `import{${routeNames.join(',')}}from'${routeModule}'` : ''

  const path = basePath === '/' ? '/doc' : `${basePath}/doc`
  const registerComponentCode = openapi.components?.securitySchemes
    ? registerComponent(openapi.components.securitySchemes)
    : ''
  const versionStr = String(openapi.openapi ?? '').trim()
  const [majStr, minStr] = versionStr.split('.', 3)
  const major = Number.isFinite(Number(majStr)) ? Number(majStr) : 0
  const minor = Number.isFinite(Number(minStr)) ? Number(minStr) : 0
  const is31Plus = major > 3 || (major === 3 && minor >= 1)
  const doc = is31Plus ? 'doc31' : 'doc'

  const importSection = [
    `import{swaggerUI}from'@hono/swagger-ui'`,
    `import{OpenAPIHono}from'@hono/zod-openapi'`,
    handlerImport,
    routesImport,
  ]
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

  const docs = Object.fromEntries(
    Object.entries({
      openapi: openapi.openapi,
      info: openapi.info,
      servers: openapi.servers,
      tags: openapi.tags,
      externalDocs: openapi.externalDocs,
    }).filter(([, v]) => v !== undefined),
  )

  const swagger =
    `if(process.env.NODE_ENV === 'development'){` +
    `${registerComponentCode}\n` +
    `app.${doc}('/doc',${JSON.stringify(docs)})` +
    `.get('/ui',swaggerUI({url:'${path}'}))` +
    '}'

  return [
    importSection,
    appInit,
    apiInit,
    swagger,
    'export type AddType=typeof api',
    'export default app',
  ].join('\n\n')
}
