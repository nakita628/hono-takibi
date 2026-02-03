/**
 * Zod OpenAPI Hono code generator.
 *
 * Generates complete Hono application code with Zod validation
 * from OpenAPI specifications.
 *
 * ```mermaid
 * flowchart TD
 *   A["zodOpenAPIHono(openapi, options)"] --> B["componentsCode()"]
 *   A --> C["routeCode()"]
 *   A --> W["webhookCode()"]
 *   B --> D["Schemas + Parameters + Headers + ..."]
 *   C --> E["Route definitions"]
 *   W --> V["Webhook definitions"]
 *   D --> F["Combined output"]
 *   E --> F
 *   V --> F
 * ```
 *
 * @module generator/zod-openapi-hono
 */
import type { OpenAPI } from '../../../openapi/index.js'
import { componentsCode } from './components/index.js'
import { routeCode } from './routes/index.js'
import { webhookCode } from './webhooks/index.js'

/**
 * Generates Hono-compatible TypeScript code from an OpenAPI specification.
 *
 * Creates a complete module with:
 * - Zod schemas for all component schemas
 * - Parameter validators
 * - Route definitions with request/response types
 * - Webhook definitions (OpenAPI 3.1+)
 *
 * ```mermaid
 * flowchart LR
 *   subgraph Input
 *     A["OpenAPI Spec"]
 *   end
 *   subgraph Output
 *     B["import { createRoute, z } from '@hono/zod-openapi'"]
 *     C["// Component schemas"]
 *     D["// Route definitions"]
 *     E["// Webhook definitions"]
 *   end
 *   A --> B
 *   A --> C
 *   A --> D
 *   A --> E
 * ```
 *
 * @param openapi - The OpenAPI specification object
 * @param options - Export flags for each component kind
 * @returns The generated TypeScript code string
 *
 * @example
 * ```ts
 * const code = zodOpenAPIHono(openAPI, {
 *   exportSchemas: true,
 *   exportSchemasTypes: true,
 *   // ... other options
 * })
 * // Returns complete TypeScript module with routes and schemas
 * ```
 */
export function zodOpenAPIHono(
  openapi: OpenAPI,
  options: {
    readonly readonly?: boolean | undefined
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
    readonly exportPathItems: boolean
  },
): string {
  const components = openapi.components ? componentsCode(openapi.components, options) : ''
  const routes = routeCode(openapi, options.readonly)
  const webhooks = webhookCode(openapi, options.readonly)
  const output = [components, routes, webhooks].filter((s) => s.length > 0).join('\n\n')
  return `import{createRoute,z}from'@hono/zod-openapi'\n\n${output}`
}
