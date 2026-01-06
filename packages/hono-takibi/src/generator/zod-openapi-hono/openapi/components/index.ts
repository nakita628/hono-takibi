import { sortByDependencies } from '../../../../helper/ast.js'
import type { Components } from '../../../../openapi/index.js'
import { callbacksCode } from './callbacks.js'
import { examplesCode } from './examples.js'
import { headersCode } from './headers.js'
import { linksCode } from './links.js'
import { parametersCode } from './parameters.js'
import { requestBodiesCode } from './request-bodies.js'
import { responsesCode } from './responses.js'
import { schemasCode } from './schemas.js'
import { securitySchemesCode } from './securitySchemes.js'

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
  const code = [
    schemasCode(components, options.exportSchemas, options.exportSchemasTypes),
    parametersCode(components, options.exportParameters, options.exportParametersTypes),
    securitySchemesCode(components, options.exportSecuritySchemes),
    requestBodiesCode(components, options.exportRequestBodies),
    responsesCode(components, options.exportResponses),
    headersCode(components, options.exportHeaders, options.exportHeadersTypes),
    examplesCode(components, options.exportExamples),
    linksCode(components, options.exportLinks),
    callbacksCode(components, options.exportCallbacks),
  ]
    .filter(Boolean)
    .join('\n\n')
  return sortByDependencies(code)
}
