import type { Config } from '../../../config/index.js'
import type { OpenAPISpec } from '../../../types/index.js'
import { generateComponentsCode } from './component/generate-components-code.js'
import { generateRouteCode } from './route/generate-route-code.js'

/**
 * Import statement for Hono's zod-openapi package
 */
const IMPORT_CODE = "import { createRoute, z } from '@hono/zod-openapi';" as const

/**
 * Generates TypeScript code from OpenAPI specification for Hono/zod-openapi
 * @param { OpenAPISpec } openAPISpec - OpenAPI specification object containing components and paths
 * @param { Config } config - Config
 * @returns { string } Generated TypeScript code
 */
export function zodOpenAPIHono(openAPISpec: OpenAPISpec, config: Config): string {
  // 1. get components
  const components = openAPISpec.components ? openAPISpec.components : undefined
  // 2. get paths
  const { paths } = openAPISpec
  // 3. generate components code
  const componentsCode = components === undefined ? '' : generateComponentsCode(components, config)
  // 4. generate route code
  const routeCode = generateRouteCode(paths, config)
  // 5. generate hono code
  return `${IMPORT_CODE}\n\n${componentsCode}\n\n${routeCode}`.trimEnd()
}
