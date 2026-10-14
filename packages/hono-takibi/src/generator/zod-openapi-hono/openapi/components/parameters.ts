import { makeParameterSchema } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'
import {
  ensureSuffix,
  toIdentifierPascalCase,
  zodToOpenAPISchema,
} from '../../../../utils/index.js'

/**
 * Generates TypeScript code for OpenAPI component parameters.
 *
 * `readonly` reaches the schema of the parameter, where it is put on the objects and arrays
 * alone, as a parameter written into a route gets it: a scalar is not wrapped, so a branded
 * one keeps its brand on its primitive.
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
        makeParameterSchema(parameters[k], readonly, components.schemas),
        exportParameters,
        exportParametersTypes,
        true,
      ),
    )
    .join('\n\n')
}
