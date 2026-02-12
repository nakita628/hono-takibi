import type { OpenAPI } from '../../../openapi/index.js'
import { componentsCode } from './components/index.js'
import { routeCode } from './routes/index.js'
import { webhookCode } from './webhooks/index.js'

/**
 * Generates Hono-compatible TypeScript code from an OpenAPI specification.
 *
 * @param openapi - The OpenAPI specification object
 * @param options - Export flags for each component kind
 * @returns The generated TypeScript code string
 */
export function zodOpenAPIHono(
  openapi: OpenAPI,
  options: {
    readonly readonly?: boolean | undefined
    // OpenAPI Components Object order
    readonly exportSchemas: boolean
    readonly exportSchemasTypes: boolean
    readonly exportResponses: boolean
    readonly exportParameters: boolean
    readonly exportParametersTypes: boolean
    readonly exportExamples: boolean
    readonly exportRequestBodies: boolean
    readonly exportHeaders: boolean
    readonly exportHeadersTypes: boolean
    readonly exportSecuritySchemes: boolean
    readonly exportLinks: boolean
    readonly exportCallbacks: boolean
    readonly exportPathItems: boolean
    readonly exportMediaTypes: boolean
    readonly exportMediaTypesTypes: boolean
  },
): string {
  const components = openapi.components ? componentsCode(openapi.components, options) : ''
  const routes = routeCode(openapi, options.readonly)
  const webhooks = webhookCode(openapi, options.readonly)
  const output = [components, routes, webhooks].filter((s) => s.length > 0).join('\n\n')
  return `import{createRoute,z}from'@hono/zod-openapi'\n\n${output}`
}
