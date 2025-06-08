import fsp from 'node:fs/promises'

import type { OpenAPIPaths, OpenAPISpec } from '../../../types/index.js'
import type { Config } from '../../../config/index.js'
import { generateHandler } from './generators/generate-handler.js'
import { generateRouteName } from '../openapi/route/generate-route-name.js'
import { groupHandlersByFileNameHelper } from './helper/group-handlers-by-file-name-helper.js'
import { formatCode } from '../../../format/index.js'
import { generateHandlerName } from './generators/generate-handler-name.js'

const ROUTE_HANDLER = `import type { RouteHandler } from '@hono/zod-openapi'` as const

export type HandlerOutput = {
  fileName: string
  testFileName: string
  routeHandlerContents: string[]
  routeNames: string[]
}

/**
 * Generates the Zod OpenAPI Hono handler.
 * @param { OpenAPISpec } openapi - The OpenAPI specification.
 * @param { Config } config - The configuration.
 * @param { boolean } test - Whether to generate the test file.
 * @returns { Promise<void> }
 */
export async function generateZodOpenapiHonoHandler(
  openapi: OpenAPISpec,
  config: Config,
  test: boolean,
): Promise<void> {
  const paths: OpenAPIPaths = openapi.paths
  const handlers: HandlerOutput[] = []
  for (const [path, pathItem] of Object.entries(paths)) {
    for (const [method] of Object.entries(pathItem)) {
      const routeName = generateRouteName(method, path)
      const handlerName = generateHandlerName(method, path)

      const routeHandlerContent = generateHandler(handlerName, routeName)

      const path_name = path
        .replace(/[\/{}-]/g, ' ')
        .trim()
        .split(/\s+/)[0]

      const fileName = path_name.length === 0 ? 'index_handler.ts' : `${path_name}_handler.ts`

      const testFileName =
        path_name.length === 0 ? 'index_handler.test.ts' : `${path_name}_handler.test.ts`

      handlers.push({
        fileName,
        testFileName,
        routeHandlerContents: [routeHandlerContent],
        routeNames: [routeName],
      })
    }
  }

  const mergedHandlers = groupHandlersByFileNameHelper(handlers)

  for (const handler of mergedHandlers) {
    const dirPath = config?.output?.replace(/\/[^/]+\.ts$/, '')
    const handlerPath = dirPath === 'index.ts' ? 'handler' : `${dirPath}/handler`

    await fsp.mkdir(handlerPath, { recursive: true })

    const routeTypes = handler.routeNames.map((routeName) => `${routeName}`).join(', ')

    const match = config.output?.match(/[^/]+\.ts$/)

    const matchPath = match ? match[0] : ''

    const path = config.output === '.' || config.output === './' ? config.output : `../${matchPath}`

    const importRouteTypes = routeTypes ? `import type { ${routeTypes} } from '${path}';` : ''

    const importStatements = `${ROUTE_HANDLER}\n${importRouteTypes}`

    const fileContent = `${importStatements}\n\n${handler.routeHandlerContents.join('\n\n')}`

    fsp.writeFile(`${handlerPath}/${handler.fileName}`, await formatCode(fileContent), {
      encoding: 'utf-8',
    })
    if (test) {
      fsp.writeFile(`${handlerPath}/${handler.testFileName}`, '', {
        encoding: 'utf-8',
      })
    }
  }
}
