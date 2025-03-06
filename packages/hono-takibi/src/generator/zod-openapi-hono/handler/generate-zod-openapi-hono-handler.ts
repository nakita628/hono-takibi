import fs from 'node:fs'

import type { OpenAPIPaths, OpenAPISpec } from '../../../type'
import type { Config } from '../../../config'
import { generateHandler } from './generate-handler'
import { generateRouteName } from '../openapi/route/generate-route-name'
import { groupHandlersByFileNameHelper } from './helper/group-handlers-by-file-name-helper'
import { formatCode } from '../../../format'
import { generateHandlerName } from '../handler/generate-handler-name'

const ROUTE_HANDLER = `import type { RouteHandler } from '@hono/zod-openapi'` as const

export type HandlerOutput = {
  fileName: string
  testFileName: string
  routeHandlerContents: string[]
  routeNames: string[]
}

/**
 * Generates the Zod OpenAPI Hono handler.
 *
 * @param openapi - The OpenAPI specification.
 * @param config - The configuration.
 * @param test - Whether to generate the test file.
 */
export async function generateZodOpenapiHonoHandler(
  openapi: OpenAPISpec,
  config: Config,
  test: boolean,
) {
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
    if (!fs.existsSync(handlerPath)) {
      fs.mkdirSync(handlerPath, { recursive: true })
    }

    const routeTypes = handler.routeNames.map((routeName) => `${routeName}`).join(', ')

    const match = config.output?.match(/[^/]+\.ts$/)

    const matchPath = match ? match[0] : ''

    const path = config.output === '.' || config.output === './' ? config.output : `../${matchPath}`

    const importRouteTypes = routeTypes ? `import type { ${routeTypes} } from '${path}';` : ''

    const importStatements = `${ROUTE_HANDLER}\n${importRouteTypes}`

    const fileContent = `${importStatements}\n\n${handler.routeHandlerContents.join('\n\n')}`

    fs.writeFileSync(`${handlerPath}/${handler.fileName}`, await formatCode(fileContent), {
      encoding: 'utf-8',
    })
    if (test) {
      fs.writeFileSync(`${handlerPath}/${handler.testFileName}`, '', {
        encoding: 'utf-8',
      })
    }
  }
}
