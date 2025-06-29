import type { OpenAPI } from '../../../openapi/index.js'
import { getHandlerImports } from '../handler/import/get-handler-imports.js'
import { getRouteMaps } from './helper/get-route-maps.js'
import { importHandlers } from '../handler/generator/index.js'
import { importRoutes, applyOpenapiRoutes, registerComponent, docs } from './generator/index.js'
import { processImportMap } from './helper/process-import-map.js'

const OPENAPI_HONO_IMPORT = `import { OpenAPIHono } from '@hono/zod-openapi'` as const
const SWAGGER_UI_IMPORT = `import { swaggerUI } from '@hono/swagger-ui'` as const
const APP = 'const app = new OpenAPIHono()' as const
const ADD_TYPE = 'export type AddType = typeof api' as const
const EXPORT_APP = 'export default app' as const

/**
 * Generate app
 *
 * @function generateApp
 * @param { OpenAPI } openapi - OpenAPI spec
 * @param { `${string}.ts` } output - Output file name
 * @param { string | undefined } basePath - Base path
 * @returns { string } Generated app code
 */
export function generateApp(
  openapi: OpenAPI,
  output: `${string}.ts`,
  basePath: string | undefined,
): string {
  const routeMappings = getRouteMaps(openapi)

  const importsMap = processImportMap(routeMappings, output)

  const handlerImportsMap: { [fileName: string]: string[] } = getHandlerImports(routeMappings)

  const importHandlersCode = importHandlers(handlerImportsMap, output).join('\n')

  const openAPIHono = basePath ? `${APP}.basePath('${basePath}')` : APP

  const app = `app${applyOpenapiRoutes(routeMappings)}`

  const api = `export const api = ${app}`

  const document = docs(openapi)

  const path = basePath !== undefined ? `/${basePath}/doc` : '/doc'

  const components = openapi.components

  const registerComponentCode = components?.securitySchemes
    ? registerComponent(components.securitySchemes)
    : ''

  const swagger = `if(process.env.NODE_ENV === 'development'){${registerComponentCode}\napp.doc('${'/doc'}',${JSON.stringify(document)}).get('/ui',swaggerUI({url:'${path}'}))}`

  const sections = [
    // 1. imports
    [
      OPENAPI_HONO_IMPORT,
      SWAGGER_UI_IMPORT,
      importRoutes(importsMap).join(''),
      importHandlersCode,
    ].join('\n'),
    // 2. app initialization
    openAPIHono,
    // 3. api setup
    api,
    // 4. swagger setup
    swagger,
    // 5. types and exports
    ADD_TYPE,
    // 6. export app
    EXPORT_APP,
  ]
  return sections.join('\n\n')
}
