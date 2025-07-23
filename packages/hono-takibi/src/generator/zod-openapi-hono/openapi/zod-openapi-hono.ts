import type { OpenAPI } from '../../../openapi/index.js'
import { componentsCode } from './components/components-code.js'
import { routeCode } from './route/route-code.js'

/**
 * Generates Hono-compatible TypeScript code from an OpenAPI object.
 *
 * @param openapi - The OpenAPI specification object
 * @param exportSchema - Whether to export schema constants
 * @param exportType - Whether to export inferred TypeScript types
 * @returns The generated TypeScript code string
 */
export function zodOpenAPIHono(
  openapi: OpenAPI,
  exportSchema: boolean,
  exportType: boolean,
): string {
  const components = openapi.components
    ? componentsCode(openapi.components, exportSchema, exportType)
    : ''
  return `import { createRoute, z } from '@hono/zod-openapi'\n\n${components}\n\n${routeCode(openapi.paths)}`
}
