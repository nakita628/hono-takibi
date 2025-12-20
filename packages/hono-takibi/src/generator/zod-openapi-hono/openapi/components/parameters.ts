import { zodToOpenAPISchema } from '../../../../helper/zod-to-openapi-schema.js'
import type { Components } from '../../../../openapi/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component parameters.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the Zod schema variables.
 * @param exportType - Whether to export the inferred Zod types.
 * @returns A string of TypeScript code with parameter definitions.
 */
export function parameters(
  components: Components,
  exportSchema: boolean,
  exportType: boolean,
): string {
  const { parameters } = components
  if (!parameters) return ''

  return Object.keys(parameters)
    .map((key) => {
      const parameter = parameters[key]
      const z = zodToOpenAPI(parameter.schema, parameter.name, parameter.in)
      return zodToOpenAPISchema(key, z, exportSchema, exportType, true)
    })
    .join('\n\n')
}
