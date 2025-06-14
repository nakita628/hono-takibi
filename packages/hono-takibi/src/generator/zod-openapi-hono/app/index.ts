import type { OpenAPISpec } from '../../../openapi/index.js'
import type { Config } from '../../../config/index.js'
import { generateDocs } from './docs/generate-docs.js'
import { getHandlerImports } from '../handler/import/get-handler-imports.js'
import { getRouteMaps } from './helper/get-route-maps.js'
import { generateImportHandlers } from '../handler/generators/generate-import-handlers.js'
import { generateRegisterComponent } from './register-component/generate-register-component.js'
import { generateImportRoutes } from './generators/generate-import-routes.js'
import { generateApplyOpenapiRoutes } from './generators/generate-apply-openapi-routes.js'
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
 * @param { OpenAPISpec } openAPISpec - OpenAPI spec
 * @param { Config } config - Config
 * @param { string | undefined } basePath - Base path
 * @returns { string } Generated app code
 */
export function generateApp(
  openAPISpec: OpenAPISpec,
  config: Config,
  basePath: string | undefined,
): string {
  const routeMappings = getRouteMaps(openAPISpec)

  const importsMap = processImportMap(routeMappings, config)

  const importRoutes = generateImportRoutes(importsMap)

  const handlerImportsMap: { [fileName: string]: string[] } = getHandlerImports(routeMappings)

  const importHandlers = generateImportHandlers(handlerImportsMap, config)

  const importHandlersCode = importHandlers.join('\n')

  const applyOpenapiRoutes = generateApplyOpenapiRoutes(routeMappings)

  const openAPIHono = basePath ? `${APP}.basePath('${basePath}')` : APP

  const app = `app${applyOpenapiRoutes}`

  const api = `export const api = ${app}`

  const docs = generateDocs(openAPISpec)

  const path = basePath !== undefined ? `/${basePath}/doc` : '/doc'

  const { components } = openAPISpec

  const registerComponent = components?.securitySchemes
    ? generateRegisterComponent(components.securitySchemes)
    : ''

  const swagger = `if(process.env.NODE_ENV === 'development'){${registerComponent}\napp.doc('${'/doc'}',${JSON.stringify(docs)}).get('/ui',swaggerUI({url:'${path}'}))}`

  const sections = [
    // 1. imports
    [OPENAPI_HONO_IMPORT, SWAGGER_UI_IMPORT, importRoutes.join(''), importHandlersCode].join('\n'),
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
