import type { Parameter, Ref } from '../../../../../openapi/index.js'
import { getToSafeIdentifier, refSchema } from '../../../../../utils/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'

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

      const isSchemaOrParameterOrHeaderRef = (
        ref: Ref,
      ): ref is
        | `#/components/schemas/${string}`
        | `#/components/parameters/${string}`
        | `#/components/headers/${string}` =>
        ref.startsWith('#/components/schemas/') ||
        ref.startsWith('#/components/parameters/') ||
        ref.startsWith('#/components/headers/')

      if (param.$ref !== undefined) {
        if (!acc[param.in]) acc[param.in] = {}
        if (isSchemaOrParameterOrHeaderRef(param.$ref)) {
          acc[param.in][getToSafeIdentifier(param.name)] = refSchema(param.$ref)
        }
        return acc
      }

      const meta = {
        parameters: {
          name: param.name,
          in: param.in,
          required: param.required,
        },
      }

      const baseSchema = zodToOpenAPI(param.schema, meta)
      // Initialize section if it doesn't exist
      if (!acc[param.in]) {
        acc[param.in] = {}
      }
      // queryParameter check

      const z =
        param.in === 'query' && param.schema.type === 'number'
          ? `z.coerce.${baseSchema.replace('z.', '')}`
          : param.in === 'query' && param.schema.type === 'boolean'
            ? baseSchema.replace('boolean', 'stringbool')
            : param.in === 'query' && param.schema.type === 'date'
              ? `z.coerce.${baseSchema.replace('z.', '')}`
              : baseSchema

      // Add parameter to its section
      acc[param.in][getToSafeIdentifier(param.name)] = z
      return acc
    },
    {},
  )
}
