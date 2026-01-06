import type { OpenAPI } from '../../../openapi/index.js'
import { componentsCode } from './components/index.js'
import { routeCode } from './routes/index.js'

/**
 * Generates Hono-compatible TypeScript code from an OpenAPI object.
 *
 * @param openapi - The OpenAPI specification object
 * @param options - Export flags for each component kind
 * @returns The generated TypeScript code string
 */
export function zodOpenAPIHono(
  openapi: OpenAPI,
  options: {
    readonly exportSchemasTypes: boolean
    readonly exportSchemas: boolean
    readonly exportParametersTypes: boolean
    readonly exportParameters: boolean
    readonly exportSecuritySchemes: boolean
    readonly exportRequestBodies: boolean
    readonly exportResponses: boolean
    readonly exportHeadersTypes: boolean
    readonly exportHeaders: boolean
    readonly exportExamples: boolean
    readonly exportLinks: boolean
    readonly exportCallbacks: boolean
  },
): string {
  const components = openapi.components ? componentsCode(openapi.components, options) : ''
  return `import{createRoute,z}from'@hono/zod-openapi'\n\n${components}\n\n${routeCode(openapi)}`
}
