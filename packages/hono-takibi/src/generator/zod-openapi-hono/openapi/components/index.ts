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
    readonly exportSchemas?: boolean
    readonly exportSchemasTypes?: boolean
    readonly exportResponses?: boolean
    readonly exportParameters?: boolean
    readonly exportParametersTypes?: boolean
    readonly exportExamples?: boolean
    readonly exportRequestBodies?: boolean
    readonly exportHeaders?: boolean
    readonly exportHeadersTypes?: boolean
    readonly exportSecuritySchemes?: boolean
    readonly exportLinks?: boolean
    readonly exportCallbacks?: boolean
    readonly exportPathItems?: boolean
    readonly exportMediaTypes?: boolean
    readonly exportMediaTypesTypes?: boolean
  },
) {
  // An absent flag is an off flag — the same thing `config`'s schema decodes a missing
  // field to, and what a caller that passes no options at all is asking for. Said here
  // so the sections below keep taking a plain boolean.
  const {
    readonly,
    exportSchemas = false,
    exportSchemasTypes = false,
    exportResponses = false,
    exportParameters = false,
    exportParametersTypes = false,
    exportExamples = false,
    exportRequestBodies = false,
    exportHeaders = false,
    exportHeadersTypes = false,
    exportSecuritySchemes = false,
    exportLinks = false,
    exportCallbacks = false,
    exportPathItems = false,
    exportMediaTypes = false,
    exportMediaTypesTypes = false,
  } = options
  const code = [
    schemasCode(components, exportSchemas, exportSchemasTypes, readonly),
    responsesCode(components, exportResponses, readonly),
    parametersCode(components, exportParameters, exportParametersTypes, readonly),
    examplesCode(components, exportExamples, readonly),
    requestBodiesCode(components, exportRequestBodies, readonly),
    headersCode(components, exportHeaders, exportHeadersTypes, readonly),
    securitySchemesCode(components, exportSecuritySchemes, readonly),
    linksCode(components, exportLinks, readonly),
    callbacksCode(components, exportCallbacks, readonly),
    pathItemsCode(components, exportPathItems, readonly),
    mediaTypesCode(components, exportMediaTypes, exportMediaTypesTypes, readonly),
  ]
    .filter(Boolean)
    .join('\n\n')
  return ast(code)
}
