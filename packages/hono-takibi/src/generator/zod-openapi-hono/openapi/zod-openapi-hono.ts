import type { OpenAPI } from '../../../openapi/index.js'
import { componentsCode } from './components/components-code.js'
import { routeCode } from './route/route-code.js'

/**
 * Import statement for Hono's zod-openapi package
 */
const IMPORT_CODE = "import { createRoute, z } from '@hono/zod-openapi';" as const

/**
 * Generates TypeScript code from OpenAPI specification for Hono/zod-openapi
 * @param { openapi } openapi - OpenAPI specification object containing components and paths
 * @param { exportSchema } exportSchema - Flag to indicate if schema should be exported
 * @param { exportType } exportType - Flag to indicate if type should be exported
 * @returns { string } Generated TypeScript code
 */
export function zodOpenAPIHono(
  openapi: OpenAPI,
  exportSchema: boolean,
  exportType: boolean,
): string {
  const components = openapi.components
    ? componentsCode(openapi.components, exportSchema, exportType)
    : ''
  return `${IMPORT_CODE}\n\n${components}\n\n${routeCode(openapi.paths)}`
}
