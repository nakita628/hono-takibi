import type { Content, Parameter, Schema } from '../../../../../openapi/index.js'
import { getToSafeIdentifier, ref } from '../../../../../utils/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'

/**
 * Extracts schema from parameter content (for parameters using content instead of schema)
 */
function getSchemaFromContent(content: Content | undefined): Schema | undefined {
  if (!content) return undefined
  const firstKey = Object.keys(content)[0]
  if (!firstKey) return undefined
  return content[firstKey]?.schema
}

/**
 * Converts OpenAPI component schemas into TypeScript code using Zod.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the Zod schemas.
 * @param exportType - Whether to export the inferred TypeScript types.
 * @returns A formatted TypeScript string containing Zod schemas and types, or an empty string if no schemas exist.
 *
 * @remarks
 * - Resolves schema dependencies to preserve reference order.
 * - Uses `zodToOpenAPI` for schema conversion and `zodToOpenAPISchema` for output generation.
 * - Supports conditional `export` statements for both schemas and types.
 */
export function params(parameters: readonly Parameter[]): {
  [section: string]: Record<string, string>
} {
  return parameters.reduce(
    (
      acc: {
        [section: string]: Record<string, string>
      },
      param,
    ) => {
      if (param.$ref !== undefined) {
        if (!acc[param.in]) acc[param.in] = {}
        if (param.$ref) {
          acc[param.in][getToSafeIdentifier(param.name)] = ref(param.$ref)
        }
        return acc
      }

      // Handle parameters with content instead of schema (OpenAPI 3.x)
      const schema = param.schema ?? getSchemaFromContent(param.content)
      if (!schema) {
        // Skip parameters without schema
        if (!acc[param.in]) acc[param.in] = {}
        acc[param.in][getToSafeIdentifier(param.name)] = 'z.any()'
        return acc
      }

      const baseSchema = zodToOpenAPI(schema, {
        parameters: param
      })
      // Initialize section if it doesn't exist
      if (!acc[param.in]) {
        acc[param.in] = {}
      }
      // queryParameter check
      const z =
        param.in === 'query' && schema.type === 'number'
          ? `z.coerce.${baseSchema.replace('z.', '')}`
          : param.in === 'query' && schema.type === 'boolean'
            ? baseSchema.replace('boolean', 'stringbool')
            : param.in === 'query' && schema.type === 'date'
              ? `z.coerce.${baseSchema.replace('z.', '')}`
              : baseSchema

      // Add parameter to its section
      acc[param.in][getToSafeIdentifier(param.name)] = z
      return acc
    },
    {},
  )
}
