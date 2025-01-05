import type { ParamsObject, Parameters } from '../../../types'
import { generateZodCoerce } from '../../zod/generate-zod-coerce'
import { generateZodSchema } from '../../zod/generate-zod-schema'

/**
 * Generates a params object containing Zod schemas for different parameter locations
 *
 * @function generateParamsObject
 * @param parameters - Array of OpenAPI path parameters
 * @returns ParamsObject with Zod schemas organized by parameter location
 *
 * @remarks
 * - Creates Zod schemas for each parameter based on its schema definition
 * - Handles optional parameters by adding .optional() suffix
 * - Organizes parameters into appropriate objects based on their location
 * - Maintains empty objects for unused parameter locations
 */
export function generateParamsObject(
  parameters: Parameters[],
  namingCase: 'camelCase' | 'PascalCase' = 'camelCase',
): ParamsObject {
  return parameters.reduce((acc: ParamsObject, param) => {
    const optionalSuffix = param.required ? '' : '.optional()'
    // path params are generated with the param name
    const baseSchema =
      param.in === 'path'
        ? generateZodSchema(param.schema, param.name, true, namingCase)
        : generateZodSchema(param.schema, namingCase)

    // Initialize section if it doesn't exist
    if (!acc[param.in]) {
      acc[param.in] = {}
    }

    // Handle coercion for query number/integer types
    const zodSchema =
      param.in === 'query' && (param.schema.type === 'number' || param.schema.type === 'integer')
        ? generateZodCoerce('z.string()', baseSchema)
        : baseSchema

    // Add parameter to its section
    acc[param.in][param.name] = `${zodSchema}${optionalSuffix}`
    return acc
  }, {})
}
