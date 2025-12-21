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
 */
export function componentsCode(
  components: Components,
  options: {
    readonly exportSchemas: boolean
    readonly exportSchemasTypes: boolean
    readonly exportParameters: boolean
    readonly exportParametersTypes: boolean
    readonly exportSecuritySchemes: boolean
    readonly exportRequestBodies: boolean
    readonly exportResponses: boolean
    readonly exportHeaders: boolean
    readonly exportHeadersTypes: boolean
    readonly exportExamples: boolean
    readonly exportLinks: boolean
    readonly exportCallbacks: boolean
  },
): string {
  // Order follows OpenAPI Specification: schemas, parameters, securitySchemes, requestBodies, responses, headers, examples, links, callbacks
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
