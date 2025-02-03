import type { OpenAPISpec } from '../../../types'
import type { Config } from '../../../config'
import { generateAppRouteHandler } from '../../app/generate-app-route-handler'
import { generateDocs } from '../../openapi/docs/generate-docs'
import { getHandlerImports } from '../handler/import/get-handler-imports'
import { getRouteMaps } from './helper/get-route-maps'
import { generateImportHandlers } from '../handler/import/generate-import-handlers'

const OPENAPI_HONO_IMPORT = `import { OpenAPIHono } from '@hono/zod-openapi'` as const
const SWAGGER_UI_IMPORT = `import { swaggerUI } from '@hono/swagger-ui'` as const
const APP = 'const app = new OpenAPIHono()' as const
const ADD_TYPE = `export type AddType = typeof api` as const
const EXPORT_APP = `export default api` as const

export function generateApp(openAPISpec: OpenAPISpec, config: Config) {
  const routeMappings = getRouteMaps(openAPISpec)

  const importsMap: { [importPath: string]: string[] } = {}

  for (const { routeName } of routeMappings) {
    const importPath = config.output
    if (!importPath) {
      throw new Error('Output path is required')
    }
    if (!importsMap[importPath]) {
      importsMap[importPath] = []
    }
    importsMap[importPath].push(routeName)
  }

  const importRoutes: string[] = []
  for (const [importPath, names] of Object.entries(importsMap)) {
    const uniqueNames = Array.from(new Set(names))
    if (importPath.includes('/index.ts')) {
      const normalizedPath = importPath.replace(/\/index\.ts$/, '')
      importRoutes.push(`import { ${uniqueNames.join(',')} } from './${normalizedPath}';`)
    } else {
      // const isIndexTs = importPath === 'index.ts'
      // importRoutes.push(`import { ${uniqueNames.join(',')} } from './${isIndexTs ? '' : importPath}';`)
      importRoutes.push(`import { ${uniqueNames.join(',')} } from './${importPath}';`)
    }
  }

  const handlerImportsMap: { [fileName: string]: string[] } = getHandlerImports(routeMappings)

  const importHandlers = generateImportHandlers(handlerImportsMap, config)

  const importHandlersCode = importHandlers.join('\n')

  const openapiRoutes = routeMappings
    .map(({ routeName, handlerName }) => {
      return generateAppRouteHandler(routeName, handlerName)
    })
    .join('\n')

  const app = `app${openapiRoutes}`

  const api = `const api = ${app}`

  const docs = generateDocs(openAPISpec)

  const isDev = `const isDev = process.env.NODE_ENV === 'development'`

  const basePath = config?.app?.basePath ? `/${config.app.basePath}/doc` : '/doc'
  const swagger = `if(isDev){app.doc('${'/doc'}',${JSON.stringify(docs)}).get('/ui',swaggerUI({url:'${basePath}'}))}`

  const appCode = `${OPENAPI_HONO_IMPORT}\n${SWAGGER_UI_IMPORT}\n${importRoutes.join('\n')}\n${importHandlersCode}\n\n${APP}\n\n${api}\n\n${isDev}\n\n${swagger}\n\n${ADD_TYPE}\n\n${EXPORT_APP}`

  return appCode
}
