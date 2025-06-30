import type { OpenAPIPaths, OpenAPI } from '../../../openapi/index.js'
import { handler, handlerName } from './generator/index.js'
import { routeName } from '../openapi/route/route-name.js'
import { groupHandlersByFileName } from './helper/group-handlers-by-file-name.js'
import { fmt } from '../../../format/index.js'
import { mkdir, writeFile } from '../../../fsp/index.js'
import type { Result } from '../../../result/types.js'

const ROUTE_HANDLER = `import type { RouteHandler } from '@hono/zod-openapi'` as const

/**
 * Generates the Zod OpenAPI Hono handler.
 * @param { OpenAPI } openapi - The OpenAPI specification.
 * @param { output } output - The output directory or file path.
 * @param { boolean } test - Whether to generate the test file.
 * @returns { Promise<Result<void, string>> } - A promise that resolves to a Result indicating success or failure.
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
    const handlerPath = dirPath === 'index.ts' ? 'handler' : `${dirPath}/handler`

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
