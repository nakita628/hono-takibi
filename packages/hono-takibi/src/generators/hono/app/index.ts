import type { OpenAPISpec } from '../../../types'
import type { Config } from '../../../config'
import { generateDocs } from '../../app/docs/generate-docs'
import { getHandlerImports } from '../handler/import/get-handler-imports'
import { getRouteMaps } from './helper/get-route-maps'
import { generateImportHandlers } from '../handler/import/generate-import-handlers'
import { generateRegisterComponent } from '../../app/register-component/generate-register-component'
import { generateImportRoutes } from './generators/generate-import-routes'
import { generateApplyOpenapiRoutes } from './generators/generate-apply-openapi-routes'
import { processImportMap } from './helper/process-import-map'

const OPENAPI_HONO_IMPORT = `import { OpenAPIHono } from '@hono/zod-openapi'` as const
const SWAGGER_UI_IMPORT = `import { swaggerUI } from '@hono/swagger-ui'` as const
const APP = 'const app = new OpenAPIHono()' as const
const ADD_TYPE = 'export type AddType = typeof api' as const
const EXPORT_APP = 'export default app' as const

export function generateApp(openAPISpec: OpenAPISpec, config: Config) {
  const routeMappings = getRouteMaps(openAPISpec)

  const importsMap = processImportMap(routeMappings, config)

  const importRoutes = generateImportRoutes(importsMap)

  const handlerImportsMap: { [fileName: string]: string[] } = getHandlerImports(routeMappings)

  const importHandlers = generateImportHandlers(handlerImportsMap, config)

  const importHandlersCode = importHandlers.join('\n')

  const applyOpenapiRoutes = generateApplyOpenapiRoutes(routeMappings)

  const openAPIHono = config.app?.basePath ? `${APP}.basePath('${config.app.basePath}')` : APP

  const app = `app${applyOpenapiRoutes}`

  const api = `export const api = ${app}`

  const docs = generateDocs(openAPISpec)

  const isDev = config?.app?.isDev
    ? `const isDev = ${config.app.isDev} === 'development'`
    : `const isDev = process.env.NODE_ENV === 'development'`

  const basePath = config?.app?.basePath ? `/${config.app.basePath}/doc` : '/doc'

  const { components } = openAPISpec

  const registerComponent = components?.securitySchemes
    ? generateRegisterComponent(components.securitySchemes)
    : ''

  const swagger = `if(isDev){${registerComponent}\napp.doc('${'/doc'}',${JSON.stringify(docs)}).get('/ui',swaggerUI({url:'${basePath}'}))}`

  const sections = [
    // 1. imports
    [OPENAPI_HONO_IMPORT, SWAGGER_UI_IMPORT, importRoutes.join(''), importHandlersCode].join('\n'),
    // 2. app initialization
    openAPIHono,
    // 3. api setup
    api,
    // 4. development settings
    isDev,
    // 5. swagger setup
    swagger,
    // 6. types and exports
    ADD_TYPE,
    // 7. export app
    EXPORT_APP,
  ]
  return sections.join('\n\n')
}
