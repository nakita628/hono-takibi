import type { Components } from '../../../../openapi/index.js'
import { callbacks } from './callbacks.js'
import { examples } from './examples.js'
import { headers } from './headers.js'
import { links } from './links.js'
import { parameters } from './parameters.js'
import { requestBodies } from './request-bodies.js'
import { responses } from './responses.js'
import { schemas } from './schemas.js'
import { securitySchemes } from './securitySchemes.js'

/**
 * Converts OpenAPI component schemas to Zod-based TypeScript definitions.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the Zod schema variables.
 * @param exportType - Whether to export the inferred Zod types.
 * @returns A string of TypeScript code with Zod schema and type definitions, or an empty string if no schemas exist.
 *
 * @remarks
 * - Resolves schema dependency order to avoid reference errors.
 * - Skips generation if no schemas are defined.
 * - Uses `zodToOpenAPI` and `zodToOpenAPISchema` for code generation.
 * - Order follows OpenAPI Specification: schemas, parameters, securitySchemes, requestBodies, responses, headers, examples, links, callbacks
 */
export function componentsCode(
  components: Components,
  exportSchema: boolean,
  exportType: boolean,
): string {
  // Order follows OpenAPI Specification: schemas, parameters, securitySchemes, requestBodies, responses, headers, examples, links, callbacks
  return [
    schemas(components, exportSchema, exportType),
    parameters(components, exportSchema, exportType),
    securitySchemes(components, exportSchema),
    requestBodies(components, exportSchema),
    responses(components, exportSchema),
    headers(components, exportSchema),
    examples(components, exportSchema),
    links(components, exportSchema),
    callbacks(components, exportSchema),
  ]
    .filter((v) => v !== undefined)
    .join('\n\n')
}
