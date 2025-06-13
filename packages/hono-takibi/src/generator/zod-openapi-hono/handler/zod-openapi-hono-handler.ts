import type { OpenAPIPaths, OpenAPISpec } from '../../../types/index.js'
import type { Config } from '../../../config/index.js'
import { generateHandler } from './generators/generate-handler.js'
import { generateRouteName } from '../openapi/route/generate-route-name.js'
import { groupHandlersByFileNameHelper } from './helper/group-handlers-by-file-name-helper.js'
import { fmt } from '../../../format/index.js'
import { mkdir, writeFile } from '../../../fsp/index.js'
import { generateHandlerName } from './generators/generate-handler-name.js'
import type { Result } from '../../../result/types.js'

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
export async function zodOpenapiHonoHandler(
  openapi: OpenAPISpec,
  config: Config,
  test: boolean,
): Promise<Result<void, string>> {
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

    const mkdirResult = await mkdir(handlerPath)

    if (!mkdirResult.ok) {
      return { ok: false, error: mkdirResult.error }
    }

    const routeTypes = handler.routeNames.map((routeName) => `${routeName}`).join(', ')

    const match = config.output?.match(/[^/]+\.ts$/)

    const matchPath = match ? match[0] : ''

    const path = config.output === '.' || config.output === './' ? config.output : `../${matchPath}`

    const importRouteTypes = routeTypes ? `import type { ${routeTypes} } from '${path}';` : ''

    const importStatements = `${ROUTE_HANDLER}\n${importRouteTypes}`

    const fileContent = `${importStatements}\n\n${handler.routeHandlerContents.join('\n\n')}`

    const formatCode = await fmt(fileContent)

    if (!formatCode.ok) {
      return { ok: false, error: formatCode.error }
    }

    const writeResult = await writeFile(`${handlerPath}/${handler.fileName}`, formatCode.value)

    if (!writeResult.ok) writeResult

    if (test) {
      const writeResult = await writeFile(`${handlerPath}/${handler.testFileName}`, '')
      if (!writeResult.ok) {
        return { ok: false, error: writeResult.error }
      }
    }
  }
  return { ok: true, value: undefined }
}
