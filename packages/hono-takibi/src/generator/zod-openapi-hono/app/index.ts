import type { OpenAPI } from '../../../openapi/index.js'
import { getHandlerImports, importHandlers } from '../handler/utils/index.js'
import { docs } from './helper/docs.js'
import { getRouteMaps } from './helper/get-route-maps.js'
import { applyOpenapiRoutes, importMap, importRoutes, registerComponent } from './utils/index.js'

/**
 * Generates a Hono app with OpenAPI and Swagger UI integration.
 *
 * @param openapi - The OpenAPI specification.
 * @param output - The output file name (e.g., 'user.ts').
 * @param basePath - Optional base path for the app.
 * @returns The generated application code as a string.
 */
export function app(
  openapi: OpenAPI,
  output: `${string}.ts`,
  basePath: string | undefined,
): string {
  const routeMappings = getRouteMaps(openapi)
  const path = basePath !== undefined ? `${basePath}/doc` : '/doc'
  const registerComponentCode = openapi.components?.securitySchemes
    ? registerComponent(openapi.components.securitySchemes)
    : ''
  const swagger = `if(process.env.NODE_ENV === 'development'){${registerComponentCode}\napp.doc('${'/doc'}',${JSON.stringify(docs(openapi))}).get('/ui',swaggerUI({url:'${path}'}))}`
  const sections = [
    [
      `import { swaggerUI } from '@hono/swagger-ui'`,
      `import { OpenAPIHono } from '@hono/zod-openapi'`,
      importHandlers(getHandlerImports(routeMappings), output).join('\n'),
      importRoutes(importMap(routeMappings, output)).join(''),
    ].join('\n'),
    basePath
      ? `${'const app = new OpenAPIHono()'}.basePath('${basePath}')`
      : 'const app = new OpenAPIHono()',
    `export const api = ${`app${applyOpenapiRoutes(routeMappings)}`}`,
    swagger,
    'export type AddType = typeof api',
    'export default app',
  ]
  return sections.join('\n\n')
}
