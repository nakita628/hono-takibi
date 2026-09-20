import { makeParameterSchema } from '../../../../helper/openapi.js'
import type { Components } from '../../../../openapi/index.js'
import {
  ensureSuffix,
  toIdentifierPascalCase,
  zodToOpenAPISchema,
} from '../../../../utils/index.js'

/**
 * Generates TypeScript code for OpenAPI component parameters.
 */
export function parametersCode(
  components: Components,
  exportParameters: boolean,
  exportParametersTypes: boolean,
  readonly?: boolean,
) {
  const { parameters } = components
  if (!parameters) return ''
  return Object.keys(parameters)
    .map((k) =>
      zodToOpenAPISchema(
        toIdentifierPascalCase(ensureSuffix(k, 'ParamsSchema')),
        makeParameterSchema(parameters[k]),
        exportParameters,
        exportParametersTypes,
        true,
        readonly,
      ),
    )
    .join('\n\n')
}
