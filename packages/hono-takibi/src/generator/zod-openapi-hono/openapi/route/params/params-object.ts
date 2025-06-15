import type { Parameters, ParamsObject } from '../../../../../openapi/index.js'
import type { Config } from '../../../../../config/index.js'
import { coerce } from '../../../../zod/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'
import { getToSafeIdentifier } from '../../../../../core/helper/get-to-safe-identifier.js'

/**
 * Generates a params object containing Zod schemas for different parameter locations
 * @param { Parameters[] } parameters - Array of OpenAPI path parameters
 * @param { Config } config - Config
 * @returns { ParamsObject } ParamsObject with Zod schemas organized by parameter location
 * @remarks
 * - Creates Zod schemas for each parameter based on its schema definition
 * - Handles optional parameters by adding .optional() suffix
 * - Organizes parameters into appropriate objects based on their location
 * - Maintains empty objects for unused parameter locations
 */
export function paramsObject(
  parameters: Parameters[],
  schemaStyle: 'camelCase' | 'PascalCase' = 'PascalCase',
  typeStyle: 'camelCase' | 'PascalCase' = 'PascalCase',
): ParamsObject {
  return parameters.reduce((acc: ParamsObject, param) => {
    const optionalSuffix = param.required ? '' : '.optional()'
    // path params are generated with the param name
    const baseSchema = param.in
      ? zodToOpenAPI(param.schema, schemaStyle, typeStyle, param.name, param.in)
      : zodToOpenAPI(param.schema, schemaStyle, typeStyle, param.name)

    // Initialize section if it doesn't exist
    if (!acc[param.in]) {
      acc[param.in] = {}
    }

    // Handle coercion for query number/integer types
    const zodSchema =
      param.in === 'query' && (param.schema.type === 'number' || param.schema.type === 'integer')
        ? coerce('z.string()', baseSchema)
        : baseSchema

    // Add parameter to its section
    acc[param.in][getToSafeIdentifier(param.name)] = `${zodSchema}${optionalSuffix}`
    return acc
  }, {})
}
