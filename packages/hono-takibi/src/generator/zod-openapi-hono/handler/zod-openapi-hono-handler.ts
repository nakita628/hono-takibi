import { fmt } from '../../../format/index.js'
import { mkdir, writeFile } from '../../../fsp/index.js'
import type { OpenAPI, OpenAPIPaths } from '../../../openapi/index.js'
import type { Result } from '../../../result/index.js'
import { routeName } from '../openapi/route/route-name.js'
import { groupHandlersByFileName, handler, handlerName } from './utils/index.js'

const ROUTE_HANDLER = `import type { RouteHandler } from '@hono/zod-openapi'` as const

/**
 * Generates route handler files for a Hono app using Zod and OpenAPI.
 *
 * @param openapi - The OpenAPI specification object.
 * @param output - The output directory or file path for generated handlers.
 * @param test - Whether to generate corresponding empty test files.
 * @returns A `Result` indicating success or error with message.
 */
export async function zodOpenapiHonoHandler(
  openapi: OpenAPI,
  output: string,
  test: boolean,
): Promise<Result<void, string>> {
  const paths: OpenAPIPaths = openapi.paths
  const handlers: {
    fileName: `${string}.ts`
    testFileName: `${string}.ts`
    routeHandlerContents: string[]
    routeNames: string[]
  }[] = []
  for (const [path, pathItem] of Object.entries(paths)) {
    for (const [method] of Object.entries(pathItem)) {
      const routeHandlerContent = handler(handlerName(method, path), routeName(method, path))

      const rawSegment = path.replace(/^\/+/, '').split('/')[0] ?? ''

      const pathName = (rawSegment === '' ? 'index' : rawSegment)
        .replace(/\{([^}]+)\}/g, '$1')
        .replace(/[^0-9A-Za-z._-]/g, '_')
        .replace(/^[._-]+|[._-]+$/g, '')
        .replace(/__+/g, '_')
        .replace(/[-._](\w)/g, (_, c: string) => c.toUpperCase())

      const fileName: `${string}.ts` =
        pathName.length === 0 ? 'indexHandler.ts' : `${pathName}Handler.ts`

      const testFileName: `${string}.ts` =
        pathName.length === 0 ? 'indexHandler.test.ts' : `${pathName}Handler.test.ts`

      handlers.push({
        fileName,
        testFileName,
        routeHandlerContents: [routeHandlerContent],
        routeNames: [routeName(method, path)],
      })
    }
  }

  const mergedHandlers = groupHandlersByFileName(handlers)

  for (const handler of mergedHandlers) {
    const dirPath = output?.replace(/\/[^/]+\.ts$/, '')
    const handlerPath = dirPath === 'index.ts' ? 'handlers' : `${dirPath}/handlers`

    const mkdirResult = await mkdir(handlerPath)

    if (!mkdirResult.ok) {
      return { ok: false, error: mkdirResult.error }
    }

    const routeTypes = handler.routeNames.map((routeName) => `${routeName}`).join(', ')

    const match = output?.match(/[^/]+\.ts$/)

    const matchPath = match ? match[0] : ''

    const path = output === '.' || output === './' ? output : `../${matchPath}`

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
