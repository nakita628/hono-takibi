import type { Config } from '../../../config'
import type { OpenAPISpec } from '../../../types'
import { generateComponentsCode } from './component/generate-components-code'
import { generateRouteCode } from './route/generate-route-code'
import { generateTypesCode } from './type/generate-types-code'

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
 * 
 * @returns string
 */
export function generateZodOpenAPIHono(openAPISpec: OpenAPISpec, config: Config): string {
  // 1. get components
  const components = openAPISpec.components ? openAPISpec.components : undefined
  if (!components) {
    throw new Error(`Cannot destructure property 'schemas' of 'components' as it is undefined.`)
  }
  // 2. get paths
  const { paths } = openAPISpec
  // 3. generate components code
  const componentsCode = generateComponentsCode(components, config)
  // 4. generate route code
  const routeCode = generateRouteCode(paths, config)
  // 5. generate types code
  const typesCode = generateTypesCode(components, config)
  // 6. generate hono code
  if (config.type.export) {
    return `${IMPORT_CODE}\n\n${componentsCode}\n\n${typesCode}\n\n${routeCode}`.trimEnd()
  }
  return `${IMPORT_CODE}\n\n${componentsCode}\n\n${routeCode}`.trimEnd()
}
