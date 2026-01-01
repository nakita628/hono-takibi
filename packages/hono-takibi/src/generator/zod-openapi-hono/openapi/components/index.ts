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
 * @param options - Export flags for each component kind.
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
  return [
    schemas(components, options.exportSchemas, options.exportSchemasTypes),
    parameters(components, options.exportParameters, options.exportParametersTypes),
    securitySchemes(components, options.exportSecuritySchemes),
    requestBodies(components, options.exportRequestBodies),
    responses(components, options.exportResponses),
    headers(components, options.exportHeaders, options.exportHeadersTypes),
    examples(components, options.exportExamples),
    links(components, options.exportLinks),
    callbacks(components, options.exportCallbacks),
  ]
    .filter(Boolean)
    .join('\n\n')
}
