import type { Components, Content, Schema } from '../../../../openapi/index.js'
import {
  ensureSuffix,
  toIdentifierPascalCase,
  zodToOpenAPISchema,
} from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

/**
 * Extracts schema from parameter content (for parameters using content instead of schema)
 */
const getSchemaFromContent = (content: Content | undefined): Schema | undefined => {
  if (!content) return undefined
  const firstKey = Object.keys(content)[0]
  if (!firstKey) return undefined
  return content[firstKey]?.schema
}

/**
 * Generates TypeScript code for OpenAPI component parameters.
 *
 * @param components - The OpenAPI components object.
 * @param exportParameters - Whether to export the Zod schema variables.
 * @param exportParametersTypes - Whether to export the inferred Zod types.
 * @param readonly - Whether to add `.readonly()` modifier to parameter schemas.
 * @returns A string of TypeScript code with parameter definitions.
 */
export function parametersCode(
  components: Components,
  exportParameters: boolean,
  exportParametersTypes: boolean,
  readonly?: boolean | undefined,
): string {
  const { parameters } = components
  if (!parameters) return ''

  return Object.keys(parameters)
    .map((k) => {
      const parameter = parameters[k]
      const meta = {
        parameters: {
          ...parameter,
        },
      }
      // Handle parameters with content instead of schema (OpenAPI 3.x)
      const schema = parameter.schema ?? getSchemaFromContent(parameter.content)
      const z = schema ? zodToOpenAPI(schema, meta) : 'z.any()'
      return zodToOpenAPISchema(
        toIdentifierPascalCase(ensureSuffix(k, 'ParamsSchema')),
        z,
        exportParameters,
        exportParametersTypes,
        true,
        readonly,
      )
    })
    .join('\n\n')
}
