import fs from 'node:fs'
import type { OpenAPIPaths, OpenAPISpec } from '../../../types'
import { generateHandler } from '../../handler/generate-handler'
import { generateRouteName } from '../../openapi/paths/generate-route-name'
import type { Config } from '../../../config'
import { groupHandlersByFileNameHelper } from './helper/group-handlers-by-file-name-helper'
import { formatCode } from '../../../format'

const ROUTE_HANDLER = `import type { RouteHandler } from '@hono/zod-openapi'` as const

export type HandlerOutput = {
  fileName: string
  testFileName: string
  routeHandlerContents: string[]
  routeNames: string[]
}

export async function generateZodOpenapiHonoHandler(openapi: OpenAPISpec, config: Config) {
  const paths: OpenAPIPaths = openapi.paths
  const handlers: HandlerOutput[] = []
  for (const [path, pathItem] of Object.entries(paths)) {
    for (const [method] of Object.entries(pathItem)) {
      const routeName = generateRouteName(method, path)
      const handlerName = `${generateRouteName(method, path)}Handler`

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
    if (config.handler?.output) {
      if (!fs.existsSync(config.handler.output)) {
        fs.mkdirSync(config.handler.output, { recursive: true })
      }

      const routeTypes = handler.routeNames.map((routeName) => `${routeName}`).join(', ')

      const path =
        config.output === '.' || config.output === './' ? 'config.output' : `../${config.output}`

      const importRouteTypes = routeTypes ? `import type { ${routeTypes} } from '${path}';` : ''

      const importStatements = `${ROUTE_HANDLER}\n${importRouteTypes}`

      const fileContent = `${importStatements}\n\n${handler.routeHandlerContents.join('\n\n')}`

      fs.writeFileSync(
        `${config.handler.output}/${handler.fileName}`,
        await formatCode(fileContent),
        { encoding: 'utf-8' },
      )
      if (config.handler.test) {
        fs.writeFileSync(`${config.handler.output}/${handler.testFileName}`, '', {
          encoding: 'utf-8',
        })
      }
    }
  }
}
