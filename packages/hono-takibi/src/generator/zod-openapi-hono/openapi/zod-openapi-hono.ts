import type { OpenAPI } from '../../../openapi/index.js'
import type { Config } from '../../../config/index.js'
import { generateComponentsCode } from './component/generate-components-code.js'
import { generateRouteCode } from './route/generate-route-code.js'

/**
 * Import statement for Hono's zod-openapi package
 */
const IMPORT_CODE = "import { createRoute, z } from '@hono/zod-openapi';" as const

/**
 * Generates TypeScript code from OpenAPI specification for Hono/zod-openapi
 * @param { openapi } openapi - OpenAPI specification object containing components and paths
 * @param { Config } config - Config
 * @returns { string } Generated TypeScript code
 */
export function zodOpenAPIHono(
  openapi: OpenAPI,
  exportSchema: boolean,
  exportType: boolean,
  schemaStyle: 'camelCase' | 'PascalCase' = 'PascalCase',
  typeStyle: 'camelCase' | 'PascalCase' = 'PascalCase',
): string {
  const components = openapi.components ? openapi.components : undefined
  const paths = openapi.paths
  const componentsCode =
    components === undefined
      ? ''
      : generateComponentsCode(components, exportSchema, exportType, schemaStyle, typeStyle)
  const routeCode = generateRouteCode(paths, schemaStyle, typeStyle)
  return `${IMPORT_CODE}\n\n${componentsCode}\n\n${routeCode}`.trimEnd()
}
