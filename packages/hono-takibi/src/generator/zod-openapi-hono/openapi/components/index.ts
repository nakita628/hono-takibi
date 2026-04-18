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

export function componentsCode(
  components: Components,
  options: {
    readonly readonly?: boolean
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
) {
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
    mediaTypesCode(
      components,
      options.exportMediaTypes,
      options.exportMediaTypesTypes,
      options.readonly,
    ),
  ]
    .filter(Boolean)
    .join('\n\n')
  return ast(code)
}
