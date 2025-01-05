import type { Config } from '../../config'
import type { OpenAPISpec } from '../../types'
import { generateComponentsCode } from '../openapi/components/generate-components-code'
import { generateRouteCode } from '../openapi/paths/generate-route-code'
import { generateTypesCode } from '../types/generate-types-code'

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
export function generateZodOpenAPIHono(openAPISpec: OpenAPISpec, config: Config): string {
  // 1. get components
  const components = openAPISpec.components
  // 2. get paths
  const { paths } = openAPISpec
  // 3. generate components code
  const componentsCode = generateComponentsCode(
    components,
    config.schemaOptions.namingCase,
    config.schemaOptions.exportEnabled,
  )
  // 4. generate route code
  const routeCode = generateRouteCode(paths, config.schemaOptions.namingCase)
  // 5. generate types code
  const typesCode = generateTypesCode(components, config)
  // 6. generate hono code
  if (config.typeOptions.exportEnabled) {
    return `${IMPORT_CODE}\n\n${componentsCode}\n\n${typesCode}\n\n${routeCode}`.trimEnd()
  }
  return `${IMPORT_CODE}\n\n${componentsCode}\n\n${routeCode}`.trimEnd()
}
