import type { OpenAPISpec } from '../../types'
import { generateComponentsCode } from '../openapi/components/generate-components-code'
import { generateRouteCode } from '../openapi/paths/generate-route-code'

/**
 * Import statement for Hono's zod-openapi package
 * @constant
 */
const IMPORT_CODE = "import { createRoute, z } from '@hono/zod-openapi';" as const

/**
 * Generates TypeScript code from OpenAPI specification for Hono/zod-openapi
 *
 * @function generateZodOpenAPIHonoCode
 * @param openAPISpec - OpenAPI specification object containing components and paths
 * @returns Generated TypeScript code
 */
export function generateZodOpenAPIHono(
  openAPISpec: OpenAPISpec,
  namingCase: 'camelCase' | 'PascalCase' = 'camelCase',
  exportEnabled = true,
): string {
  // 1. get components
  const components = openAPISpec.components
  // 2. get paths
  const { paths } = openAPISpec
  // 3. generate components code
  const componentsCode = generateComponentsCode(components, namingCase, exportEnabled)
  // 4. generate route code
  const routeCode = generateRouteCode(paths, namingCase)
  // 5. generate hono code
  return `${IMPORT_CODE}\n\n${componentsCode}\n\n${routeCode}`.trimEnd()
}
