import type { OpenAPI } from '../../../openapi/index.js'
import { type ComponentsExportOptions, componentsCode } from './components/index.js'
import { routeCode } from './routes/index.js'

export type OpenAPIExportOptions = ComponentsExportOptions

/**
 * Generates Hono-compatible TypeScript code from an OpenAPI object.
 *
 * @param openapi - The OpenAPI specification object
 * @param options - Export flags for each component kind
 * @returns The generated TypeScript code string
 */
export function zodOpenAPIHono(openapi: OpenAPI, options: OpenAPIExportOptions): string {
  const components = openapi.components ? componentsCode(openapi.components, options) : ''
  return `import { createRoute, z } from '@hono/zod-openapi'\n\n${components}\n\n${routeCode(
    openapi,
    { useComponentRefs: true },
  )}`
}
