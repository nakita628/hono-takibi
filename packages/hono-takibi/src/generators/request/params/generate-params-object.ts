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
export function generateParamsObject(parameters: Parameters[]): ParamsObject {
  return parameters.reduce((acc: ParamsObject, param) => {
    const paramLocation = param.in
    const optionalSuffix = param.required ? '' : '.optional()'
    const baseSchema = generateZodSchema(param.schema)

    // Initialize section if it doesn't exist
    if (!acc[paramLocation]) {
      acc[paramLocation] = {}
    }

    // Handle coercion for query number/integer types
    const zodSchema =
      param.in === 'query' && (param.schema.type === 'number' || param.schema.type === 'integer')
        ? generateZodCoerce('z.string()', baseSchema)
        : baseSchema

    // Add parameter to its section
    acc[paramLocation][param.name] = `${zodSchema}${optionalSuffix}`
    return acc
  }, {})
}
