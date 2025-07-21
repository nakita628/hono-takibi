import type { OpenAPI } from '../../../openapi/index.js'
import { getHandlerImports } from '../handler/import/get-handler-imports.js'
import { getRouteMaps } from './helper/get-route-maps.js'
import { importHandlers } from '../handler/generator/index.js'
import { applyOpenapiRoutes } from './generator/apply-openapi-routes.js'
import { importRoutes, registerComponent } from './generator/utils/index.js'
import { processImportMap } from './helper/process-import-map.js'
import { docs } from './generator/docs/index.js'

const OPENAPI_HONO_IMPORT = `import { OpenAPIHono } from '@hono/zod-openapi'` as const
const SWAGGER_UI_IMPORT = `import { swaggerUI } from '@hono/swagger-ui'` as const
const APP = 'const app = new OpenAPIHono()' as const
const ADD_TYPE = 'export type AddType = typeof api' as const
const EXPORT_APP = 'export default app' as const

/**
 * Generate app
 *
 * @function app
 * @param { OpenAPI } openapi - OpenAPI spec
 * @param { `${string}.ts` } output - Output file name
 * @param { string | undefined } basePath - Base path
 * @returns { string } Generated app code
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
    // 1. imports
    [
      OPENAPI_HONO_IMPORT,
      SWAGGER_UI_IMPORT,
      importRoutes(processImportMap(routeMappings, output)).join(''),
      importHandlers(getHandlerImports(routeMappings), output).join('\n'),
    ].join('\n'),
    // 2. app initialization
    basePath ? `${APP}.basePath('${basePath}')` : APP,
    // 3. api setup
    `export const api = ${`app${applyOpenapiRoutes(routeMappings)}`}`,
    // 4. swagger setup
    swagger,
    // 5. types and exports
    ADD_TYPE,
    // 6. export app
    EXPORT_APP,
  ]
  return sections.join('\n\n')
}
