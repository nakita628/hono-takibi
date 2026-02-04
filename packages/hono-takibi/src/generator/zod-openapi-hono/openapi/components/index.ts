import { ast } from '../../../../helper/ast.js'
import type { Components } from '../../../../openapi/index.js'
import { callbacksCode } from './callbacks.js'
import { examplesCode } from './examples.js'
import { headersCode } from './headers.js'
import { linksCode } from './links.js'
import { mediaTypesCode } from './mediaTypes.js'
import { parametersCode } from './parameters.js'
import { pathItemsCode } from './pathItems.js'
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
 * - Order follows OpenAPI Components Object specification:
 *   schemas, responses, parameters, examples, requestBodies,
 *   headers, securitySchemes, links, callbacks, pathItems, mediaTypes
 *
 * @see https://spec.openapis.org/oas/v3.1.0.html#components-object
 */
export function componentsCode(
  components: Components,
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
  },
): string {
  // OpenAPI Components Object order
  const code = [
    schemasCode(components, options.exportSchemas, options.exportSchemasTypes, options.readonly),
    responsesCode(components, options.exportResponses, options.readonly),
    parametersCode(
      components,
      options.exportParameters,
      options.exportParametersTypes,
      options.readonly,
    ),
    examplesCode(components, options.exportExamples, options.readonly),
    requestBodiesCode(components, options.exportRequestBodies, options.readonly),
    headersCode(components, options.exportHeaders, options.exportHeadersTypes, options.readonly),
    securitySchemesCode(components, options.exportSecuritySchemes, options.readonly),
    linksCode(components, options.exportLinks, options.readonly),
    callbacksCode(components, options.exportCallbacks, options.readonly),
    pathItemsCode(components, options.exportPathItems, options.readonly),
    mediaTypesCode(components, options.exportMediaTypes, options.readonly),
  ]
    .filter(Boolean)
    .join('\n\n')
  return ast(code)
}
