import type { Parameters, ParamsObject } from '../../../../../openapi/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'
import { getToSafeIdentifier } from '../../../../../core/utils/index.js'
import { queryParameter } from './index.js'

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
export function paramsObject(parameters: Parameters[]): ParamsObject {
  return parameters.reduce((acc: ParamsObject, param) => {
    const optionalSuffix = param.required ? '' : '.optional()'
    // path params are generated with the param name
    const baseSchema = param.in
      ? zodToOpenAPI(param.schema, param.name, param.in)
      : zodToOpenAPI(param.schema, param.name)

    // Initialize section if it doesn't exist
    if (!acc[param.in]) {
      acc[param.in] = {}
    }

    // queryParameter check
    const zodSchema = queryParameter(baseSchema, param)

    // Add parameter to its section
    acc[param.in][getToSafeIdentifier(param.name)] = `${zodSchema}${optionalSuffix}`
    return acc
  }, {})
}
